import Header from '../components/Header';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Appointment() {
  const [selectedTime, setSelectedTime] = useState(null);
 
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    firstName: '',
    lastName: '',
    email: 'xyz.doe@example.com',
    phone: '(+91)123-4567-987',
    symptoms: ''
  });
  
  const navigate = useNavigate();

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    
    if (!formData.doctor || !formData.date || !selectedTime || !formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields including selecting a time.");
      return;
    }

    // Navigate to confirmation page with form data
    navigate('/confirm', {
      state: {
        doctor: formData.doctor,
        date: formData.date,
        time: selectedTime,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        symptoms: formData.symptoms
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white mt-10 p-8 shadow-lg">
        {/* Header */}
        <Header/>

        {/* Appointment Form */}
        <h1 className="text-3xl font-bold text-blue-900 mb-1">Book an Appointment</h1>
        <p className="mt-0 text-gray-600 mb-8">Schedule your visit with our healthcare professionals</p>

        <div className="flex gap-10 mt-8 flex-wrap">
          {/* Left Form Section */}
          <div className="flex-1 min-w-80">
            <div className="mb-8">
              <label htmlFor="doctor" className="font-bold block mb-2">👤 Select Doctor</label>
              <select 
                id="doctor" 
                name="doctor" 
                value={formData.doctor}
                onChange={handleInputChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a doctor</option>
                <option value="Dr. Sitaraman">Dr. Sitaraman</option>
                <option value="Dr. Mayank">Dr. Mayank</option>
                <option value="Dr. Siya">Dr. Siya</option>
              </select>
            </div>

            <div className="mb-8">
              <label htmlFor="date" className="font-bold block mb-2">📅 Select Date</label>
              <input 
                type="date"
                 
                id="date" 
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-8">
              <label className="font-bold block mb-2">⏰ Select Time</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
                  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
                  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
                ].map((time, index) => (
                  <div
                    key={index}
                    className={`p-3 text-center rounded-md cursor-pointer border transition-colors ${
                      selectedTime === time 
                        ? 'bg-blue-800 text-blue-100 border-blue-800' 
                        : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                    }`}
                    onClick={() => handleTimeSlotClick(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="flex-1 min-w-80">
            <div className="mb-8">
              <label className="font-bold block mb-2">📄 Patient Information</label>
              <input 
                type="text" 
                name="firstName"
                placeholder="First Name *" 
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="text" 
                name="lastName"
                placeholder="Last Name *" 
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email *" 
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea 
                name="symptoms"
                placeholder="Describe your symptoms or reason for the appointment..."
                value={formData.symptoms}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 mb-4 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        <button 
          onClick={submitForm}
          className="block w-full bg-blue-900 text-white py-4 px-6 rounded-md text-lg font-medium cursor-pointer hover:bg-blue-800 transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default Appointment;