import React, { useEffect, useState } from 'react';

function CorrecoesList() {
  const [correcoes, setCorrecoes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/student/correcoes')
      .then(res => {
        if (res.status === 403) {
          setMessage('Seu plano não permite ver correções');
          return { essays: [] };
        }
        return res.json();
      })
      .then(data => setCorrecoes(data.essays || []))
      .catch(() => setMessage('Erro ao carregar correções'));
  }, []);

  return (
    <div>
      <h2>Correções</h2>
      {message && <p>{message}</p>}
      <ul>
        {correcoes.map((e, idx) => (
          <li key={idx}>{`${e.theme} - ${new Date(e.date).toLocaleDateString()} - ${e.status}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default CorrecoesList;
