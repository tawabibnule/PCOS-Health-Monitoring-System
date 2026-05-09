import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Activity } from 'lucide-react';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    if (role === 'patient') {
      navigate('/dashboard');
    } else {
      navigate('/doctor-portal');
    }
  };

  return (
    <div className="login-page container">
      <div className="glass-card login-card animate-fade-in">
        <div className="login-header text-center">
          <h2>Welcome to PCOS Niramoy</h2>
          <p className="text-muted">Select your role to continue (Mock Auth)</p>
        </div>

        <div className="role-selection">
          <button className="role-btn patient-role" onClick={() => handleLogin('patient')}>
            <User size={48} color="var(--primary)" />
            <h3>I am a Patient</h3>
            <p>Track your health and consult specialists.</p>
          </button>

          <button className="role-btn doctor-role" onClick={() => handleLogin('doctor')}>
            <Activity size={48} color="var(--secondary)" />
            <h3>I am a Doctor</h3>
            <p>Review patient logs and prescribe care.</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
