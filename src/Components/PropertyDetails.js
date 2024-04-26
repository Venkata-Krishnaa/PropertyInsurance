import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { pincode_validation, property_value } from './Regex';
import PropertyInsuranceService from '../Service/PropertyInsuranceService';

function PropertyDetails() {
  const valueofpropertyRef = useRef(null);
  let navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('');
  const [propertyDetails, setPropertyDetails] = useState({
    valueofproperty: "",
    carpetArea: "",
    pincode: "",
    ageofthebuilding: "",
    disaster: "",
    securitycheck: "",
    salaryStatus: ""
  });

  const [validationError, setValidationError] = useState({
    valueofproperty: "",
    carpetArea: "",
    pincode: "",
    ageofthebuilding: "",
    disaster: "",
    securitycheck: "",
    salaryStatus: "" 
   });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setPropertyDetails({ ...propertyDetails, [name]: val });

    if (name === 'valueofproperty') {
      if (!property_value.test(val))
        setValidationError({ ...validationError, [name]: "Property value should be in Numbers" });
      else
        setValidationError({ ...validationError, [name]: "" });
    } else if (name === 'carpetArea') {
      if (!property_value.test(val))
        setValidationError({ ...validationError, [name]: "Carpetarea should be in Numbers" });
      else
        setValidationError({ ...validationError, [name]: "" });
    } else if (name === 'pincode') {
      if (!pincode_validation.test(val))
        setValidationError({ ...validationError, [name]: "Invalid Pincode" });
      else
        setValidationError({ ...validationError, [name]: "" });
    }
  }

  const handleDisasterSelect = (e) => {
    const val = e.target.value;
    setPropertyDetails({ ...propertyDetails, disaster: val });
    if (val === 'Effected' || val === 'notEffected') {
      setSelectedOption(true);
    } else {
      setSelectedOption(false);
    }
  };

  const SubmitHandler = (e) => {
    e.preventDefault();

    console.log(propertyDetails);

    if (property_value.test(propertyDetails.valueofproperty) && property_value.test(propertyDetails.carpetArea) && pincode_validation.test(propertyDetails.pincode) && propertyDetails.valueofproperty > 100000) 
    {
      navigate("/quotepage", { 
        state: { propertyDetails}
        })

        PropertyInsuranceService. postPropertyDetails(propertyDetails);

      }
  
    else if (propertyDetails.valueofproperty <= 100000) {
      alert("Property Should be Greater than the Rs.100000");
      valueofpropertyRef.current && valueofpropertyRef.current.focus();
      e.preventDefault();
    } else {
      alert("Please check the fields");
    }
  }

  useEffect(() => {
    console.log(propertyDetails); // Check updated propertyDetails here
  }, [propertyDetails]);

  return (
    <>
      <div className='bg-2 '>
        <h4 className='p-2 text-center fw-bold'>Property Details</h4>
      </div>

      <form className='container' onSubmit={SubmitHandler}>
        <header className='bg-warning container rounded'>
          <h4 className='px-3 py-1 fw-bold '>Structure Details</h4>
        </header>
        <div className='ms-5'>
          <table>
            <tbody>
              <tr>
                <td> <label htmlFor='valueofproperty' className='m-3 fw-bold'>Current Market Value of Property:<span className='text-danger'>*</span></label></td>
                <td><input ref={valueofpropertyRef} type='text' id="valueofproperty" name='valueofproperty' value={propertyDetails.valueofproperty} onChange={onChangeHandler} autoComplete='off' className='p-1 rounded fw-bold' placeholder='Min Rs.100000' required /><br />
                  {validationError.valueofproperty && <span className='text-danger'>{validationError.valueofproperty}</span>}
                </td>
              </tr>

              <tr>
                <td><label htmlFor='carpetarea' className='m-3 fw-bold'>Carpet area (sqft):<span className='text-danger'>*</span></label></td>
                <td><input type='text' id="carpetarea" name='carpetArea' value={propertyDetails.carpetArea} onChange={onChangeHandler} autoComplete='off' className='p-1 rounded fw-bold' required /><br />
                  {validationError.carpetArea && <span className='text-danger'>{validationError.carpetArea}</span>}
                </td>
              </tr>
              
              <tr>
                <td><label htmlFor='pincode' className='m-3 fw-bold'> Enter Pincode:<span className='text-danger'>*</span></label></td>
                <td><input type='text' id="pincode" name='pincode' value={propertyDetails.pincode} onChange={onChangeHandler} autoComplete='off' className='p-1 rounded fw-bold' maxLength={6} required /><br />
                  {validationError.pincode && <span className='text-danger'>{validationError.pincode}</span>}</td>
              </tr>

              <tr>
                <td><label htmlFor='ageofthebuilding' className='m-3 fw-bold'>Age of the Building:<span className='text-danger'>*</span></label></td>
                <td> <select id='Age Of The Building' name='ageofthebuilding' value={propertyDetails.ageofthebuilding} onChange={onChangeHandler} className='p-1 rounded' style={{ width: 225 }} required >
                  <option value="">select</option>
                  <option value="0-5 Years">  0-5 Years </option>
                  <option value="5-10 Years"> 5-10 Years </option>
                  <option value=">10-15 Years"> 10-15 Years </option>
                  <option value="15-20 Years"> 15-20 Years </option>
                </select>
                </td>
              </tr>
            <tr>
                <td><label htmlFor='disaster' className='m-3 fw-bold'>Has Your Property effected with floods/Earthquake in past 5years:<span className='text-danger'>*</span></label></td>
                <td> <select id='disaster' name='disaster' value={propertyDetails.disaster} onChange={handleDisasterSelect} className='p-1 rounded' style={{ width: 225 }} required >
                  <option value="">select</option>
                  <option value="Effected">Yes</option>
                  <option value="notEffected">No</option>
                </select>
                  {selectedOption && (
                    <div className="popup bg-light border border-2  border-danger rounded "  >
                      <div className="popup-inner p-3 text-center " >
                        <p>Your Application was rejected <br />as per terms & conditions</p>
                        <button className='btn btn-danger px-2' onClick={() => setSelectedOption(false)}>OK</button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <header className='bg-info rounded '>
          <h4 className='px-3 py-1 fw-bold'>Security Measures</h4>
        </header>

        <div className='ms-5'>
          <table>
            <tbody>
              <tr>
                <td> <label htmlFor='securitycheck' className='m-3 fw-bold'>24*7 Security:<span className='text-danger'>*</span> </label></td>

                <td><select id='securitycheck' name='securitycheck' value={propertyDetails.securitycheck} onChange={onChangeHandler} className='p-1 rounded securitylen' style={{ width: 225 }} required>
                  <option value="">select</option>
                  <option value="secured">Yes</option>
                  <option value="notSecured">No</option>
                </select> </td>
              </tr>

              <tr>
                <td><label htmlFor='salaryStatus' className='m-3 fw-bold'>Are you salried individual?<span className='text-danger'>*</span></label></td>

                <td> <select id='salaryStatus' name='salaryStatus' value={propertyDetails.salaryStatus} onChange={onChangeHandler} className='p-1 rounded securitylen' style={{ width: 225 }} required>
                  <option value="">select</option>
                  <option value="salaried">Yes</option>
                  <option value="notSalaried">No</option>
                </select><br /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='center-wrapper'><button type="submit" className='btn btn-primary px-3 '>Proceed</button></div>
      </form>

    </>
  );
}
export default PropertyDetails;
