import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const docRef = doc(db, "appointments", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAppointment(docSnap.data());
        } else {
          alert("Appointment not found.");
        }
      } catch (err) {
        console.error("Error fetching appointment:", err);
      }
    };
    fetchAppointment();
  }, [id]);

  if (!appointment) {
    return <div className="p-10 text-center">Loading details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <Header />
      <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-md ">
        <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
        <p><strong>Doctor:</strong> {appointment.doctorName}</p>
        <p><strong>Specialty:</strong> {appointment.specialty}</p>
        <p><strong>Date:</strong> {appointment.date}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Type:</strong> {appointment.type}</p>
        <p><strong>Location:</strong> {appointment.location}</p>
        <p><strong>Email:</strong> {appointment.email}</p>
        <p><strong>Phone:</strong> {appointment.phone}</p>
        <p><strong>Status:</strong> {appointment.status}</p>
        <p><strong>Reason:</strong> {appointment.reason}</p>
        <p><strong>Patient:</strong> {appointment.patientName}</p>
      </div>
    </div>
  );
};

export default AppointmentDetails;
