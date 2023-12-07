import React, { useState } from 'react';

// Assuming fetchWeatherByMonth is imported from another file or defined here

async function fetchWeatherByMonth(month) {
    console.log("entered fetch");
    try {
        // Use HTTP instead of HTTPS for local development
        const response = await fetch(`http://localhost:3000/api/weather-events-by-month/${month}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return []; // Return an empty array in case of an error
    }
}

function Client() {
    const [month, setMonth] = useState('');
    const [weatherData, setWeatherData] = useState([]);

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Fetching data for month:', month); // Add a console log here
        const data = await fetchWeatherByMonth(month);
        console.log('Fetched data:', data); // Add a console log here
        setWeatherData(data);
    };

    return (
        <div>
            <div className="banner">Stormwatch</div> {/* Assuming banner style is defined in CSS */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={month}
                    onChange={handleMonthChange}
                    placeholder="Enter month (e.g., 01 for January)"
                    className="search-bar" // Assuming search-bar style is defined in CSS
                />
                <button type="submit" className="search-button">Search</button> {/* Assuming search-button style is defined in CSS */}
            </form>
            <div style={{ overflowY: 'scroll', height: '400px' }}>
                {weatherData.map((event, index) => (
                    <div key={index}>
                        {/* Render weather event details here */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export { fetchWeatherByMonth };
export default Client;
