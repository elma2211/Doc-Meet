import '../App.css';
import Header from '../components/Header';
import { useState } from 'react';

function Appointment() {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="container">
      {/* Header */}
      <Header/>

      {/* Appoinntment Form */}
      <h1>Book an Appointment</h1>
      <p>Schedule your visit with our healthcare professionals</p>

      <div className="form-wrapper">
        <div className="form-left">
          <div className="form-section">
            <label htmlFor="doctor">👤 Select Doctor</label>
            <select id="doctor">
              <option value="">Choose a doctor</option>
              <option value="dr-sitaraman">Dr. Sitaraman</option>
              <option value="dr-mayank">Dr. Mayank</option>
              <option value="dr-Siya">Dr.Siya</option>
            </select>
          </div>

          <div className="form-section">
            <label htmlFor="date">📅 Select Date</label>
            <input type="date" id="date" />
          </div>

          <div className="form-section">
            <label>⏰ Select Time</label>
            <div className="time-grid" id="timeGrid">
              {[
                "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
                "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
                "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
              ].map((time, index) => (
                <div
                  key={index}
                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => handleTimeSlotClick(time)}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-right">
          <div className="form-section">
            <label>📄 Patient Information</label>
            <input type="text" placeholder="First Name *" />
            <input type="text" placeholder="Last Name *" />
            <input type="email" placeholder="Email *" defaultValue="xyz.doe@example.com" />
            <input type="tel" placeholder="Phone Number" defaultValue="(+91)123-4567-987" />
            <textarea placeholder="Describe your symptoms or reason for the appointment..."></textarea>
          </div>
        </div>
      </div>

      <button className="submit-btn" onClick={submitForm}>Book Appointment</button>
    </div>
  );

  function submitForm() {
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('date').value;

    if (!doctor || !date || !selectedTime) {
      alert("Please fill in all required fields including selecting a time.");
      return;
    }

    alert(`Appointment booked successfully for ${date} at ${selectedTime}.`);
  }
}

export default Appointment;