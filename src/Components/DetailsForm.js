import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function DetailsForm({ fullName: initialFullName, phoneNumber: initialPhoneNumber, email: initialEmail, premium: premium, propertyValue }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '');
  const [fullName, setFullName] = useState(initialFullName || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [panCard, setPanCard] = useState('');
  const [panCardError, setPanCardError] = useState('');
  const [dob, setDob] = useState('');
  const [dobError, setDobError] = useState('');
  const {carpetArea, ageofthebuilding, disaster, securitycheck, salaryStatus } = location.state.propertyDetails;
  const [pincode, setPincode] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [area, setArea] = useState('');
  const [isCurrentAddress, setIsCurrentAddress] = useState('yes');
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);

  // const sessionStorageKey = 'formData';

  // useEffect(() => {
  //   const formDataFromSessionStorage = JSON.parse(sessionStorage.getItem(sessionStorageKey));
  //   if (formDataFromSessionStorage) {
  //     setFullName(formDataFromSessionStorage.fullName || '');
  //     setPhoneNumber(formDataFromSessionStorage.phoneNumber || '');
  //     setEmail(formDataFromSessionStorage.email || '');
  //     setPanCard(formDataFromSessionStorage.panCard || '');
  //     setDob(formDataFromSessionStorage.dob || '');
  //     setPincode(formDataFromSessionStorage.pincode || '');
  //     setFlatNo(formDataFromSessionStorage.flatNo || '');
  //     setArea(formDataFromSessionStorage.area || '');
  //     setIsCurrentAddress(formDataFromSessionStorage.isCurrentAddress || 'yes');
  //     setShowPropertyDetails(formDataFromSessionStorage.showPropertyDetails || false);
  //   }
  // }, []);

  // const updateSessionStorage = () => {
  //   const formData = {
  //     fullName,
  //     phoneNumber,
  //     email,
  //     panCard,
  //     dob,
  //     pincode,
  //     flatNo,
  //     area,
  //     isCurrentAddress,
  //     showPropertyDetails
  //   };

  //   sessionStorage.setItem(sessionStorageKey, JSON.stringify(formData));
    
  //};
  const[formData,setformData]=useState({
    fullName:"",
    phoneNumber:"",
    email:"",
    panCard:"",
    dob:"",
    pincode:"",
    flatNo:"",
    area:"",
    isCurrentAddress:"",
    showPropertyDetails:""
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setformData({ ...formData, [name]: val });


  }

   const handleIsCurrentAddressChange = (e) => {
     setIsCurrentAddress(e.target.value);
   setShowPropertyDetails(e.target.value === 'no');
  //   updateSessionStorage();
   };
const {state}=useLocation();
  const s=state.propertyValue;
  const d=state.premium;
  const e=state.fullName;
  const f=state.phoneNumber;
  const g=state.email;
  const h=state.carpetArea;
  const z=state.pincode

  const handleSubmit = () => {
    if (!fullName || !email || !phoneNumber || !panCard || !dob || !pincode || !flatNo || !area  ) {
      alert('Please fill in all required fields.');
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!panRegex.test(panCard)) {
      setPanCardError('Invalid PAN card format. Please enter a valid PAN card number.');
      return;
    } else {
      setPanCardError('');
    }

    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!dobRegex.test(dob)) {
      setDobError('Invalid date of birth format. Please enter a valid date of birth (dd/mm/yyyy).');
      return;
    } else {
      setDobError('');
    }

    navigate('/payment', { 
      state: {
        premiumAmount: premium,
        style: {
          color: 'blue',
          textDecoration: 'underline'
        }
      }
    });
  };
// const onChangeHandler = (l) => {
//     const name = l.target.name;
//     const val = l.target.value;
//     setPropertyDetails({ ...formData, [name]: val });


  return (
    <div className="container">
      <button style={{ position: 'absolute', top: 10, left: 10 }} onClick={() => navigate('/QuotePage')}>Back</button>
      <div className="container">
        <h3 style={{ textAlign: 'center', backgroundColor: 'lightblue' }}>Fill The Detailed Information</h3>
        <div className="details-container">
          <div className="user-details-column">
            <h1>User Detailed Information</h1>
            <div>
              <strong>Full Name</strong><span>: </span><span>{e}</span>
            </div>
            <div>
              <strong>Email</strong><span>: </span><span>{g}</span>
            </div>
            <div>
              <strong>Mobile</strong><span>: </span><span>{f}</span>
            </div>
            <div>
              <strong>Premium Value</strong><span>: </span><span>{d}</span>
            </div>
            <div>
              <strong>Property Value</strong><span>: </span><span>{s}</span>
            </div>
            <div>
              <strong>Carpet Area</strong><span>: </span><span>{carpetArea}</span>
            </div>
            <div>
              <strong>Age of the Building</strong> <span>: </span><span>{ageofthebuilding}</span>
            </div>
            {/* <div>
              <strong>Pincode</strong> <span>: </span><span>{z}</span>
            </div> */}
            <div>
              <strong>Disaster</strong> <span>: </span><span>{disaster}</span>
            </div>
            <div>
              <strong>Security Check</strong> <span>: </span><span>{securitycheck}</span>
            </div>
            <div>
              <strong>Salary Status</strong> <span>: </span><span>{salaryStatus}</span>
            </div>
            <div>
              <strong>Total Premium for Respective Years</strong> <span>: </span><span>{d}</span>
            </div>
          </div>
          
          <div className="details-column">
            <h2 style={{ textAlign: 'center', backgroundColor: 'lightgray' }}>PAN Card Details</h2>
            <label htmlFor="panCard">PAN Card No:<span style={{ color: 'red' }}>*</span></label>
            <input type="text" id="panCard" style={{ width: '100%' }} placeholder="eg. ABCDE1234F" value={panCard} onChange={(e) => setPanCard(e.target.value)} required />
            {/* <input ref={panCard} type='text' id="PanCard" name='PanCard' value={formData.panCard} onChange={onChangeHandler} autoComplete='off' className='p-1 rounded fw-bold' placeholder='EnterPancardNO' required /> */}
            {panCardError && <span style={{ color: 'red' }}>{panCardError}</span>}
            <label htmlFor="dob">Date of Birth (As per Pancard):<span style={{ color: 'red' }}>*</span></label>
            <input type="text" id="dob" style={{ width: '100%' }} placeholder="dd/mm/yyyy" value={dob} onChange={(e) => setDob(e.target.value)} required />

            <label htmlFor="fullName">Full Name:<span style={{ color: 'red' }}>*</span></label>
            <input type="text" id="fullName" style={{ width: '100%' }} value={fullName} onChange={(e) => setFullName(e.target.value)} required />

            <label htmlFor="email">Email:<span style={{ color: 'red' }}>*</span></label>
            <input type="text" id="email" style={{ width: '100%' }} value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="phoneNumber">Mobile Number:<span style={{ color: 'red' }}>*</span></label>
            <input type="text" id="phoneNumber"
            style={{ width: '100%' }} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

            <div className="Property-column">
              <h2 style={{ textAlign: 'center', backgroundColor: 'lightblue' }}>Property Information</h2>
              <label htmlFor="pincode">Pincode:<span style={{ color: 'red' }}>*</span></label>
              <input type="text" id="pincode" style={{ width: '100%' }} value={pincode} onChange={(e) => setPincode(e.target.value)} required />
              <label htmlFor="flatNo">Flat No/House No:<span style={{ color: 'red' }}>*</span></label>
              <input type="text" id="flatNo" style={{ width: '100%' }} value={flatNo} onChange={(e) => setFlatNo(e.target.value)} required />
              <label htmlFor="area">Area/Street:<span style={{ color: 'red' }}>*</span></label>
              <input type="text" id="area" style={{ width: '100%' }} value={area} onChange={(e) => setArea(e.target.value)} required />
              <label htmlFor="isCurrentAddress">Is the address mentioned above your current address:<span style={{ color: 'red' }}>*</span></label>
              <select id="isCurrentAddress" style={{ width: '100%' }} value={isCurrentAddress} onChange={handleIsCurrentAddressChange} required>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              
              {showPropertyDetails && (
                <div>
                  <label htmlFor="additionalPincode"> Pincode:<span style={{ color: 'red' }}>*</span></label>
                  <input type="text" id="additionalPincode" style={{ width: '100%' }} onChange={(e) => setPincode(e.target.value)} required />
                  <label htmlFor="additionalFlatNo"> Flat No/House No:<span style={{ color: 'red' }}>*</span></label>
                  <input type="text" id="additionalFlatNo" style={{ width: '100%' }} onChange={(e) => setFlatNo(e.target.value)} required />
                  <label htmlFor="additionalArea"> Area/Street:<span style={{ color: 'red' }}>*</span></label>
                  <input type="text" id="additionalArea" style={{ width: '100%' }} onChange={(e) => setArea(e.target.value)} required />
                </div>
                
              )}
            </div>
            <button onClick={handleSubmit} style={{ display: 'block', margin: '0 auto' }}>Proceed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsForm;
