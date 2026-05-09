import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHealthData } from '../../context/HealthDataContext';
import { User, Mail, Calendar, Settings, Activity } from 'lucide-react';
import './Profile.css';

const PatientProfile = () => {
  const { user } = useAuth();
  const { logs, healthScore } = useHealthData();

  if (!user) return null;

  return (
    <div className="container profile-page">
      <header className="page-header text-center">
        <h1>Your Profile</h1>
        <p>Manage your account settings and view your health summary.</p>
      </header>

      <div className="profile-grid">
        <div className="profile-sidebar">
          <div className="glass-card profile-card text-center">
            <img src={user.avatar} alt={user.name} className="profile-avatar-lg" />
            <h2>{user.name}</h2>
            <p className="text-muted mb-4">{user.email}</p>
            <div className="badge badge-success mb-4">{user.subscription} Plan</div>
            <button className="btn btn-secondary w-100">
              <Settings size={18} /> Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="glass-card mb-4">
            <h3 className="mb-4">Account Information</h3>
            <div className="info-list">
              <div className="info-item">
                <User className="text-muted" />
                <div>
                  <strong>Full Name</strong>
                  <p>{user.name}</p>
                </div>
              </div>
              <div className="info-item">
                <Mail className="text-muted" />
                <div>
                  <strong>Email Address</strong>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="info-item">
                <Calendar className="text-muted" />
                <div>
                  <strong>Member Since</strong>
                  <p>{new Date(user.joinedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="mb-4">Activity Summary</h3>
            <div className="stats-grid">
              <div className="stat-box text-center">
                <Activity size={32} color="var(--primary)" className="mb-2" />
                <h4>{logs.length}</h4>
                <p className="text-muted">Total Logs</p>
              </div>
              <div className="stat-box text-center">
                <Activity size={32} color={healthScore < 60 ? 'var(--danger)' : 'var(--success)'} className="mb-2" />
                <h4>{healthScore}</h4>
                <p className="text-muted">Avg Health Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
