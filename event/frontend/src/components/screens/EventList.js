import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 
import axios from 'axios';
import { BASE_URL } from "../../axiosConfig";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/eventlist/`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events/?query=${query}`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'rgb(80 176 80)', textAlign: 'center' }}>Events</h2>
      <Link to="/create-event/">
        <button>Create New Event</button>
      </Link>
      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Events" style={{ padding: '5px', marginRight: '5px' }} />
        <button onClick={handleSearch} style={{ padding: '5px 10px' }}>Search</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', borderBottom: '1px solid #333', padding: '10px' }}>Event Name</th>
            <th style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', borderBottom: '1px solid #333', padding: '10px' }}>Date</th>
            <th style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', borderBottom: '1px solid #333', padding: '10px' }}>Time</th>
            <th style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', borderBottom: '1px solid #333', padding: '10px' }}>Location</th>
            <th style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', borderBottom: '1px solid #333', padding: '10px' }}>Image</th>
            <th style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', borderBottom: '1px solid #333', padding: '10px' }}>Like</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: 'center' }}>
          {events.map((event) => (
            <tr key={event.id}>
              <td style={{ padding: '10px', color: '#333', borderBottom: '1px solid #ccc' }}>{event.event_name}</td>
              <td style={{ padding: '10px', color: '#555', borderBottom: '1px solid #ccc' }}>{event.date}</td>
              <td style={{ padding: '10px', color: '#777', borderBottom: '1px solid #ccc' }}>{event.time}</td>
              <td style={{ padding: '10px', color: '#333', borderBottom: '1px solid #ccc' }}>{event.location}</td>
              <td style={{ padding: '10px', color: '#555', borderBottom: '1px solid #ccc' }}>{event.image}</td>
              <td style={{ padding: '10px', color: '#777', borderBottom: '1px solid #ccc' }}>{event.like}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
