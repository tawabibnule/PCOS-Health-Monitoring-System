import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import './PrescriptionModal.css';

const PrescriptionModal = ({ patient, onClose }) => {
  const [medication, setMedication] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-content animate-fade-in">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        {isSent ? (
          <div className="modal-success">
            <CheckCircle size={48} color="var(--success)" />
            <h3>Prescription Sent!</h3>
            <p>Digital prescription has been securely sent to {patient.name}.</p>
          </div>
        ) : (
          <>
            <h2>Digital Prescription</h2>
            <p className="text-muted mb-4">Patient: <strong>{patient.name}</strong></p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Medication & Dosage</label>
                <textarea 
                  className="form-control" 
                  rows="2"
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                  placeholder="e.g. Metformin 500mg, twice daily"
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label className="form-label">Lifestyle Instructions</label>
                <textarea 
                  className="form-control" 
                  rows="3"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Continue anti-inflammatory diet, monitor blood sugar."
                  required
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Send Securely</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PrescriptionModal;
