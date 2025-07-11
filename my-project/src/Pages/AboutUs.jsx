import React from "react";
import { Shield, Heart, Users, Award, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";


// import { Heart, Award, Users, Shield } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">MediCare</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
               <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/appointments" className="text-gray-700 hover:text-blue-600 transition-colors">Appointments</Link>
              <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Doctors</Link>
              <Link to="/about" className="text-blue-600 font-medium">About Us</Link>
            </nav>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
              Book Appointment
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-600 mb-6">About MediCare</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Dedicated to providing exceptional healthcare services with compassion, innovation, 
            and excellence. Your health and wellbeing are our top priorities.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Mission */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 ml-4">Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To provide accessible, high-quality healthcare services that improve the lives of our 
              patients and communities. We strive to make healthcare convenient, affordable, and 
              centered around patient needs.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 ml-4">Our Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To be the leading healthcare platform that revolutionizes how patients access medical care, 
              creating a world where quality healthcare is within everyone's reach.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-gray-100 rounded-2xl p-12 mb-20">
          <h3 className="text-3xl font-bold text-blue-600 text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Compassion */}
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-blue-600 mb-4">Compassion</h4>
              <p className="text-gray-600 leading-relaxed">
                We treat every patient with empathy, understanding, and genuine care for their 
                wellbeing and concerns.
              </p>
            </div>

            {/* Trust */}
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-blue-600 mb-4">Trust</h4>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards of integrity, transparency, and confidentiality 
                in all our healthcare services.
              </p>
            </div>

            {/* Excellence */}
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-blue-600 mb-4">Excellence</h4>
              <p className="text-gray-600 leading-relaxed">
                We continuously strive for the highest quality in medical care, technology, 
                and patient experience.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-blue-600 mb-12">Meet Our Leadership Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="bg-blue-100 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Dr. Sarah Johnson</h4>
              <p className="text-blue-600 font-semibold mb-4">Chief Medical Officer</p>
              <p className="text-gray-600 text-sm">
                With over 15 years of experience in internal medicine and healthcare administration.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="bg-blue-100 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Michael Chen</h4>
              <p className="text-blue-600 font-semibold mb-4">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm">
                Leading healthcare innovation with a focus on patient-centered care and technology.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="bg-blue-100 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Dr. Emily Rodriguez</h4>
              <p className="text-blue-600 font-semibold mb-4">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm">
                Driving digital transformation in healthcare with cutting-edge medical technology.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;