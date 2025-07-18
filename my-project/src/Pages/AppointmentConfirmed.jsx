import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AppointmentConfirmed() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the appointment data from the navigation state
  const appointmentData = location.state || {};
  
  // Default values in case no data is passed
  const {
    doctor = "Dr. Michael Chen",
    date = "July 26th, 2025",
    time = "09:00 AM",
    firstName = "Hgdsa",
    lastName = "Ytre",
    email = "xyz.doe@example.com",
    phone = "(+91)123-4567-987",
    symptoms = ""
  } = appointmentData;

  const goHome = () => {
    navigate("/");
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return "July 26th, 2025";
    
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    const formattedDate = date.toLocaleDateString('en-US', options);
    // Add ordinal suffix to day
    const day = date.getDate();
    const suffix = day % 10 === 1 && day !== 11 ? 'st' : 
                   day % 10 === 2 && day !== 12 ? 'nd' : 
                   day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    
    return formattedDate.replace(/\d+/, day + suffix);
  };

  return (
    <div className="min-h-screen bg-emerald-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-lg">
        <div className="text-5xl text-emerald-600 mb-4">
          ✔
        </div>

        <h2 className="text-2xl font-semibold text-emerald-600 mb-2">
          Appointment Confirmed!
        </h2>

        <p className="text-gray-500 mb-6">
          Your appointment has been successfully booked.
        </p>

        <div className="bg-emerald-50 p-4 rounded-lg mb-6 text-left space-y-2">
          <div className="flex">
            <span className="font-semibold w-24">Doctor:</span>
            <span>{doctor}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-24">Date:</span>
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-24">Time:</span>
            <span>{time}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-24">Patient:</span>
            <span>{firstName} {lastName}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-24">Email:</span>
            <span>{email}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-24">Phone:</span>
            <span>{phone}</span>
          </div>
          {symptoms && (
            <div className="flex flex-col">
              <span className="font-semibold mb-1">Symptoms:</span>
              <span className="text-sm text-gray-600">{symptoms}</span>
            </div>
          )}
        </div>

        <button
          onClick={goHome}
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-2 rounded-md transition"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}