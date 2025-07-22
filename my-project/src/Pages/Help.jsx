import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Help() {
  const [isOpen, setIsOpen] = useState(true);
   const navigate = useNavigate();
  // const location = useLocation();
  const goHome = () => {
    navigate("/");
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Help Dialog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      
      {/* Dialog */}
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-8 relative z-50">
        {/* Close Button */}
        {/* <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button> */}

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-800">Help</h2>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center">
            <div className="relative">
              {/* Headset Icon */}
              <div className="w-12 h-12 relative">
                {/* Headband */}
                <div className="absolute top-1 left-2 right-2 h-2 bg-white rounded-full"></div>
                {/* Left ear cup */}
                <div className="absolute top-3 left-0 w-4 h-6 bg-white rounded-lg"></div>
                {/* Right ear cup */}
                <div className="absolute top-3 right-0 w-4 h-6 bg-white rounded-lg"></div>
                {/* Microphone */}
                <div className="absolute bottom-0 left-1 w-2 h-4 bg-white rounded-full"></div>
                <div className="absolute bottom-4 left-0 w-4 h-1 bg-white rounded-full"></div>
              </div>
              {/* Person silhouette */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-4 bg-white rounded-t-full"></div>
                <div className="w-1 h-2 bg-teal-500 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Call Us for any Queries
          </h3>
          <p className="text-gray-600 mb-6">
            Our customer support number
          </p>
          <div className="text-3xl font-bold text-teal-600 mb-8">
            +91 93918 04395
          </div>
        </div>

        {/* OK Button */}
        <button 
          onClick={goHome}
          className="w-full bg-blue-800 text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}
