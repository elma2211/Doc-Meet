// import React from 'react';
import { MapPin, Clock, Star, Filter } from 'lucide-react';
import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 
import { Link } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doctors'));
        const doctorsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(doctorsData);
        setFilteredDoctors(doctorsData);
        
        // Extract unique specialties
        const uniqueSpecialties = [...new Set(doctorsData.map(doctor => doctor.specialty))];
        setSpecialties(['All', ...uniqueSpecialties.sort()]);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors when specialty selection changes
  useEffect(() => {
    if (selectedSpecialty === 'All') {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(doctor => doctor.specialty === selectedSpecialty);
      setFilteredDoctors(filtered);
    }
  }, [selectedSpecialty, doctors]);

  const getSpecialtyColor = (specialty) => {
    const colors = {
      'Cardiology': 'bg-red-500',
      'Dermatology': 'bg-green-500',
      'Pediatrics': 'bg-pink-500',
      'Orthopedics': 'bg-purple-500',
      'Neurology': 'bg-indigo-500',
      'Internal Medicine': 'bg-blue-500'
    };
    return colors[specialty] || 'bg-gray-500';
  };

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty);
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

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filter by Specialty</h2>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => handleSpecialtyChange(specialty)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSpecialty === specialty
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
          
          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} 
            {selectedSpecialty !== 'All' && ` in ${selectedSpecialty}`}
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-500">
              No doctors available for the selected specialty. Try selecting a different filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Doctor Image */}
                <div className="relative">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-60 object-cover"
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
                    <Link to='/appointment' className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium text-center">
                      Book Now
                    </Link>
                    <Link to={`/doctors/${encodeURIComponent(doctor.name)}`} className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium text-center">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;