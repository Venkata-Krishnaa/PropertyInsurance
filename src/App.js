import './App.css';
import PropertyDetails from './Components/PropertyDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RenderComponets from './Components/RenderComponets';
import QuotePage from './Components/QuotePage';
import DetailsForm from './Components/DetailsForm';
import Payment from './Components/Payment';
// import admin from './Components/Header';
import AdminPage from './Components/AdminPage';
import Admin from './Components/Admin';
import DashboardPage from './Components/DashboardPage';

function App() 
{ 
  return (
 <>     
 <Router>
      <Routes>
              <Route exact path="/" element={<RenderComponets/>}></Route>
              <Route path='/propertydetails' element={<PropertyDetails/>}></Route>
              <Route path='/quotepage/' element={<QuotePage/> }></Route>
              <Route path='/DetailsForm/' element={<DetailsForm/>}></Route>
              <Route path="/payment" element={<Payment/>} />
              <Route path ="/AdminPage" element ={<AdminPage/>}/>
              <Route path="/admin" element = {<Admin/>}/>
              <Route path ="/DashboardPage" element ={<DashboardPage/>}/>
              
          {/* <Route path="/admin">
            <AdminPage />
          </Route> */}
      </Routes>
  </Router>
  <div>
   
  </div>
   
  </>
  );
}

export default App;
