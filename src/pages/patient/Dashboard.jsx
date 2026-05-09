import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHealthData } from '../../context/HealthDataContext';
import JournalForm from '../../components/JournalForm';
import HealthScoreCard from '../../components/HealthScoreCard';
import SymptomTrendChart from '../../components/SymptomTrendChart';
import HealthScoreHistoryChart from '../../components/HealthScoreHistoryChart';
import * as Icons from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { tips, healthScore } = useHealthData();

  const IconComponent = ({ name }) => {
    const Icon = Icons[name];
    return Icon ? <Icon size={24} color="var(--primary)" /> : null;
  };

  return (
    <div className="container dashboard-page">
      <header className="page-header">
        <h1>Welcome back, {user?.name.split(' ')[0]}</h1>
        <p>Here is your health overview for today.</p>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <JournalForm />
          
          <div className="charts-section mt-4">
            <h3 className="mb-3">Health Score Trend (30 Days)</h3>
            <div className="glass-card mb-4 p-4">
              <HealthScoreHistoryChart />
            </div>

            <h3 className="mb-3">Symptom Frequency (30 Days)</h3>
            <div className="glass-card p-4">
              <SymptomTrendChart />
            </div>
          </div>
        </div>
        
        <div className="dashboard-sidebar">
          <HealthScoreCard />
          
          <div className="tips-section">
            <h3>Personalized Tips</h3>
            <div className="tips-list">
              {tips.map(tip => (
                <div key={tip.id} className="glass-card tip-card">
                  <div className="tip-icon">
                    <IconComponent name={tip.icon} />
                  </div>
                  <div className="tip-content">
                    <h4>{tip.title}</h4>
                    <p>{tip.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
