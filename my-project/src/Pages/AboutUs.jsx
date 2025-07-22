import React from "react";
import { Shield, Heart, Users, Award, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";


// import { Heart, Award, Users, Shield } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <Header/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-15">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-600 mb-6"><span className="text-blue-950">About</span> MediCare</h2>
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
          <div className="bg-white rounded-xl p-8 shadow-sm ">
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
        <div className="bg-gray-100 rounded-2xl p-12 mb-20 bg-[url(/public/img3.jpg)] bg-cover relative ">
         <div className='absolute inset-0 bg-black/80'></div>
          <h3 className="relative z-10 text-3xl font-bold text-blue-600 text-center mb-12">Our Core Values</h3>
          <div className="relative z-10 grid md:grid-cols-3 gap-8">
            {/* Compassion */}
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-blue-600 mb-4">Compassion</h4>
              <p className="text-white leading-relaxed">
                We treat every patient with empathy, understanding, and genuine care for their 
                wellbeing and concerns.
              </p>
            </div>

            {/* Trust */}
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-blue-600 mb-4">Trust</h4>
              <p className="text-white leading-relaxed">
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
              <p className="text-white leading-relaxed">
                We continuously strive for the highest quality in medical care, technology, 
                and patient experience.
              </p>
            </div>
          </div>
        </div>

       
      </main>
    </div>
  );
};

export default AboutUs;