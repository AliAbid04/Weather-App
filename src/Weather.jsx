import React, { useState, useEffect } from 'react';

function Weather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cityInput, setCityInput] = useState('');

    useEffect(() => {
        
    }, []);

    const fetchWeatherData = async (city) => {
        setLoading(true); // Set loading state to true while fetching data

        try {
            const apiKey = '20afc46c6d1ebee7ceaf2925a2fca6e4';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            setWeather({
                temperature: data.main.temp,
                condition: data.weather[0].description
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }

        setLoading(false); // Set loading state back to false after fetching data
    };

    const handleCityInputChange = (event) => {
        setCityInput(event.target.value);
    };

    const handleSearch = () => {
        if (cityInput.trim() !== '') {
            fetchWeatherData(cityInput);
        }
    };

    return (
        <>
            <div className='name'>
                <h1>The Weather App</h1>
            </div>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Enter city name'
                    value={cityInput}
                    onChange={handleCityInputChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {loading ? (
                <div className='loading'>Loading... please wait a moment</div>
            ) : weather ? (
                <div className='weather-container'>
                    <div className='weather'>
                        <span><strong>Temperature: </strong> {weather.temperature}°C</span>
                        <br />
                        <span><strong>Condition: </strong>{weather.condition}</span>
                    </div>
                </div>
            ) : (
                <div className='weather-container'>
                    <div className='weather'>
                        <span>No weather data available. Please enter a city.</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default Weather;
