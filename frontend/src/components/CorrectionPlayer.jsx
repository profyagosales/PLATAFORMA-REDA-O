import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Rating,
  Card,
  CardContent
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Download as DownloadIcon } from '@mui/icons-material';

export default function CorrectionPlayer({ correctionId }) {
  const [correction, setCorrection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (correctionId) {
      fetchCorrection();
    }
  }, [correctionId]);

  const fetchCorrection = async () => {
    try {
      const response = await fetch(`/api/student/corrections/${correctionId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar correção');
      }

      const data = await response.json();
      setCorrection(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/student/corrections/${correctionId}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao baixar arquivo');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = correction.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!correction) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Correção não encontrada
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Correção da Redação
        </Typography>

        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Baixar Redação
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Informações Gerais
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Título:</Typography>
                <Typography variant="body1">{correction.title}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Tema:</Typography>
                <Typography variant="body1">{correction.theme}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Data de Envio:</Typography>
                <Typography variant="body1">
                  {new Date(correction.createdAt).toLocaleDateString('pt-BR')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Professor:</Typography>
                <Typography variant="body1">{correction.teacher?.name || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Avaliação
            </Typography>
            <Grid container spacing={3}>
              {correction.rubric?.map((criterion, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {criterion.name}
                      </Typography>
                      <Rating
                        value={criterion.score}
                        max={criterion.maxScore}
                        readOnly
                        size="large"
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {criterion.feedback}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Nota Final
              </Typography>
              <Typography variant="h3" color="primary" gutterBottom>
                {correction.finalScore}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Feedback Geral
            </Typography>
            <Typography variant="body1" paragraph>
              {correction.feedback}
            </Typography>

            {correction.recommendations && (
              <>
                <Typography variant="h6" gutterBottom>
                  Recomendações
                </Typography>
                <Typography variant="body1">
                  {correction.recommendations}
                </Typography>
              </>
            )}
          </Paper>
        </Grid>

        {correction.videoUrl && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Vídeo da Correção
              </Typography>
              <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                <video
                  controls
                  src={correction.videoUrl}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
