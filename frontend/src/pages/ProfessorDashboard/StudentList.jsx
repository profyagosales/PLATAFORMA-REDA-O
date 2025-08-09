import React from 'react';

export default function StudentList({ students }) {
  return (
    <div>
      <h2>Alunos</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
}
