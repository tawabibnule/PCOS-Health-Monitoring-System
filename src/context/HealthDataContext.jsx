import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockLogs, mockTips, mockDoctors, mockPatientsList, mockPatientLogs } from '../data/mockData';

const HealthDataContext = createContext();

export const HealthDataProvider = ({ children }) => {
  const [logs, setLogs] = useState(mockLogs);
  const [tips, setTips] = useState(mockTips);
  const [doctors, setDoctors] = useState(mockDoctors);
  const [patients, setPatients] = useState(mockPatientsList);
  const [patientLogs, setPatientLogs] = useState(mockPatientLogs);
  const [healthScore, setHealthScore] = useState(100);

  const addLog = (logData) => {
    const newLog = {
      ...logData,
      id: `l${Date.now()}`,
      date: new Date().toISOString()
    };
    setLogs([newLog, ...logs]);
  };

  // Algorithm for MVP to calculate health score based on last 30 days
  useEffect(() => {
    let score = 100;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentLogs = logs.filter(log => new Date(log.date) >= thirtyDaysAgo);

    recentLogs.forEach(log => {
      score -= (log.symptoms?.length || 0) * 1.5;
      if (log.periodStatus === 'irregular' || log.periodStatus === 'missed' || log.periodStatus === 'heavy') {
        score -= 2;
      }
    });
    setHealthScore(Math.round(Math.max(0, Math.min(100, score))));
  }, [logs]);

  return (
    <HealthDataContext.Provider value={{ logs, addLog, tips, doctors, patients, patientLogs, healthScore }}>
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = () => useContext(HealthDataContext);
