import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import { FileUploader } from '../../components/FileUploader';

function UploadRedacao() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Por favor, selecione um arquivo');
      return;
    }

    if (!title.trim()) {
      setError('Por favor, insira um título');
      return;
    }

    if (!theme.trim()) {
      setError('Por favor, selecione um tema');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('theme', theme);

      const response = await fetch('/api/student/upload-essay', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 403) {
        throw new Error('Seu plano não permite envio de redações');
      }

      if (!response.ok) {
        throw new Error('Erro ao enviar redação');
      }

      setSuccess(true);
      setTitle('');
      setTheme('');
      setFile(null);
    } catch (err) {
      setError(err.message || 'Erro ao enviar redação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const themes = [
    'Meio Ambiente',
    'Tecnologia',
    'Educação',
    'Saúde',
    'Sociedade',
    'Política',
    'Economia',
    'Cultura'
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Upload de Redação
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Redação enviada com sucesso!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Título da Redação"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Tema</InputLabel>
            <Select
              value={theme}
              label="Tema"
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes.map((theme) => (
                <MenuItem key={theme} value={theme}>
                  {theme}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ my: 3 }}>
            <FileUploader
              onFileSelect={handleFileSelect}
              selectedFile={file}
              acceptedTypes=".doc,.docx,.pdf"
              maxSize={5 * 1024 * 1024} // 5MB
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <UploadIcon />}
          >
            {loading ? 'Enviando...' : 'Enviar Redação'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default UploadRedacao;
