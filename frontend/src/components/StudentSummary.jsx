import React, { useEffect, useState } from 'react';

// Exibe resumo da correção para o aluno junto ao documento e vídeo.
const StudentSummary = ({ reportUrl, documentUrl, videoUrl }) => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (reportUrl) {
      fetch(reportUrl)
        .then(r => r.json())
        .then(data => setReport(data));
    }
  }, [reportUrl]);

  if (!report) {
    return <div>Carregando resumo...</div>;
  }

  return (
    <div>
      <h3>Resumo da Correção</h3>
      <ul>
        {report.criteria.map(c => (
          <li key={c.criterion}>
            <strong>{c.criterion}</strong>: {c.score} - {c.comment}
          </li>
        ))}
      </ul>
      <p>Nota Final: {report.finalGrade}</p>
      {documentUrl && (
        <p>
          <a href={documentUrl} target="_blank" rel="noopener noreferrer">
            Ver redação corrigida
          </a>
        </p>
      )}
      {videoUrl && (
        <p>
          <a href={videoUrl} target="_blank" rel="noopener noreferrer">
            Assistir vídeo
          </a>
        </p>
      )}
    </div>
  );
};

export default StudentSummary;
