import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar glass-card">
      <div className="container nav-content">
        <Link to="/" className="nav-brand">
          <Activity color="var(--primary)" size={28} />
          <span>PCOS Niramoy</span>
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              {user.role === 'patient' && (
                <>
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  <Link to="/journal" className="nav-link">Journal</Link>
                  <Link to="/book-doctor" className="nav-link">Find Doctor</Link>
                </>
              )}
              {user.role === 'doctor' && (
                <Link to="/doctor-portal" className="nav-link">Portal</Link>
              )}
              <div className="user-menu">
                <Link to={user.role === 'patient' ? "/profile" : "/doctor-profile"} className="nav-link profile-link">
                  <img src={user.avatar} alt="Avatar" className="avatar" title="Go to Profile" />
                </Link>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 1rem' }}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
