import React, { useState } from 'react';

async function fetchWeatherByMonth(month) {
    console.log("entered fetch");
    try {
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
        console.log('Fetching data for month:', month);
        const data = await fetchWeatherByMonth(month);
        console.log('Fetched data:', data); 
        setWeatherData(data);
    };

    return (
        <div>
            <div className="banner">Stormwatch</div> {}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={month}
                    onChange={handleMonthChange}
                    placeholder="Enter month (e.g., 01 for January)"
                    className="search-bar" 
                />
                <button type="submit" className="search-button">Search</button> {}
            </form>
            <div style={{ overflowY: 'scroll', height: '400px' }}>
                {weatherData.map((event, index) => (
                    <div key={index}>
                        {}
                    </div>
                ))}
            </div>
        </div>
    );
}

export { fetchWeatherByMonth };
export default Client;
