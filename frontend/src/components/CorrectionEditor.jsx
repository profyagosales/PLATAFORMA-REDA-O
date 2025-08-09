import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import jsPDF from 'jspdf';

const COLORS = ['#ffff00', '#00ffff', '#ff00ff'];

function CorrectionEditor({ essayId, teacherId }) {
  const canvasEl = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const c = new fabric.Canvas(canvasEl.current, { selection: false });
    setCanvas(c);
    return () => c.dispose();
  }, []);

  const addHighlight = (color) => {
    if (!canvas) return;
    const rect = new fabric.Rect({
      fill: color,
      opacity: 0.4,
      left: 50,
      top: 50,
      width: 150,
      height: 30,
    });
    canvas.add(rect);
    const number = comments.length + 1;
    const text = window.prompt('Comentário:');
    setComments([...comments, { number, color, text }]);
  };

  const save = async () => {
    if (!canvas) return;
    const annotations = canvas.toJSON();
    await fetch('/annotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ essayId, teacherId, annotations, comments }),
    });
  };

  const exportFile = () => {
    if (!canvas) return;
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'px', [canvas.width, canvas.height]);
    pdf.addImage(img, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('correction.pdf');
  };

  return (
    <div className="correction-editor" style={{ display: 'flex' }}>
      <div>
        <div className="toolbar">
          {COLORS.map((c) => (
            <button key={c} style={{ background: c }} onClick={() => addHighlight(c)}>
              Marca-texto
            </button>
          ))}
          <button onClick={save}>Salvar</button>
          <button onClick={exportFile}>Exportar</button>
        </div>
        <canvas ref={canvasEl} width={800} height={600} />
      </div>
      <aside style={{ marginLeft: '1rem' }}>
        <ol>
          {comments.map((c) => (
            <li key={c.number} style={{ background: c.color }}>
              {c.number}. {c.text}
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}

export default CorrectionEditor;
