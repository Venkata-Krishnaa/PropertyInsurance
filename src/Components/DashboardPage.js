// DashboardPage.js

import React, { useState } from 'react';
 import './DashboardPage.css';

const DashboardPage = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="container">
      <h1>Welcome to Dashboard</h1>
      <div className="input-field" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
  <label htmlFor="name" style={{ marginRight: '10px' }}>Name:</label>
  <input
    type="text"
    id="name"
    value={name}
    onChange={handleNameChange}
    placeholder="Enter your name"
    required
  />


      </div>
      <div className="input-field" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
  <label htmlFor="mobile" style={{ marginRight: '10px' }}>Mobile Number:</label>
  <input
    type="tel"
    id="mobile"
    value={mobile}
    maxLength={10}
    onChange={handleMobileChange}
    placeholder="Enter your mobile number"
    pattern="[6789]\d{9}"
    required
  />
      </div>
      <div className="input-field" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
  <label htmlFor="email" style={{ marginRight: '10px' }}>Email:</label>
  <input
    type="email"
    id="email"
    value={email}
    onChange={handleEmailChange}
    placeholder="Enter your email"
    required
  />


      </div>
    </div>
  );
};

export default DashboardPage;
