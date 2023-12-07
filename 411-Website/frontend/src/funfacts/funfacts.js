import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './funfacts.css';

const FunFacts = () => {
    const [data, setData] = useState(null);
    const [dataType, setDataType] = useState('');

    const fetchData = async (endpoint, type) => {
        try {
            const response = await fetch(`http://localhost:3000/api/weather-events/weatherstats`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
            setDataType(type);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setData(null);
            setDataType('');
        }
    };

    
    const fd = async (endpoint, type) => {
        try {
            const response = await fetch(`http://localhost:3000/api/statistics/total-deaths-by-category`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("worked ", result);
            setData(result);
            setDataType(type);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setData(null);
            setDataType('');
        }
    };

    const handleDeathsByCategoryClick = () => {
        fd('total-deaths-by-category', 'deathsByCategory');
    };

    const handleTornadoStatsClick = async () => {
        fetchData('weatherStats', 'tornadoStats');
    };

    const renderData = () => {
        if (!data) return null;

        if (dataType === 'deathsByCategory') {
            return (
                <div className="category-container">
                    {data.map((item, index) => (
                        <div className="category-item" key={index}>
                            <h3>{item.category_name}</h3>
                            <p>Total Direct Deaths: {item.TotalDirectDeaths}</p>
                            <p>Total Indirect Deaths: {item.TotalIndirectDeaths}</p>
                        </div>
                    ))}
                </div>
            );
        } else if (dataType === 'tornadoStats') {
            const averageWindSpeed = data[0][0].Value;
            const averageTornadoSize = data[1][0].Value;

            return (
                <div className="tornado-stats-container">
                    <h3>Tornado Statistics</h3>
                    <p>Average Wind Speed: {averageWindSpeed} mph</p>
                    <p>Average Tornado Size: {averageTornadoSize}</p>
                </div>
            );
        }
    };

    return (
        <div>
            <h2>Fun Facts</h2>
            <button onClick={handleDeathsByCategoryClick}>Total Deaths by Category</button>
            <button onClick={handleTornadoStatsClick}>Tornado Statistics</button>
            <div className="data-display">
                {renderData()}
            </div>
            <div className="back-to-home">
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    );
};

export default FunFacts;
