import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

// Main App component for the weather application
export default function App() {
  // State to store the city name entered by the user
  const [query, setQuery] = useState('Hyderabad')
  // State to store the fetched weather data
  const [weather, setWeather] = useState(null)
  // State to manage loading status during API calls
  const [loading, setLoading] = useState(false)
  // State to store error messages, if any
  const [error, setError] = useState(null)

  // Effect to fetch weather data when the component mounts
  useEffect(() => {
    fetchWeather(query)
  }, [])

  // Function to fetch weather data for a given city
  async function fetchWeather(city) {
    try {
      // Set loading state to true and clear previous data/errors
      setLoading(true)
      setError(null)
      setWeather(null)

      // Fetch geocoding data to get latitude and longitude
      const geoRes = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: { name: city, count: 10 }
      })
      console.log('Geocoding API Response:', geoRes.data)

      // Check if location data is available
      if (!geoRes.data.results) throw new Error('Location not found')

      // Prefer a result from India, otherwise take the first result
      let place = geoRes.data.results.find(result => result.country === 'India') || geoRes.data.results[0]
      if (!place) throw new Error('No matching location found')

      // Extract latitude and longitude from the geocoding result
      const { latitude, longitude } = place

      // Fetch weather data using the coordinates
      const weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude,
          longitude,
          current_weather: true,
          timezone: 'auto',
          daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
          forecast_days: 4,
        },
      })

      // Update weather state with city, country, and weather data
      setWeather({
        city: place.name,
        country: place.country,
        ...weatherRes.data.current_weather,
        daily: weatherRes.data.daily,
      })
    } catch (err) {
      // Handle errors by setting the error state
      setError(err.message)
    } finally {
      // Reset loading state after the API call completes
      setLoading(false)
    }
  }

  // Handle form submission to fetch weather for the entered city
  function handleSubmit(e) {
    e.preventDefault()
    // Check if query is empty or only whitespace
    if (!query || query.trim() === '') {
      setError('Please enter a city name')
      setWeather(null) // Clear previous weather data
      return
    }
    fetchWeather(query)
  }

  // Handle input changes and clear weather data if input is empty
  function handleInputChange(e) {
    const value = e.target.value
    setQuery(value)
    if (!value || value.trim() === '') {
      setWeather(null) // Clear weather data when input is empty
      setError(null) // Clear any existing errors
    }
  }

  return (
    // Main container for the app with centered layout
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Header with app title */}
      <header className="text-center space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-white">WeatherNow</h1>
      </header>

      {/* Search form for city input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={query}
          onChange={handleInputChange}
          placeholder="Search city..."
          className="flex-1 px-3 py-2 rounded-lg bg-slate-800 text-white focus:outline-none"
        />
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          disabled={loading}
        >
          {loading ? 'Loading…' : 'Search'}
        </button>
      </form>

      {/* Display error message if an error occurs */}
      {error && <div className="p-3 rounded bg-red-700/50 text-red-200">{error}</div>}

      {/* Display weather card if weather data is available */}
      {weather && <WeatherCard data={weather} />}

      {/* Prompt user to search if no data, loading, or error */}
      {!weather && !loading && !error && (
        <p className="text-center text-gray-500">Try searching for a city to see the weather.</p>
      )}
    </div>
  )
}
