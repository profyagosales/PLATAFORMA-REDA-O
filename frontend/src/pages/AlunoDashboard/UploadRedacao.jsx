import React, { useState } from 'react';

function UploadRedacao() {
  const [file, setFile] = useState(null);
  const [theme, setTheme] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Selecione um arquivo');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('theme', theme);
    try {
      const res = await fetch('/student/upload', {
        method: 'POST',
        body: formData
      });
      if (res.status === 403) {
        setMessage('Seu plano não permite envio de redações');
        return;
      }
      const data = await res.json();
      setMessage(data.success ? 'Redação enviada!' : 'Erro ao enviar');
    } catch (err) {
      setMessage('Erro na comunicação com o servidor');
    }
  };

  return (
    <div>
      <h2>Enviar Redação</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Tema" value={theme} onChange={e => setTheme(e.target.value)} />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadRedacao;
