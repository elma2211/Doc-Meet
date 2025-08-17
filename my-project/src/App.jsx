import React from 'react';
// import DoctorsUploader from "./DoctorsUploader";
import { Star, ArrowRight } from 'lucide-react';
import Landingpage from './Pages/Landingpage';
import AboutUs from './Pages/AboutUs';
import Appointment from './Pages/Appointment';
import Doctors from './Pages/Doctors.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppointmentConfirmed from './Pages/AppointmentConfirmed.jsx';
import Help from './Pages/Help.jsx';
import AppointmentsDashboard from './Pages/AppointmentDashboard.jsx';
import MyAppointments from './Pages/MyAppointments.jsx';
import DoctorProfile from './Pages/DoctorProfile.jsx';
import AppointmentDetails from './Pages/AppointmentDetails.jsx';
import Login from './Pages/Login.jsx';
import Admin from './Pages/Admin.jsx';

// import UploadDoctor from './UploadDoctor.jsx';


const App = () => {
  return (
    <div className='App'>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          {/* <Route path="/book" element={<BookAppointment />} /> */}
           <Route path="/doctors" element={<Doctors />} />
          {/* <Route path="/doctors/:id" element={<DoctorDetail />} /> */}
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/myappointments" element={<MyAppointments />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path='/confirm' element={<AppointmentConfirmed/>}/>
          <Route path='/help' element={<Help/>}/>
          <Route path="/doctors/:name" element={<DoctorProfile />} />
          <Route path='/appointmentdash' element={<AppointmentsDashboard/>}/>
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
           <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            
          
         {/*<Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <DoctorsUploader /> */}
      {/* <Landingpage/> */}
      {/* <UpdateDoctorHours /> */}
      {/* <UploadDoctor/> */}
       
    </div>
 
  )
}

export default App;