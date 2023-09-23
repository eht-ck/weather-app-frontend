import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://weather-backend-7os5.vercel.app/api/weather?location=${location}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (location) {
      fetchWeather();
    }
  };

  return (
    <div className="App">
      <h1> Weather App </h1>{" "}
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />{" "}
      <br />
      <br />
      <button onClick={handleSubmit}> Get Weather </button>{" "}
      {loading && <div className="loading"> Loading... </div>}{" "}
      {weatherData && (
        <div className="weather-container">
          <h2> WEATHER CONDITION </h2>{" "}
          <img src={weatherData.con.icon} alt="weather icon" />
          <p className="condition"> Condition: {weatherData.con.text} </p>{" "}
          <p className="temperature">
            Temperature: {weatherData.temperature}° C{" "}
          </p>{" "}
          <p className="humidity"> Humidity: {weatherData.humidity} % </p>{" "}
          <p className="humidity">
            {" "}
            Wind Speed(KMPH): {weatherData.wind_kph} %{" "}
          </p>
        </div>
      )}{" "}
    </div>
  );
}

export default App;
