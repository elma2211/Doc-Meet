import React from 'react'
import { Link } from "react-router-dom";
import { Shield, Star, ArrowRight } from 'lucide-react';

function Header() {
  return (
    <div >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <Shield className="h-8 w-8 text-white" />
                   
                  </div>
              <span className="ml-3 text-xl font-semibold text-gray-900">MediCare</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
             <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/myappointments" className="text-gray-700 hover:text-blue-600 transition-colors">Appointments</Link>
               <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Doctors</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
            </nav>

            {/* CTA Button */}
            <div className='flex space-x-4'>
            <Link to='/help' className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors ">
              Help
            </Link>
            <Link to='/login' className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Login
            </Link>
            </div>
          </div>
        </div>
      </header>
</div>
  )
}

export default Header