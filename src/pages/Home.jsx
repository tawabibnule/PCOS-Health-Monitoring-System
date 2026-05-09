import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, HeartPulse } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text animate-fade-in">
            <h1>Take Control of Your Health Journey</h1>
            <p className="hero-subtitle">
              PCOS Niramoy helps you track symptoms, understand your health score, 
              and connect securely with top specialists—all in one beautiful app.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
            </div>
          </div>
          
          <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card feature-highlight">
              <Activity color="var(--primary)" size={48} />
              <h3>Smart Tracking</h3>
              <p>Log daily symptoms in seconds and see your health score.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="section-title">
          <h2>Why Choose PCOS Niramoy?</h2>
        </div>
        
        <div className="features-grid">
          <div className="glass-card feature-card">
            <HeartPulse color="var(--primary)" size={32} />
            <h3>Daily Journal</h3>
            <p>A simple, intuitive interface to log your symptoms, mood, and period cycle.</p>
          </div>
          <div className="glass-card feature-card">
            <Activity color="var(--accent)" size={32} />
            <h3>Health Score</h3>
            <p>Our algorithm analyzes 30 days of your data to provide actionable insights.</p>
          </div>
          <div className="glass-card feature-card">
            <ShieldCheck color="var(--success)" size={32} />
            <h3>Secure Consults</h3>
            <p>Book video calls with specialists. Your data is encrypted and private.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
