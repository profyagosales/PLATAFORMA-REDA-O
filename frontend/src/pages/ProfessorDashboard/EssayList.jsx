import React from 'react';

export default function EssayList({ essays }) {
  return (
    <div>
      <h2>Redações</h2>
      <ul>
        {essays.map(essay => (
          <li key={essay.id}>{essay.title} - {essay.student}</li>
        ))}
      </ul>
    </div>
  );
}
