// AdminPage.js

// AdminPage.js

// AdminPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './AdminPage.css';

const AdminPage = () => {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleSendOTP = () => {
    // Logic to send OTP...
    setOtpSent(true);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleVerifyOTP = () => {
    // Logic to verify OTP...
    console.log('OTP Verified');
    // Redirect to the dashboard page upon successful OTP verification
    navigate('/DashboardPage');
  };

  return (
    <div className="container">
      <h1>Welcome To Admin Panel Login</h1>
      <div className="input-field">
        <label htmlFor="mobile">Mobile Number:</label>
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
      {!otpSent ? (
        <button type="button" onClick={handleSendOTP} className="button">Send OTP</button>
      ) : (
        <div>
          <div className="input-field">
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter the OTP received"
              required
            />
          </div>
          <button type="button" onClick={handleVerifyOTP} className="button">Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
