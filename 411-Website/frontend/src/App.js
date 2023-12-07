import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import Login from './login/login.js';
import Register from './register/register.js';
import { fetchWeatherByMonth } from './client.js';
import Modal from 'react-modal';
import UpdateUser from './updateUser/updateUser.js'; 
import Funfacts from './funfacts/funfacts.js'
import Favorites from './favorite/favorite.js'
import './App.css';

Modal.setAppElement('#root');


function App() {
    const [month, setMonth] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortOrder, setSortOrder] = useState('Newest to Oldest');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [comparedEvent, setComparedEvent] = useState(null);
    const [weatherEvents, setWeatherEvents] = useState([]);
    const [modalContent, setModalContent] = useState('');
    const [the_user_id, set_the_user_id] = useState('');

    const handleMonthChange = (event) => {
      console.log("enterd");
        setMonth(event.target.value);
    };

    const handleCompareEventClick = (event) => {
        setComparedEvent(event);
    };

    useEffect(() => {
        // Fetch weather events with category names
        const fetchWeatherEvents = async () => {
          try {
            const response = await fetch('/api/weather-events-with-category');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setWeatherEvents(data);
          } catch (error) {
            console.error('Error fetching weather events', error);
          }
        };
    
        fetchWeatherEvents();
      }, []);

    useEffect(() => {
        // This code will run when 'count' or 'name' changes.
    
        console.log("selected type updated");
      }, [setSelectedType]); 
    
    
    const fetchEventDetails = async (eventId, selectedType) => {
        console.log("eventid and type ", selectedType, " ", eventId);
        let url = '';
        switch (selectedType) {
            case 'Tornado':
                url = `http://localhost:3000/api/weather/tornado/:${eventId}`;
                break;
            case 'Blizzard':
                url = `http://localhost:3000/api/weather/blizzard/:${eventId}`;
                break;
            case 'Hail':
                url = `http://localhost:3000/api/weather/hail/:${eventId}`;
                break;
        }
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch event details:', error);
        }
    };
        
    // Function to fetch category details based on event ID
    const fetchCategoryDetails = async (category_id) => {
        try {
          const response = await fetch(`http://localhost:3000/api/category/${category_id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("data ", data);
          return data.category_name;
        } catch (error) {
          console.error('Failed to fetch category details:', error);
        }
    };

    const handleEventClick = async (event) => {
        const eventDetails = await fetchEventDetails(event.event_id, event.type);
        const categoryName = await fetchCategoryDetails(event.category_id); 
        setSelectedEvent({ ...eventDetails, category_name: categoryName });
        setIsModalOpen(true);
      };

  

    const handleSubmit = async (event) => {
      console.log("entered");

        event.preventDefault();
        const data = await fetchWeatherByMonth(month);
        console.log("exit");

        setWeatherData(data);
        setFilteredData(data); // Reset filtered data
    };

    useEffect(() => {
        // Apply type filter on the fetched month data
        let filtered = selectedType ? weatherData.filter(event => event.type === selectedType) : weatherData;

        // Sorting logic
        filtered.sort((a, b) => {
            let dateA = new Date(a.eventBeginTime); 
            let dateB = new Date(b.eventBeginTime);
            return sortOrder === 'Newest to Oldest' ? dateA - dateB : dateB - dateA;
        });

        setFilteredData(filtered);
    }, [selectedType, weatherData, sortOrder]);

    return (
      <Router>
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/update-user" element={<UpdateUser />} /> {}
              <Route path="/funfacts" element={<Funfacts />} /> {}
              <Route path="/Favorites" element={<Favorites />} /> {}


              <Route path="/" element={
                  <div>
                      <h1>Storm Events</h1> 
                      <div className='image-container'>
  <img className='storm-image' src="https://i.ibb.co/v3JZzpg/stormimage.jpg" alt="Storm" width="100%" height="300px"/>
</div>

                      <div>
                          {}
                          <Link to="/login" className="nav-link">Login</Link>
                          <Link to="/register" className="nav-link">Register</Link>
                          <Link to="/update-user" className="nav-link">Update User</Link>
                          <Link to="/funfacts" className="nav-link">Funfacts</Link>
                          <Link to="/favorites" className="nav-link">Favorites</Link>



                      </div>
                      <div>
                        
                      </div>
                      <form onSubmit={handleSubmit}>
                          <input type="text" value={month} onChange={handleMonthChange} placeholder="Enter month (e.g., 01 for January)" />
                          <button type="submit">Search By Month</button>
                      </form>
                      <div>
                          <button onClick={() => setSortOrder('Newest to Oldest')}>Newest to Oldest</button>
                          <button onClick={() => setSortOrder('Oldest to Newest')}>Oldest to Newest</button>
                      </div>
                      <div style={{ overflowY: 'scroll', height: '400px' }}>
                          {filteredData.map((event, index) => (
                              <div className="event-details" key={index} onClick = {() => handleEventClick(event)}>{event.category_id}: {event.event_id}, began at {event.eventBeginTime}</div>

                          ))}
                      </div>
                      {}
                      {isModalOpen && (
                        <Modal 
                        isOpen={isModalOpen}
                        onRequestClose={() => { setIsModalOpen(false); setComparedEvent(null); }}
                        contentLabel="Event Details"
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h2>Event Details</h2>
                            <div>Category Name: {selectedEvent?.category_name}</div>
                             </div>
                            {comparedEvent && (
                                <div>
                                    <h2>Compared Event Details</h2>
                                    <div>Category: {comparedEvent?.category_id}</div>
                                    {}
                                </div>
                            )}
                        </div>
                    
                        <div>
                            {/* <h3>Other Events:</h3> */}
                            <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                {filteredData.map((event, index) => (
                                    <div key={index} onClick={() => handleCompareEventClick(event)}>
                                        {/* {event.category_id}: {event.event_id} */}
                                        
                                    </div>
                                    
                                ))}
                            </div>
                        </div>
                    </Modal>
                        )}
                          {/* Footer */}
              <div className="footer">
                &copy; 2023 Stormevents. All Rights Reserved.
              </div>
                  </div>
              } />
          </Routes>
      </Router>
  );
  
}

export default App;
