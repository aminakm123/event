import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../axiosConfig";

const CreateEvent = () => {
  const [event_name, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      event_name,
      date,
      time,
      image,
      location
    };

    try {
      const response = await axios.post(`${BASE_URL}/create-event/`, eventData);
      setSuccessMessage('Event created successfully!');
      setErrorMessage('');
      console.log(response.data);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Failed to create the event.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'rgb(80 176 80)', textAlign: 'center' }}>Create Event</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div
      style={{
        backgroundColor: '#f2f2f2',
        padding: '20px',
        borderRadius: '5px',
      }}>
        <form onSubmit={handleFormSubmit} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          justifyItems: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              value={event_name}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Date:</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Time:</label>
            <textarea
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label>Cover Image:</label>
            <textarea
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label>Location:</label>
            <textarea
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            ></textarea>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <button
              type="submit"
              style={{
                backgroundColor: 'rgb(29 151 79)',
                color: 'rgb(242, 242, 242);',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
