import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/userAtom';
import axios from 'axios';

function Dashboard() {
  const user = useRecoilValue(userState); // read from recoil
  const [balance, setBalance] = useState(null);

  useEffect(()=>{

    const fetchBalance = async()=>{
      try {
        const res = await axios.get("/api/account/balance",{
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
    
  },[user])

  
  return (
      <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Dashboard
      </h1>

      {user.isLoggedIn ? (
        <div className="space-y-4 text-gray-700">
          <p><strong>First Name:</strong> {user.firstname}</p>
          <p><strong>Last Name:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p>
            <strong>Balance:</strong>{" "}
            {balance !== null ? `₹${balance}` : "Loading..."}
          </p>
        </div>
      ) : (
        <p className="text-center text-red-500">
          Please log in to view your dashboard.
        </p>
      )}
    </div>
  )
}

export default Dashboard
