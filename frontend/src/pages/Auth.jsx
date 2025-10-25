import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Auth() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left section (branding / message) */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-indigo-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg text-indigo-100 text-center">
          Manage your account securely. Please login or register to continue.
        </p>
      </div>

      {/* Right section (form outlet) */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-6">
       

        {/* Nested route outlet (Login/Register forms appear here) */}
        <Outlet />
      </div>
    </div>
  )
}

export default Auth
