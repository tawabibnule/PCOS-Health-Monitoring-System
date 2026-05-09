import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import JournalForm from '../../components/JournalForm';
import { Plus } from 'lucide-react';
import './Journal.css';

const Journal = () => {
  const { logs } = useHealthData();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container journal-page">
      <header className="page-header journal-header">
        <div>
          <h1>Your Journal History</h1>
          <p>Review your past symptoms and notes.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? 'Close Form' : 'Add New Entry'}
        </button>
      </header>

      {showForm && (
        <div className="mb-4 animate-fade-in">
          <JournalForm />
        </div>
      )}

      <div className="logs-list">
        {logs.map(log => (
          <div key={log.id} className="glass-card log-card animate-fade-in">
            <div className="log-header">
              <h4>{new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
              {log.periodStatus !== 'none' && (
                <span className="badge badge-warning">Period: {log.periodStatus}</span>
              )}
            </div>
            
            <div className="log-symptoms">
              <strong>Symptoms:</strong>
              <div className="symptoms-tags">
                {log.symptoms?.length > 0 ? (
                  log.symptoms.map(s => (
                    <span key={s} className="symptom-tag">{s.replace('_', ' ')}</span>
                  ))
                ) : (
                  <span className="text-muted">None reported</span>
                )}
              </div>
            </div>

            {log.notes && (
              <div className="log-notes">
                <strong>Notes:</strong>
                <p>{log.notes}</p>
              </div>
            )}
          </div>
        ))}
        {logs.length === 0 && (
          <p className="text-muted text-center">No journal entries found. Start logging today!</p>
        )}
      </div>
    </div>
  );
};

export default Journal;
