import React, { useEffect, useState } from 'react';
import Stats from './Stats';
import EssayList from './EssayList';
import StudentList from './StudentList';

export default function ProfessorDashboard() {
  const [stats, setStats] = useState({ students: 0, essays: 0, pendingCorrections: 0 });
  const [essays, setEssays] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Placeholder for loading data from backend
    setStats({ students: 3, essays: 5, pendingCorrections: 2 });
    setEssays([
      { id: 1, title: 'Redação 1', student: 'Aluno A' },
      { id: 2, title: 'Redação 2', student: 'Aluno B' }
    ]);
    setStudents([
      { id: 1, name: 'Aluno A' },
      { id: 2, name: 'Aluno B' }
    ]);
  }, []);

  return (
    <div>
      <h1>Painel do Professor</h1>
      <Stats stats={stats} />
      <EssayList essays={essays} />
      <StudentList students={students} />
    </div>
  );
}
