
import axios from 'axios';

class PropertyInsuranceService 
{
    static postPropertyDetails(propertyDetails) 
    {
        const url = "http://localhost:8965/api/properties/add";

        return axios.post(url, propertyDetails);
    }
    static postformData(formData)
    {
        const url ="http://localhost:8965/api/filldetails/add1";
        
        return axios.post(url,formData);
    }
    static postsignup(signup)
    {
        const url ="http://localhost:8965/api/signupdetails/add2";
        
        return axios.post(url,signup);
    }
}

export default PropertyInsuranceService;
