export const mockUsers = {
  patient1: {
    id: 'p1',
    name: 'Sarah Jenkins',
    role: 'patient',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?u=p1',
    joinedAt: '2025-11-15T10:00:00Z',
    subscription: 'Pro'
  },
  doctor1: {
    id: 'd1',
    name: 'Dr. Emily Chen',
    role: 'doctor',
    email: 'dr.chen@niramoy.com',
    specialty: 'Endocrinologist',
    avatar: 'https://i.pravatar.cc/150?u=d1',
    joinedAt: '2024-05-20T08:30:00Z'
  }
};

// Generate heavy doctor data
const specialties = ['Endocrinologist', 'Gynecologist', 'Nutritionist', 'Dermatologist', 'General Physician'];
const firstNames = ['Emily', 'Sarah', 'Jessica', 'Michael', 'David', 'James', 'Aisha', 'Fatima', 'Priya', 'Anjali', 'Robert', 'John', 'William', 'Sophia', 'Olivia', 'Emma', 'Ava', 'Isabella'];
const lastNames = ['Chen', 'Rahman', 'Smith', 'Doe', 'Khan', 'Ahmed', 'Gupta', 'Patel', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

const generateDoctors = (count) => {
  const doctors = [];
  for (let i = 1; i <= count; i++) {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    doctors.push({
      id: `d${i}`,
      name: `Dr. ${fn} ${ln}`,
      specialty: specialties[Math.floor(Math.random() * specialties.length)],
      rating: (4 + Math.random()).toFixed(1),
      reviews: Math.floor(Math.random() * 500) + 10,
      availability: Math.random() > 0.5 ? 'Available Today' : `Next Available: ${Math.random() > 0.5 ? 'Tomorrow' : 'in 2 days'}`,
      avatar: `https://i.pravatar.cc/150?u=d${i + 10}`,
      bio: `Experienced specialist dedicated to women's health with a focus on comprehensive care and evidence-based treatments.`,
      consultationsCompleted: Math.floor(Math.random() * 2000) + 100
    });
  }
  return doctors;
};

export const mockDoctors = generateDoctors(35);

const generatePatients = (count) => {
  const patients = [];
  for (let i = 1; i <= count; i++) {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    patients.push({
      id: `pat${i}`,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
      avatar: `https://i.pravatar.cc/150?u=pat${i + 50}`,
      healthScore: Math.floor(Math.random() * 40) + 40, // score between 40 and 80
      lastLog: new Date(Date.now() - Math.random() * 10000000000).toISOString()
    });
  }
  return patients;
};

export const mockPatientsList = generatePatients(25);

// Generate heavy logs for the past 6 months
const symptomsList = ['acne', 'hair_loss', 'weight_gain', 'fatigue', 'mood_swings', 'bloating', 'cravings'];
const periodStatuses = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'spotting', 'light', 'heavy'];

const generateLogs = (daysCount, patientId = 'p1') => {
  const logs = [];
  const now = new Date();
  
  for (let i = 0; i < daysCount; i++) {
    // 70% chance to have logged on any given day
    if (Math.random() > 0.3) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      
      const numSymptoms = Math.floor(Math.random() * 4); // 0 to 3 symptoms
      const dailySymptoms = [];
      for (let j = 0; j < numSymptoms; j++) {
        const s = symptomsList[Math.floor(Math.random() * symptomsList.length)];
        if (!dailySymptoms.includes(s)) dailySymptoms.push(s);
      }

      logs.push({
        id: `l_${patientId}_${i}`,
        patientId,
        date: date.toISOString(),
        symptoms: dailySymptoms,
        periodStatus: periodStatuses[Math.floor(Math.random() * periodStatuses.length)],
        notes: Math.random() > 0.8 ? 'Feeling a bit overwhelmed today, keeping track of diet.' : ''
      });
    }
  }
  return logs;
};

// Generates ~125 logs (70% of 180 days) for the logged in user
export const mockLogs = generateLogs(180, 'p1');

// Generate logs for all mock patients in doctor portal
export const mockPatientLogs = mockPatientsList.reduce((acc, patient) => {
  acc[patient.id] = generateLogs(30, patient.id); // 30 days of logs per patient
  return acc;
}, {});

export const mockTips = [
  {
    id: 't1',
    title: 'Anti-inflammatory Diet',
    content: 'Try adding more berries, fatty fish, and leafy greens to your meals to help reduce inflammation often associated with PCOS.',
    icon: 'Apple'
  },
  {
    id: 't2',
    title: 'Gentle Movement',
    content: 'Consider 30 minutes of yoga or brisk walking. Gentle, consistent exercise helps improve insulin resistance.',
    icon: 'Activity'
  },
  {
    id: 't3',
    title: 'Sleep Hygiene',
    content: 'Aim for 7-9 hours of sleep. Poor sleep can exacerbate insulin resistance and cortisol levels.',
    icon: 'Moon'
  },
  {
    id: 't4',
    title: 'Manage Stress',
    content: 'High stress increases cortisol, which can worsen symptoms. Try 5 minutes of deep breathing daily.',
    icon: 'Heart'
  }
];
