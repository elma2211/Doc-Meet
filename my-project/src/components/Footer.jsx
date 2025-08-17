import React from 'react'
import { Shield, Phone, Mail, MapPin, Clock} from 'lucide-react';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <span className="ml-3 text-xl font-semibold">MediCare</span>
              </div>
              <p className="text-blue-100 leading-relaxed">
                Your trusted healthcare partner providing quality medical services and expert care.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col leading-tight">
               
                  <Link to="/" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Home
                  </Link>
                <br/>
               
                  <Link to="/about" className="text-blue-100 hover:text-white transition-colors duration-200">
                    About Us
                  </Link>
               <br/>
                
                  <Link to="/doctors" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Our Doctors
                  </Link>
                <br/>
               
                  <Link to="/appointment" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Book Appointment
                  </Link>
                
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                    General Medicine
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Cardiology
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Pediatrics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Emergency Care
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 text-blue-300 mr-3 flex-shrink-0" />
                  <span className="text-blue-100">+91 123-4567890</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 text-blue-300 mr-3 flex-shrink-0" />
                  <span className="text-blue-100">info@medicare.com</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 text-blue-300 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-100">123 Paras Health Care, Medical City, MC 12345</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 text-blue-300 mr-3 flex-shrink-0" />
                  <span className="text-blue-100">24/7 Emergency Services</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-blue-600 mt-8 pt-8 text-center">
            <p className="text-blue-100">
              © 2024 MediCare. All rights reserved. Your trusted healthcare partner.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer