import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHealthData } from '../../context/HealthDataContext';
import { Star, Clock, ArrowLeft } from 'lucide-react';
import './Profile.css';

const PublicDoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors } = useHealthData();
  
  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="container text-center py-4">
        <h2>Doctor not found</h2>
        <button className="btn btn-secondary mt-4" onClick={() => navigate('/book-doctor')}>Back to Directory</button>
      </div>
    );
  }

  return (
    <div className="container profile-page">
      <header className="page-header text-center">
        <h1>Doctor Profile</h1>
        <p>Learn more about {doctor.name}</p>
      </header>

      <button className="btn btn-secondary mb-4" onClick={() => navigate('/book-doctor')}>
        <ArrowLeft size={18} /> Back to Directory
      </button>

      <div className="profile-grid">
        <div className="profile-sidebar">
          <div className="glass-card profile-card text-center">
            <img src={doctor.avatar} alt={doctor.name} className="profile-avatar-lg" />
            <h2>{doctor.name}</h2>
            <p className="text-primary font-weight-500 mb-2">{doctor.specialty}</p>
            
            <div className="rating mb-4" style={{ justifyContent: 'center' }}>
              <Star size={16} color="var(--accent)" fill="var(--accent)" />
              <span>{doctor.rating}</span>
              <span className="reviews">({doctor.reviews} reviews)</span>
            </div>

            <button className="btn btn-primary w-100">
              Book Consultation
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="glass-card mb-4">
            <h3 className="mb-4">About the Doctor</h3>
            <p style={{ lineHeight: '1.6' }}>{doctor.bio}</p>
          </div>

          <div className="glass-card">
            <h3 className="mb-4">Availability Schedule</h3>
            <div className="schedule-list">
              <div className="schedule-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={18} className="text-muted" />
                  <strong>Current Status</strong>
                </div>
                <span className="text-success">{doctor.availability}</span>
              </div>
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

export default PublicDoctorProfile;
