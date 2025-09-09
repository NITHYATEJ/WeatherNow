import React from 'react'

// Component to display a weather icon based on the weather code
function WeatherIcon({ code, size = 64 }) {
  // Mapping of weather codes to emoji representations
  const map = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️',
    51: '🌦️', 53: '🌦️', 55: '🌧️', 61: '🌧️', 63: '🌧️', 65: '🌧️',
    71: '🌨️', 73: '🌨️', 75: '❄️', 80: '🌧️', 81: '🌧️', 82: '🌧️',
    95: '⛈️', 96: '⛈️', 99: '⛈️'
  }
  // Render the emoji corresponding to the weather code, or a fallback
  return <div style={{ fontSize: size }}>{map[code] || '❓'}</div>
}

// Component to display weather information in a card format
export default function WeatherCard({ data }) {
  // Destructure data and provide default empty object for daily
  const d = data, daily = d.daily || {}

  return (
    // Card container with styling
    <div className="bg-slate-800/50 rounded-xl p-4 space-y-4 shadow-lg">
      {/* Header section with city, country, and current weather */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{d.city}</h2>
          <p className="text-gray-400">{d.country}</p>
        </div>
        <div className="flex items-center gap-4">
          <WeatherIcon code={d.weathercode} size={64} />
          <span className="text-4xl font-bold text-white">{Math.round(d.temperature)}°C</span>
        </div>
      </div>

      {/* Current weather details like wind and time */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-300 text-sm">
        <div>Wind: {d.windspeed} km/h</div>
        <div>Direction: {Math.round(d.winddirection)}°</div>
        <div>Time: {new Date(d.time).toLocaleString()}</div>
      </div>

      {/* 4-day weather forecast */}
      {daily.time && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {daily.time.slice(0, 4).map((t, i) => (
            <div key={t} className="bg-slate-700/50 rounded p-2 text-center">
              <div className="text-white font-semibold">
                {new Date(t).toLocaleDateString(undefined, { weekday: 'short' })}
              </div>
              <div className="text-gray-300">
                {Math.round(daily.temperature_2m_min[i])}° / {Math.round(daily.temperature_2m_max[i])}°
              </div>
              <div className="text-gray-400 text-xs">
                Precip: {Math.round(daily.precipitation_sum[i])}mm
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
