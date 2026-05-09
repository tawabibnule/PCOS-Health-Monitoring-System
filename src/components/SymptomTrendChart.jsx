import React, { useMemo } from 'react';
import { useHealthData } from '../context/HealthDataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SymptomTrendChart = () => {
  const { logs } = useHealthData();

  const chartData = useMemo(() => {
    const symptomCounts = {};
    
    // Calculate occurrences in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    logs.forEach(log => {
      const logDate = new Date(log.date);
      if (logDate >= thirtyDaysAgo && log.symptoms) {
        log.symptoms.forEach(sym => {
          const readableSym = sym.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
          symptomCounts[readableSym] = (symptomCounts[readableSym] || 0) + 1;
        });
      }
    });

    return Object.keys(symptomCounts).map(key => ({
      name: key,
      count: symptomCounts[key]
    })).sort((a, b) => b.count - a.count);
  }, [logs]);

  if (chartData.length === 0) {
    return <p className="text-muted text-center py-4">No symptoms logged in the last 30 days.</p>;
  }

  return (
    <div className="chart-container" style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 123, 156, 0.1)' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
          />
          <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SymptomTrendChart;
