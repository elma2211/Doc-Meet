import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import Landingpage from './Pages/Landingpage';
import AboutUs from './Pages/AboutUs';
import Appointment from './Pages/Appointment';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className='App'>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          {/* <Route path="/book" element={<BookAppointment />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} /> */}
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <Landingpage/> */}
    </div>
 
  )
}

export default App;