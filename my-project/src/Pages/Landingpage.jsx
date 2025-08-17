import React from 'react'
import { Shield, Star, ArrowRight ,Heart, Brain, Bone, Zap, Stethoscope, Smile } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";


function Landingpage() {

  const specialties = [
    {
      name: "Cardiology",
      description: "Heart and cardiovascular care",
      icon: Heart,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      conditions: [
        "Heart disease & arrhythmia",
        "High blood pressure", 
        "Chest pain evaluation",
        "Heart attack prevention"
      ]
    },
    {
      name: "Neurology",
      description: "Brain and nervous system disorders",
      icon: Brain,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      conditions: [
        "Stroke & seizures",
        "Migraine & headaches",
        "Epilepsy treatment",
        "Memory disorders"
      ]
    },
    {
      name: "Orthopedics",
      description: "Bone, joint and muscle care",
      icon: Bone,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      conditions: [
        "Bone fractures & injuries",
        "Arthritis & joint pain",
        "Sports injuries",
        "Back & spine problems"
      ]
    },
    {
      name: "Dermatology",
      description: "Skin, hair and nail conditions",
      icon: Zap,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      conditions: [
        "Acne & skin infections",
        "Eczema & psoriasis",
        "Skin cancer screening",
        "Hair loss treatment"
      ]
    },
    {
      name: "Endocrinology",
      description: "Hormone and diabetes care",
      icon: Stethoscope,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      conditions: [
        "Type 1 & 2 diabetes",
        "Thyroid disorders",
        "Hormone imbalances",
        "Metabolic disorders"
      ]
    },
    {
      name: "Mental Health",
      description: "Psychological and emotional wellness",
      icon: Smile,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      conditions: [
        "Depression & anxiety",
        "Stress management",
        "PTSD & trauma therapy",
        "Addiction counseling"
      ]
    }
  ];

  
  return (

   <div className="min-h-screen bg-gradient-to-br  from-blue-50 to-indigo-100">
      {/* Header */}
         <Header/>
      
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mt-15 bg-[url(/img2.jpg)] bg-cover relative  ">
      <div className='absolute inset-0 bg-black/60'></div>
        {/* <img src='/public/img1.jpg' alt='hospital'/> */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Health, <span className="text-blue-600">Our Priority</span>
          </h1>
          
          <p className="text-xl text-white mb-12 max-w-4xl mx-auto leading-relaxed">
            Book appointments with trusted healthcare professionals. Easy scheduling, 
            secure records, and quality care at your fingertips.
          </p>

          {/* */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to='/appointment' className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 flex items-center gap-2 font-semibold">
              Book Appointment
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link to="/doctors" className="bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 border border-gray-200 font-semibold">
              View Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Why Choose ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 9l2 2 4-4m6-6v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Scheduling</h3>
                <p className="text-gray-600 leading-relaxed">
                  Book appointments 24/7 with our intuitive calendar system. Choose your preferred time slots instantly.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Doctors</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access to qualified healthcare professionals across multiple specialties and medical fields.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Private</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your medical information is protected with industry-standard security and privacy measures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {/* Stat 1 */}
            <div className="text-white">
              <div className="text-5xl md:text-6xl font-bold mb-4">5K+</div>
              <div className="text-xl text-blue-100">Happy Patients</div>
            </div>

            {/* Stat 2 */}
            <div className="text-white">
              <div className="text-5xl md:text-6xl font-bold mb-4">50+</div>
              <div className="text-xl text-blue-100">Expert Doctors</div>
            </div>

            {/* Stat 3 */}
            <div className="text-white">
              <div className="text-5xl md:text-6xl font-bold mb-4">15+</div>
              <div className="text-xl text-blue-100">Specialties</div>
            </div>

            {/* Stat 4 */}
            <div className="text-white">
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl md:text-6xl font-bold">4.9</span>
                <svg className="w-8 h-8 ml-2 text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="text-xl text-blue-100">Rating</div>
            </div>
          </div>
        </div>
      </section>


        <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">
          Medical Specialties & Conditions We Treat
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Find the right specialist for your health needs. Our expert doctors treat a wide range of conditions.
        </p>
      </div>

      {/* Specialties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {specialties.map((specialty, index) => {
          const IconComponent = specialty.icon;
          return (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
            >
              {/* Icon and Title */}
              <div className="flex items-center mb-4">
                <div className={`${specialty.iconBg} p-3 rounded-lg mr-4`}>
                  <IconComponent className={`w-6 h-6 ${specialty.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-blue-800">
                  {specialty.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 font-medium">
                {specialty.description}
              </p>

              {/* Conditions List */}
              <ul className="space-y-2">
                {specialty.conditions.map((condition, conditionIndex) => (
                  <li key={conditionIndex} className="text-gray-500 text-sm">
                    • {condition}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* View All Specialists Button */}
      <div className="text-center">
        <Link to="/doctors" className="bg-white hover:bg-blue-900 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
          View All Specialists
        </Link>
      </div>
    </div>



       {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of satisfied patients who trust MediCare for their healthcare needs.
          </p>
          <Link to="/appointment" className="bg-gray-800 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-700 transition-colors inline-flex items-center">
            Book Your First Appointment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
        
        
        {/* Footer */}
        <Footer/>
    </div>
  );
};

export default  Landingpage;
  
