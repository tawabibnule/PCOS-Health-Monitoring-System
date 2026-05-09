import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHealthData } from '../../context/HealthDataContext';
import PrescriptionModal from './PrescriptionModal';
import { FileText, Video, ChevronRight } from 'lucide-react';
import './DoctorPortal.css';

const DoctorPortal = () => {
  const { user } = useAuth();
  const { patients, patientLogs } = useHealthData();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedLogs = selectedPatient ? (patientLogs[selectedPatient.id] || []) : [];

  return (
    <div className="container doctor-portal-page">
      <header className="page-header">
        <h1>Doctor Portal</h1>
        <p>Welcome, {user?.name}. Here are your patients requiring attention.</p>
      </header>

      <div className="portal-grid">
        <div className="patient-list glass-card">
          <h3>Your Patients</h3>
          <div className="patients">
            {patients.map(patient => (
              <div 
                key={patient.id} 
                className={`patient-item ${selectedPatient?.id === patient.id ? 'active' : ''}`}
                onClick={() => setSelectedPatient(patient)}
              >
                <img src={patient.avatar} alt={patient.name} className="patient-avatar" />
                <div className="patient-summary">
                  <h4>{patient.name}</h4>
                  <span className={`score-badge ${patient.healthScore < 60 ? 'danger' : 'warning'}`}>
                    Score: {patient.healthScore}
                  </span>
                </div>
                <ChevronRight color="var(--text-muted)" />
              </div>
            ))}
          </div>
        </div>

        <div className="patient-details">
          {selectedPatient ? (
            <div className="glass-card details-card animate-fade-in">
              <div className="details-header">
                <div className="details-info">
                  <h2>{selectedPatient.name}</h2>
                  <p className="text-muted">{selectedPatient.email}</p>
                </div>
                <div className="actions">
                  <button className="btn btn-secondary">
                    <Video size={18} /> Call
                  </button>
                  <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    <FileText size={18} /> Prescribe
                  </button>
                </div>
              </div>

              <div className="recent-logs">
                <h3>Recent Symptom Logs</h3>
                <div className="logs-timeline">
                  {selectedLogs.slice(0, 5).map(log => (
                    <div key={log.id} className="timeline-item">
                      <div className="timeline-date">
                        {new Date(log.date).toLocaleDateString()}
                      </div>
                      <div className="timeline-content">
                        <div className="symptoms-tags">
                          {log.symptoms?.map(s => (
                            <span key={s} className="symptom-tag">{s.replace('_', ' ')}</span>
                          ))}
                        </div>
                        {log.periodStatus !== 'none' && (
                          <div className="text-sm mt-2 text-warning">Period: {log.periodStatus}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  {selectedLogs.length === 0 && (
                    <p className="text-muted">No recent logs for this patient.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card empty-state">
              <p>Select a patient to view their health history and prescribe treatments.</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <PrescriptionModal 
          patient={selectedPatient} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default DoctorPortal;
