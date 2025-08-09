import React, { useState } from 'react';

// Formulário para o professor preencher notas e comentários.
const RubricForm = ({ criteria = [], onSubmit }) => {
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});

  const handleScoreChange = (name, value) => {
    setScores({ ...scores, [name]: value });
  };

  const handleCommentChange = (name, value) => {
    setComments({ ...comments, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ scores, comments });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {criteria.map(c => (
        <div key={c.name} style={{ marginBottom: '1rem' }}>
          <label>
            {c.name} (peso {c.weight}) - {c.description}
            <input
              type="number"
              value={scores[c.name] || ''}
              onChange={e => handleScoreChange(c.name, e.target.value)}
              style={{ display: 'block' }}
            />
          </label>
          <textarea
            placeholder="Comentário"
            value={comments[c.name] || ''}
            onChange={e => handleCommentChange(c.name, e.target.value)}
            style={{ width: '100%', minHeight: '60px', marginTop: '0.5rem' }}
          />
        </div>
      ))}
      <button type="submit">Salvar notas</button>
    </form>
  );
};

export default RubricForm;
