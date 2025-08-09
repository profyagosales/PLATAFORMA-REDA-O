import React from 'react';

export default function Stats({ stats }) {
  return (
    <div>
      <h2>Estatísticas</h2>
      <ul>
        <li>Total de alunos: {stats.students}</li>
        <li>Total de redações: {stats.essays}</li>
        <li>Correções pendentes: {stats.pendingCorrections}</li>
      </ul>
    </div>
  );
}
