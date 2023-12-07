import React, { useState, useEffect } from 'react';
import './favorite.css';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [events, setEvents] = useState([]); // All events

    // Dummy user ID - replace with actual user ID
    console.log(localStorage.getItem('userId'));
    const userIdString = localStorage.getItem('userId');

    const userId = parseInt(userIdString, 10); 

    // Define Event_id
    const [Event_id, setEventId] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/weather-events-by-month/01`, {
                method: 'GET', // Specify the HTTP method as GET
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            setError(error.toString());
        }
    };

    // Function to fetch favorite events
    const fetchFavorites = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}/favorites`, {
                method: 'GET', // Specify the HTTP method as GET
            });
            if (!response.ok) {
                return (
                    <div>
                        <h2>My Favorite Weather Events</h2>
                        <div>No favorites for this user.</div>
                       
                    </div>
                );
            }
            const data = await response.json();
            console.log(data);
            setFavorites(data);
        } catch (error) {
            console.error('Failed to fetch favorite events:', error);
            setError(error.toString());
        } finally {
            setIsLoading(false);
        }
    };

    const addToFavorites = async (eventId) => {
        console.log(eventId);
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ event_id: eventId }),
            });
            console.log("worked? ");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Update favorites list after adding
            fetchFavorites();
        } catch (error) {
            console.error('Failed to add to favorites:', error);
        }
    };

    useEffect(() => {
        fetchFavorites(); // Call the fetchFavorites function
        fetchEvents();
    }, [userId]);

    useEffect(() => {
        if (Event_id) {
            addToFavorites(Event_id);
        }
    }, [Event_id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>My Favorite Weather Events</h2>
            <div className="weather-event-container">
                {favorites.map((event, index) => (
                    <div key={index} className="weather-event">
                        <h3>{event.category_name}</h3>
                        <p>Event ID: {event.Event_id}</p>
                        {/* ... other event details */}
                        <h3>{event.category_name}</h3>
                        <p>Event ID: {event.Event_id}</p>
                        <p>Event Begin Time: {event.eventBeginTime}</p>
                        <p>Event End Time: {event.eventEndTime}</p>
                        <p>Damage to Property: {event.damageProperty}</p>
                        <p>Place: {event.place}</p>
                        <p>Deaths Direct: {event.deathsDirect}</p>
                        <p>Deaths Indirect: {event.deathsIndirect}</p>
                        <p>Injuries Direct: {event.injuriesDirect}</p>
                        <p>Injuries Indirect: {event.injuriesIndirect}</p>
                        <p>Damage to Crops: {event.damageCrops}</p>
                    </div>
                ))}
            </div>
            <h2>Weather Events in January</h2>
            <div className="weather-event-container">
                {events.map((event, index) => (
                    <div key={index} className="weather-event">
                        <h3>{event.category_name}</h3>
                        <p>Event ID: {event.Event_id}</p>
                       
                        <p>Event Begin Time: {event.eventBeginTime}</p>
                        <p>Event End Time: {event.eventEndTime}</p>
                        <p>Damage to Property: {event.damageProperty}</p>
                        <p>Place: {event.place}</p>
                        <p>Deaths Direct: {event.deathsDirect}</p>
                        <p>Deaths Indirect: {event.deathsIndirect}</p>
                        <p>Injuries Direct: {event.injuriesDirect}</p>
                        <p>Injuries Indirect: {event.injuriesIndirect}</p>
                        <p>Damage to Crops: {event.damageCrops}</p>
                        <button onClick={() => setEventId(event.Event_id)}>Add to Favorites</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorites;
