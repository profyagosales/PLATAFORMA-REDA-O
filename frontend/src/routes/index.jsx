import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';

// Páginas de autenticação
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// Dashboard do Aluno
import AlunoDashboard from '../pages/AlunoDashboard';
import UploadRedacao from '../pages/AlunoDashboard/UploadRedacao';
import CorrecoesList from '../pages/AlunoDashboard/CorrecoesList';
import Planos from '../pages/AlunoDashboard/Planos';
import Perfil from '../pages/AlunoDashboard/Perfil';

// Dashboard do Professor
import ProfessorDashboard from '../pages/ProfessorDashboard';
import EssayList from '../pages/ProfessorDashboard/EssayList';
import StudentList from '../pages/ProfessorDashboard/StudentList';
import Stats from '../pages/ProfessorDashboard/Stats';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rotas do Aluno */}
          <Route path="/aluno" element={
            <ProtectedRoute roles={['student']}>
              <AlunoDashboard />
            </ProtectedRoute>
          }>
            <Route path="upload" element={<UploadRedacao />} />
            <Route path="correcoes" element={<CorrecoesList />} />
            <Route path="planos" element={<Planos />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>

          {/* Rotas do Professor */}
          <Route path="/professor" element={
            <ProtectedRoute roles={['teacher']}>
              <ProfessorDashboard />
            </ProtectedRoute>
          }>
            <Route path="redacoes" element={<EssayList />} />
            <Route path="alunos" element={<StudentList />} />
            <Route path="estatisticas" element={<Stats />} />
          </Route>

          {/* Redireciona para login por padrão */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
