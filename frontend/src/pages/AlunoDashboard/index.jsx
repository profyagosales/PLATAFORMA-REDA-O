import React from 'react';
import UploadRedacao from './UploadRedacao';
import CorrecoesList from './CorrecoesList';
import Perfil from './Perfil';

function AlunoDashboard() {
  return (
    <div>
      <h1>Dashboard do Aluno</h1>
      <UploadRedacao />
      <CorrecoesList />
      <Perfil />
    </div>
  );
}

export default AlunoDashboard;
