import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import Landingpage from './Pages/Landingpage';
import AboutUs from './Pages/AboutUs';
import Appointment from './Pages/Appointment';
import Doctors from './Pages/Doctors.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppointmentConfirmed from './Pages/AppointmentConfirmed.jsx';
import Help from './Pages/help.jsx';
import AppointmentsDashboard from './Pages/AppointmentDashboard.jsx';

const App = () => {
  return (
    <div className='App'>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          {/* <Route path="/book" element={<BookAppointment />} /> */}
           <Route path="/doctors" element={<Doctors />} />
          {/* <Route path="/doctors/:id" element={<DoctorDetail />} /> */}
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path='/confirm' element={<AppointmentConfirmed/>}/>
          <Route path='/help' element={<Help/>}/>
          <Route path='/appointmentdash' element={<AppointmentsDashboard/>}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <Landingpage/> */}
    </div>
 
  )
}

export default App;