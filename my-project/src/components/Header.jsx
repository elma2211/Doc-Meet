import React from 'react'

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
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">M</span>
                </div>
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900"></span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Appointments</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Doctors</a>
            </nav>

            {/* CTA Button */}
            <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </header>
</div>
  )
}

export default Header