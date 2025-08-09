import { useRef } from 'react';
import { convertFile } from '../utils/converters';

export default function FileUploader() {
  const canvasRef = useRef(null);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await convertFile(file, canvasRef.current);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <canvas ref={canvasRef} />
    </div>
  );
}
