import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthData } from '../../context/HealthDataContext';
import { Star, Clock, Video, CheckCircle } from 'lucide-react';
import './BookDoctor.css';

const BookDoctor = () => {
  const { doctors } = useHealthData();
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const navigate = useNavigate();

  const handleBook = (doctorId) => {
    setBookingSuccess(doctorId);
    setTimeout(() => {
      setBookingSuccess(null);
    }, 3000);
  };

  return (
    <div className="container book-doctor-page">
      <header className="page-header text-center">
        <h1>Consult a Specialist</h1>
        <p>Book a secure video consultation with verified PCOS specialists.</p>
      </header>

      <div className="doctors-grid">
        {doctors.map(doctor => (
          <div key={doctor.id} className="glass-card doctor-card animate-fade-in">
            <div className="doctor-header">
              <img src={doctor.avatar} alt={doctor.name} className="doctor-avatar" />
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <span className="specialty">{doctor.specialty}</span>
                <div className="rating">
                  <Star size={16} color="var(--accent)" fill="var(--accent)" />
                  <span>{doctor.rating}</span>
                  <span className="reviews">({doctor.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <p className="doctor-bio">{doctor.bio}</p>
            
            <div className="doctor-availability">
              <Clock size={16} color="var(--text-muted)" />
              <span>{doctor.availability}</span>
            </div>

            {bookingSuccess === doctor.id ? (
              <div className="booking-success">
                <CheckCircle size={20} />
                <span>Appointment Confirmed!</span>
              </div>
            ) : (
              <div className="booking-actions">
                <button className="btn btn-secondary" onClick={() => navigate(`/doctor/${doctor.id}`)}>
                  View Profile
                </button>
                <button className="btn btn-primary" onClick={() => handleBook(doctor.id)}>
                  <Video size={18} /> Book Consult
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDoctor;
