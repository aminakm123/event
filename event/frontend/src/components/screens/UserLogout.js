import React from 'react';
import axios from 'axios';

const UserLogout = () => {
  const handleLogout = () => {
    axios.post('/user/logout/')
      .then(response => {
        console.log(response.data.message);
        // Handle successful logout (e.g., remove token from local storage)
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div>
      <h2>User Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserLogout;
