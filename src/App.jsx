import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HealthDataProvider } from './context/HealthDataContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/patient/Dashboard';
import Journal from './pages/patient/Journal';
import BookDoctor from './pages/patient/BookDoctor';
import PublicDoctorProfile from './pages/patient/PublicDoctorProfile';
import PatientProfile from './pages/patient/PatientProfile';
import DoctorPortal from './pages/doctor/DoctorPortal';
import DoctorProfile from './pages/doctor/DoctorProfile';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function AppContent() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Patient Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRole="patient">
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/journal" element={
            <ProtectedRoute allowedRole="patient">
              <Journal />
            </ProtectedRoute>
          } />
          <Route path="/book-doctor" element={
            <ProtectedRoute allowedRole="patient">
              <BookDoctor />
            </ProtectedRoute>
          } />
          <Route path="/doctor/:id" element={
            <ProtectedRoute allowedRole="patient">
              <PublicDoctorProfile />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute allowedRole="patient">
              <PatientProfile />
            </ProtectedRoute>
          } />

          {/* Doctor Routes */}
          <Route path="/doctor-portal" element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorPortal />
            </ProtectedRoute>
          } />
          <Route path="/doctor-profile" element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorProfile />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <HealthDataProvider>
        <Router>
          <AppContent />
        </Router>
      </HealthDataProvider>
    </AuthProvider>
  );
}

export default App;
