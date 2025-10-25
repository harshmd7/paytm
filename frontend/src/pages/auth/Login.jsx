import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { userState } from "../../state/userAtom.js"
import axios from 'axios'
import { useSetRecoilState } from 'recoil';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleLogin = async(e)=>{

    e.preventDefault();
    try {

      const res = await axios.post("/api/auth/login",{
        email,password
      })

      setUser({
        lastname:res.data.user.lastname,
        firstname:res.data.user.firstname,
        email:res.data.user.email,
        token: res.data.token,
        isLoggedIn: true,
      })

      navigate("/dashboard");
      
    } catch (error) {
      console.error("Login failed:", err);
      alert("Invalid credentials");
    }

  }

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h2>

      <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        Don’t have an account?{' '}
        <a href="/auth/register" className="text-indigo-600 hover:underline">
          Register
        </a>
      </p>
    </div>
  )
}

export default Login
