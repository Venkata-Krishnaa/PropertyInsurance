import React, { useState } from 'react';
import { useNavigate, useLocation,Link } from 'react-router-dom';

function QuotePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { valueofproperty, securitycheck, carpetArea, ageofthebuilding, pincode, disaster, salaryStatus } = state.propertyDetails;
  const propertyValue = valueofproperty;
  const formData = state?.propertyDetails;
  // const h = formData.valueofproperty;
  const securityRate = securitycheck === "notSecured" ? 0.002 : 0.001;

  const [year, setYear] = useState('1');
  const [premium, setPremium] = useState(Math.floor(propertyValue * securityRate));
  const [property, setProperty] = useState(propertyValue);
  // const [propertyDetails, setPropertyDetails] = useState('');
  // const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  const [showPopup, setShowPopup] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [choosePassword, setChoosePassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
 
  const [fullNameError, setFullNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [choosePasswordError, setChoosePasswordError] = useState('');
  const [retypePasswordError, setRetypePasswordError] = useState('');
  const [showError, setShowError] = useState(false);
  const [loginEmailError, setLoginEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');
  


  const[signup, setSignup] = useState({
    fullName,
    phoneNumber,
    email,
    choosePassword,
    retypePassword
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setSignup({ ...signup, [name]: val });


  }
  // const [validForm, setValidForm] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
    setShowError(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    clearErrors();
  };

  const clearErrors = () => {
    setFullNameError('');
    setPhoneNumberError('');
    setEmailError('');
    setChoosePasswordError('');
    setRetypePasswordError('');
  };

  const handleContinue = () => {
    clearErrors();

    if (!fullName.trim()) {
      setFullNameError('Please enter your full name.');
      setShowError(true);
      return;
    }

    if (!phoneNumber.trim()) {
      setPhoneNumberError('Please enter your phone number.');
      setShowError(true);
      return;
    } else if (!/^[6-9]\d{9}$/.test(phoneNumber.trim())) {
      setPhoneNumberError('Phone number must have 10 digits and start with 6, 7, 8, or 9.');
      setShowError(true);
      return;
    }

    if (!email.trim()) {
      setEmailError('Please enter your email.');
      setShowError(true);
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      setShowError(true);
      return;
    }

    if (!choosePassword.trim()) {
      setChoosePasswordError('Please enter your password.');
      setShowError(true);
      return;
    } else if (choosePassword.trim().length < 6) {
      setChoosePasswordError('Password must be at least 6 characters long.');
      setShowError(true);
      return;
    }

    if (choosePassword.trim() !== retypePassword.trim()) {
        setRetypePasswordError('Passwords do not match.');
      setShowError(true);
      return;
    }
    const handleEdit = () => {
      navigate('/PropertyDetails');
    };
  

    // setValidForm(true);
    // Redirect to another page upon successful form submission
    navigate('/DetailsForm', {
      state: {
        propertyValue,
        premium,
        fullName,
        phoneNumber,
        email,
        propertyDetails: {
          carpetArea,
          ageofthebuilding,
          pincode,
          disaster,
          securitycheck,
          salaryStatus
        },
        formData: formData
      }
    });
  };

  const calculatePremium = (rate) => {
    return Math.floor(propertyValue * rate);
  };

  const setPremiumByYear = (selectedYear, rate) => {
    setYear(selectedYear);
    const newPremium = calculatePremium(rate);
    setPremium(newPremium);
    setProperty(propertyValue);
  };

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    value = value.slice(0, 10);
    setPhoneNumber(value);
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]+$/.test(value)) {
      setFullName(value);
      setFullNameError('');
    } else {
      setFullNameError('Full name can only contain letters and one space.');
    }
  };

  const handleFullNameKeyDown = (e) => {
    if (e.key === 'Backspace') {
      setFullName(fullName.slice(0, -1));
      setFullNameError('');
    }
  };
  const handleLogin = () => {
    // Your login validation logic here
  };

  return (
    <>
      <div className='container mt-3'>
        <div className='rounded text-light p-1 bg-success'>
          <h3 className='ms-3'>Premium Details</h3>
        </div>
        <div className='m-5'>
          <h5>Your property value: {propertyValue}</h5>
        </div>
        <div className='row mt-3 ms-5'>
          {[1, 2, 3, 4, 5].map((yearValue) => (
            <div className='col' key={yearValue}>
              <button className='btn btn-primary px-3 fw-bold' onClick={() => setPremiumByYear(yearValue, securitycheck === "notSecured" ? (yearValue * 0.0012) : (yearValue * 0.0006))}>
                {yearValue} Year
              </button>
            </div>
          ))}
        </div>
        <div className='text-center mt-5 rounded p-3 premium-bg w-50'>
          <h4 className='d-inline-block'>Premium for {year} year's: </h4>
          <div className='border border-dark border-2 ms-2 rounded premium-box d-inline-block'>
            <h3 className='text-center'>{premium}</h3>
          </div>
          <div className='mt-3 d-flex justify-content-around'>
            <div className='border border-dark border-2 ms-2 rounded premium-box'>
              <h5 className='text-center'>Property Value</h5>
              <p className='text-center'>{property}</p>
            </div>
            <div className='border border-dark border-2 ms-2 rounded premium-box'>
              <h5 className='text-center'>Premium Value</h5>
              <p className='text-center'>{premium}</p>
            </div>
          </div>
        </div>
        <div className='mt-3 text-center'>
          <button className='btn btn-primary' onClick={openPopup}>Continue</button>
        </div>
      </div>

      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h4 style={{ textAlign: 'center', backgroundColor: 'lightblue' }}>Create An Account</h4>

            Full Name: <input type="text" placeholder="Full Name" value={fullName} onChange={handleFullNameChange} onKeyDown={handleFullNameKeyDown} />
            {showError && <span className="error-message">{fullNameError}</span>}  <br/><br/>
            Phone Number: <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneNumberChange} />
            {showError && <span className="error-message">{phoneNumberError}</span>}<br/><br/>
            Email: <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {showError && <span className="error-message">{emailError}</span>}<br/><br/>
            Choose Password: <input type="password" placeholder="Choose Password" value={choosePassword} onChange={(e) => setChoosePassword(e.target.value)} />
            {showError && <span className="error-message">{choosePasswordError}</span>}<br/><br/>
            Retype Password: <input type="password" placeholder="Retype Password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} />
            {showError && <span className="error-message">{retypePasswordError}</span>}<br/><br/>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleContinue}>Signup</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
            
            <div className='container mt-3'>
        {/* Your existing JSX */}
        <div className='mt- text-center'>
          <p>Already have an account? Please <Link to="/login">login</Link>.</p>
        </div>
      </div>
      {showLoginPopup && (
        <div className="popup-container">
          <div className="popup">
            <h4 style={{ textAlign: 'center', backgroundColor: 'lightblue' }}>Login</h4>
            Email: <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            {showError && <span className="error-message">{loginEmailError}</span>}<br /><br />
            Password: <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            {showError && <span className="error-message">{loginPasswordError}</span>}<br /><br />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleLogin}>Login</button>
              <button onClick={() => setShowLoginPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
    
      )}    
          </div>
        </div>
      )}

    </>
  );
}
export default QuotePage;
