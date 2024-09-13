import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      setUser(response.data.results[0]);
    } catch (error) {
      console.error('Error fetching the user', error);
    }
  };

  useEffect(() => {
    fetchUser(); // Load a user initially
  }, []);

  return (
    <div className="app-container">
      <div className="card">
        {user ? (
          <>
            <img src={user.picture.large} alt="User" className="user-img" />
            <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
            <div className="user-info">
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Location:</strong> {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}</p>
              <p><strong>Date of Birth:</strong> {new Date(user.dob.date).toLocaleDateString()} (Age: {user.dob.age})</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Cell:</strong> {user.cell}</p>
              <p><strong>Timezone:</strong> {`${user.location.timezone.description} (UTC ${user.location.timezone.offset})`}</p>
            </div>
            <button className="btn" onClick={fetchUser}>
              Change User
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
