import React, { useMemo } from 'react';
import { useHealthData } from '../context/HealthDataContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthScoreHistoryChart = () => {
  const { logs } = useHealthData();

  const chartData = useMemo(() => {
    // Generate a mock history of health scores for the past 30 days based on logs.
    // Since calculating a running score precisely requires tracking state over time,
    // we'll simulate it by looking at 7-day rolling windows over the last 30 days.
    
    const data = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i -= 3) {
      const targetDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const windowStart = new Date(targetDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const windowLogs = logs.filter(log => {
        const d = new Date(log.date);
        return d >= windowStart && d <= targetDate;
      });

      let score = 100;
      windowLogs.forEach(log => {
        score -= (log.symptoms?.length || 0) * 2;
        if (log.periodStatus === 'irregular' || log.periodStatus === 'missed') {
          score -= 5;
        }
      });

      data.push({
        date: targetDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        score: Math.max(0, Math.min(100, score))
      });
    }

    return data;
  }, [logs]);

  return (
    <div className="chart-container" style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
          <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
          />
          <Line type="monotone" dataKey="score" stroke="var(--secondary)" strokeWidth={3} dot={{ fill: 'var(--secondary)', r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthScoreHistoryChart;
