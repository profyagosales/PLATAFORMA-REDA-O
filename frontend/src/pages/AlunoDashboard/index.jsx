import React, { useState } from 'react';
import UploadRedacao from './UploadRedacao';
import CorrecoesList from './CorrecoesList';
import Perfil from './Perfil';
import { Container, Menu, Content } from './styles';

function AlunoDashboard() {
  const [section, setSection] = useState('upload');

  const renderSection = () => {
    switch (section) {
      case 'correcoes':
        return <CorrecoesList />;
      case 'perfil':
        return <Perfil />;
      default:
        return <UploadRedacao />;
    }
  };

  return (
    <Container>
      <h1>Dashboard do Aluno</h1>
      <Menu>
        <button
          className={section === 'upload' ? 'active' : ''}
          onClick={() => setSection('upload')}
        >
          Enviar Redação
        </button>
        <button
          className={section === 'correcoes' ? 'active' : ''}
          onClick={() => setSection('correcoes')}
        >
          Correções
        </button>
        <button
          className={section === 'perfil' ? 'active' : ''}
          onClick={() => setSection('perfil')}
        >
          Perfil
        </button>
      </Menu>
      <Content>{renderSection()}</Content>
    </Container>
  );
}

export default AlunoDashboard;
