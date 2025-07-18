// import React from 'react';
import { MapPin, Clock, Star } from 'lucide-react';
import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // adjust path if needed



const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'doctors'));
      const doctorsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  fetchDoctors();
}, []);

  const getSpecialtyColor = (specialty) => {
    const colors = {
      'Cardiology': 'bg-blue-500',
      'Dermatology': 'bg-blue-500',
      'Pediatrics': 'bg-blue-500',
      'Orthopedics': 'bg-blue-500',
      'Neurology': 'bg-blue-500',
      'Internal Medicine': 'bg-blue-500'
    };
    return colors[specialty] || 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
          <h1 className="text-4xl font-bold text-blue-900 text-center mb-4 mt-8">
            Our Medical Experts
          </h1>
          <p className="text-gray-600 text-center text-lg max-w-3xl mx-auto">
            Meet our team of qualified healthcare professionals dedicated to providing 
            exceptional medical care across various specialties.
          </p>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Doctor Image */}
              <div className="relative">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`${getSpecialtyColor(doctor.specialty)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {doctor.specialty}
                  </span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {doctor.name}
                </h3>
                
                <div className="flex items-center mb-3">
                  <span className="text-gray-600 text-sm mr-4">
                    {doctor.experience}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-900 font-medium ml-1">
                      {doctor.rating}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {doctor.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {doctor.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {doctor.hours}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium">
                    Book Now
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;