
import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div  className='bg-dark' style={{height:'100vh'}} >
      <h1 className='text-center text-warning mt-5 mb-3 '>Weather Predictor</h1>
      <form className='text-center ' onSubmit={handleSubmit}>
        <input className='border rounded mt-3' type="text" placeholder="Enter city" style={{height:'5vh'}} value={city} onChange={(e) => setCity(e.target.value)}/>
        <button className='btn btn-success ms-2 mb-1' type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div className='text-center text-warning mt-3 '>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        
        </div>
      )}
    </div>
  );
};

export default Weather;
