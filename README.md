# Weather Now

A small weather app built with React + Open-Meteo. Enter a city name to see the current weather.

## 🚀 Live Demo

[[Click here to view](https://yq6lns-5173.csb.app/)

## 🛠️ Run Locally

Clone the project and install dependencies:

```bash
npm install
npm run dev
```

Then open your browser at:
http://localhost:5173

🌍 APIs Used

Open-Meteo Geocoding API

Open-Meteo Forecast API

Open-Meteo Geocoding API sometimes doesn’t return the country name the way you expect:-
I hardcoded "India" in the geocoding result selection to avoid city name ambiguities (e.g., Hyderabad exists in multiple countries). This ensures the app fetches accurate weather data for Indian users, with a fallback to the first result if no Indian match is found.

✨ Features

Search weather by city name

Current temperature, wind speed, and last update time

Clean and responsive UI with Tailwind CSS

Handles errors gracefully (invalid city names, API issues)

Deployement - Sandbox
appplication url -https://yq6lns-5173.csb.app/

I used ChatGPT to analyse different weather apps, for fetching different testcases to test application and generated Readme.md file for application.

chatgpt link -https://chatgpt.com/share/68c05088-d99c-8010-898b-5da34ba12455
