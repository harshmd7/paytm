import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/userAtom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Dashboard() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!user.isLoggedIn || !user.token) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get("/api/account/balance", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        setBalance(res.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
    if (user.isLoggedIn && user.token) {
      fetchBalance();
    }
  }, [user])

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length < 2) {
      setSearchResults([]);
      setErrorMsg("");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      const res = await axios.get(`/api/user?filter=${value}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSearchResults(res.data.users);
    } catch (error) {
      if (error.response?.status === 404) {
        setErrorMsg("No users found.");
      } else if (error.response?.status === 400) {
        setErrorMsg("Please type a name to search.");
      } else {
        setErrorMsg("Error fetching users.");
      }
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear user state and redirect to login
    localStorage.removeItem('userToken');
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.firstname}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* User Info Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.firstname?.[0]}{user.lastname?.[0]}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {user.firstname} {user.lastname}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-100">Current Balance</p>
                  <p className="text-3xl font-bold mt-2">
                    {balance !== null ? `₹${balance}` : "Loading..."}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Search Users Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Send Money</h2>
            <p className="text-gray-600 mb-4">Search users to send money</p>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search users by name..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {loading && (
              <div className="flex justify-center py-4">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {searchResults.map((u) => (
                  <div key={u._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-300">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {u.firstname} {u.lastname}
                      </p>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                    <button 
                      onClick={() => navigate(`/transfer/${u._id}`)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Send
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;