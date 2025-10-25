import React from 'react'

export default function Register() {
  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Register</h2>

      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter your first name"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Enter your last name"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Submit
        </button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-4">
        Already have an account?{' '}
        <a href="/auth/login" className="text-indigo-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  )
}
