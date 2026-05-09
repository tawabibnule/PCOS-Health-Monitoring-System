import React from 'react';
import { useHealthData } from '../context/HealthDataContext';
import './HealthScoreCard.css';

const HealthScoreCard = () => {
  const { healthScore } = useHealthData();

  let statusText = 'Excellent';
  let statusColor = 'var(--success)';
  if (healthScore < 80) {
    statusText = 'Good';
    statusColor = 'var(--warning)';
  }
  if (healthScore < 60) {
    statusText = 'Needs Attention';
    statusColor = 'var(--danger)';
  }

  // Simple SVG Circle animation setup
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <div className="glass-card health-score-card">
      <div className="score-header">
        <h3>Smart Health Score</h3>
        <p>Based on your last 30 days of data.</p>
      </div>
      
      <div className="score-visual">
        <svg className="score-ring" width="160" height="160">
          <circle
            className="score-ring-bg"
            stroke="#E2E8F0"
            strokeWidth="12"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
          />
          <circle
            className="score-ring-progress"
            stroke={statusColor}
            strokeWidth="12"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset
            }}
          />
        </svg>
        <div className="score-value-container">
          <span className="score-value" style={{ color: statusColor }}>{healthScore}</span>
          <span className="score-max">/100</span>
        </div>
      </div>

      <div className="score-footer">
        <div className="status-badge" style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>
          {statusText}
        </div>
        {healthScore < 60 && (
          <p className="warning-text">Consider booking a consultation to review your symptoms.</p>
        )}
      </div>
    </div>
  );
};

export default HealthScoreCard;
