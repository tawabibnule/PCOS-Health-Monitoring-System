import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Calendar, Settings, Star, Users } from 'lucide-react';
import '../patient/Profile.css';

const DoctorProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container profile-page">
      <header className="page-header text-center">
        <h1>Doctor Profile</h1>
        <p>Manage your professional details and clinic schedule.</p>
      </header>

      <div className="profile-grid">
        <div className="profile-sidebar">
          <div className="glass-card profile-card text-center">
            <img src={user.avatar} alt={user.name} className="profile-avatar-lg" />
            <h2>{user.name}</h2>
            <p className="text-primary font-weight-500 mb-2">{user.specialty}</p>
            <p className="text-muted mb-4">{user.email}</p>
            <button className="btn btn-secondary w-100">
              <Settings size={18} /> Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="glass-card mb-4">
            <h3 className="mb-4">Professional Information</h3>
            <div className="info-list">
              <div className="info-item">
                <Star className="text-accent" />
                <div>
                  <strong>Rating & Reviews</strong>
                  <p>4.9 / 5.0 (from 120+ patients)</p>
                </div>
              </div>
              <div className="info-item">
                <Users className="text-muted" />
                <div>
                  <strong>Consultations Completed</strong>
                  <p>1,450+ total consultations on PCOS Niramoy</p>
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
            <h3 className="mb-4">Availability Schedule</h3>
            <div className="schedule-list">
              <div className="schedule-item">
                <strong>Monday - Friday</strong>
                <span>09:00 AM - 05:00 PM</span>
              </div>
              <div className="schedule-item">
                <strong>Saturday</strong>
                <span>10:00 AM - 02:00 PM</span>
              </div>
              <div className="schedule-item">
                <strong>Sunday</strong>
                <span className="text-muted">Unavailable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
