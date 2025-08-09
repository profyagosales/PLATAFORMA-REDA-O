import React from 'react';

const CorrectionPlayer = ({ url }) => {
  if (!url) return null;

  return (
    <div>
      <video controls src={url} style={{ width: '100%' }} />
    </div>
  );
};

export default CorrectionPlayer;
