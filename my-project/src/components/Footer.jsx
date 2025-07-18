import React from 'react'
import { Shield, Star, ArrowRight } from 'lucide-react';

function Footer() {
  return (
    <div>
         {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Footer Logo */}
            <div className="flex items-center justify-center mb-6">
              {/* <div className="bg-white rounded-lg p-2 mr-3"> */}
               {/* <div className="bg-blue-600 p-2 rounded-lg">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">M</span>
                </div>
              </div> */}
              {/* </div> */}
              <span className="text-2xl font-bold mr-5-"> </span>

               {/* Logo */}
            <div className="flex items-center">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <Shield className="h-8 w-8 text-white" />
                   
                  </div>
              <span className="ml-3 text-xl font-semibold text-white">MediCare</span>
            </div>
            </div>
            
            {/* Copyright */}
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