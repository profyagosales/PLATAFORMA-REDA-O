import React, { useState } from 'react';

function Perfil() {
  const [form, setForm] = useState({ nome: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/student/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.status === 403) {
        setMessage('Seu plano não permite atualizar o perfil');
        return;
      }
      const data = await res.json();
      setMessage(data.success ? 'Perfil atualizado' : 'Erro ao atualizar');
    } catch (err) {
      setMessage('Erro de comunicação');
    }
  };

  return (
    <div>
      <h2>Perfil</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <button type="submit">Salvar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Perfil;
