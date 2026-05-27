import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ForecastChart from "./ForecastChart";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "54fe947e290a9556a4730f69d89f30f9"; // Replace with your OpenWeatherMap API key
  
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      setForecast([]);
      return;
    }
    try {
      setError("");
      // Current weather
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(weatherRes.data);

      // 5-day forecast (3-hour intervals)
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      // Pick one forecast per day (e.g., 12:00 PM)
      const dailyData = forecastRes.data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyData);
    } catch (err) {
      setError("City not found or API error.");
      setWeather(null);
      setForecast([]);
    }
  };

  return (
    <div className="app">
      <h1>Weather Forecast</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].description}</p>
          <h3>{Math.round(weather.main.temp)}°C</h3>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="forecast-chart">
          <ForecastChart forecast={forecast} />
        </div>
      )}
    </div>
  );
}

export default App;
