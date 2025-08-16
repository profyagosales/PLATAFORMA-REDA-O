import React, { useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Description as FileIcon } from '@mui/icons-material';

export function FileUploader({ onFileSelect, selectedFile, acceptedTypes, maxSize }) {
  const fileInputRef = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (maxSize && file.size > maxSize) {
      alert(`O arquivo é muito grande. Tamanho máximo permitido: ${maxSize / 1024 / 1024}MB`);
      return;
    }

    if (acceptedTypes) {
      const fileType = file.name.toLowerCase().split('.').pop();
      const types = acceptedTypes.split(',').map(type => 
        type.trim().toLowerCase().replace('.', '')
      );
      
      if (!types.includes(fileType)) {
        alert(`Tipo de arquivo não permitido. Tipos aceitos: ${acceptedTypes}`);
        return;
      }
    }

    onFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileInput({ target: { files: [file] } });
    }
  };

  return (
    <Box
      sx={{
        border: '2px dashed #ccc',
        borderRadius: 2,
        p: 3,
        textAlign: 'center',
        backgroundColor: '#fafafa',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: '#f5f5f5'
        }
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept={acceptedTypes}
        style={{ display: 'none' }}
      />

      {selectedFile ? (
        <Box>
          <FileIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
          <Typography>{selectedFile.name}</Typography>
          <Typography variant="caption" color="textSecondary">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              onFileSelect(null);
            }}
          >
            Remover
          </Button>
        </Box>
      ) : (
        <Box>
          <CloudUploadIcon sx={{ fontSize: 48, mb: 1, color: 'primary.main' }} />
          <Typography variant="h6" gutterBottom>
            Arraste e solte seu arquivo aqui
          </Typography>
          <Typography color="textSecondary" variant="body2">
            ou clique para selecionar
          </Typography>
          {acceptedTypes && (
            <Typography variant="caption" color="textSecondary" display="block">
              Tipos permitidos: {acceptedTypes}
            </Typography>
          )}
          {maxSize && (
            <Typography variant="caption" color="textSecondary" display="block">
              Tamanho máximo: {maxSize / 1024 / 1024}MB
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
}
