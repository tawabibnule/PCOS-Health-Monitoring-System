import React, { useState } from 'react';
import { useHealthData } from '../context/HealthDataContext';
import './JournalForm.css';

const symptomsList = [
  { id: 'acne', label: 'Acne/Breakouts' },
  { id: 'hair_loss', label: 'Hair Loss/Thinning' },
  { id: 'weight_gain', label: 'Weight Gain' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'mood_swings', label: 'Mood Swings' },
  { id: 'bloating', label: 'Bloating' },
  { id: 'cravings', label: 'Sugar Cravings' },
];

const JournalForm = () => {
  const { addLog } = useHealthData();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [periodStatus, setPeriodStatus] = useState('none');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleSymptom = (id) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLog({
      symptoms: selectedSymptoms,
      periodStatus,
      notes
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedSymptoms([]);
      setPeriodStatus('none');
      setNotes('');
    }, 3000);
  };

  return (
    <div className="glass-card journal-form">
      <h3>Daily Journal</h3>
      <p className="mb-4">Log your symptoms today to keep track of your health.</p>
      
      {submitted ? (
        <div className="success-message animate-fade-in">
          <p>🎉 Log saved successfully! Great job tracking today.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="animate-fade-in">
          <div className="form-group">
            <label className="form-label">Period Status</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="period" value="none" checked={periodStatus === 'none'} onChange={(e) => setPeriodStatus(e.target.value)} /> None
              </label>
              <label className="radio-label">
                <input type="radio" name="period" value="spotting" checked={periodStatus === 'spotting'} onChange={(e) => setPeriodStatus(e.target.value)} /> Spotting
              </label>
              <label className="radio-label">
                <input type="radio" name="period" value="light" checked={periodStatus === 'light'} onChange={(e) => setPeriodStatus(e.target.value)} /> Light
              </label>
              <label className="radio-label">
                <input type="radio" name="period" value="heavy" checked={periodStatus === 'heavy'} onChange={(e) => setPeriodStatus(e.target.value)} /> Heavy
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Symptoms</label>
            <div className="symptoms-grid">
              {symptomsList.map(symptom => (
                <button
                  key={symptom.id}
                  type="button"
                  className={`symptom-btn ${selectedSymptoms.includes(symptom.id) ? 'active' : ''}`}
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  {symptom.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes (Optional)</label>
            <textarea 
              className="form-control" 
              rows="3" 
              placeholder="How are you feeling today?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Entry</button>
        </form>
      )}
    </div>
  );
};

export default JournalForm;
