// src/authcontext/authContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Step 1: login
      const loginRes = await axiosInstance.post('/auth/login', {
        email,
        password,
        source: 'admin',
      });

      const accessToken = loginRes.data?.accessToken;
      if (accessToken) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('token', accessToken);
      }

      // Step 2: get user profile
      const meRes = await axiosInstance.get('/auth/me');
      setUser(meRes.data.user);
      localStorage.setItem('authUser', JSON.stringify(meRes.data.user));

      navigate('/admin/dashboard');
      return true;
    } catch (err) {
      console.error("Login error:", err);

      // ✅ Extract meaningful backend message
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";

      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('authUser');
      localStorage.removeItem('token');
      setUser(null);
      delete axiosInstance.defaults.headers.common['Authorization'];
      navigate('/login');
    }
  };

  // ✅ Auto attach token if available
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // ✅ Context value
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
