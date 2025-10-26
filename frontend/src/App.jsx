import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/account/Dashboard'
import Transfer from './pages/account/Transfer'
import { RecoilRoot, useRecoilValue } from "recoil";
import { userState } from './state/userAtom';
import { useEffect } from 'react';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = useRecoilValue(userState);
  
  useEffect(() => {
    // Check for stored token on app load
    const token = localStorage.getItem('userToken');
    if (token && !user.isLoggedIn) {
      // You might want to verify the token with your backend here
      console.log('Stored token found:', token);
    }
  }, [user]);

  return user.isLoggedIn ? children : <Navigate to="/auth/login" />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const user = useRecoilValue(userState);
  return !user.isLoggedIn ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            {/* Auth routes - only accessible when not logged in */}
            <Route path='/auth' element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }>
              <Route path='register' element={<Register />} />
              <Route path='login' element={<Login />} />
              <Route index element={<Navigate to="/auth/login" />} />
            </Route>

            {/* Protected routes - only accessible when logged in */}
            <Route path='/dashboard' element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path='/transfer/:userId' element={
              <ProtectedRoute>
                <Transfer />
              </ProtectedRoute>
            } />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App;