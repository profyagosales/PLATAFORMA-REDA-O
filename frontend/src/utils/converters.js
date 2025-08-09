import { PDFDocument } from 'pdf-lib';
import { getDocument } from 'pdfjs-dist';
import mammoth from 'mammoth';

export async function pdfToCanvas(file, canvas) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1.5 });
  const context = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: context, viewport }).promise;
}

export async function docxToPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const { value } = await mammoth.extractRawText({ arrayBuffer });
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText(value);
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function imageToCanvas(file, canvas) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  await img.decode();
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  URL.revokeObjectURL(url);
}

export async function convertFile(file, canvas) {
  if (file.type === 'application/pdf') {
    await pdfToCanvas(file, canvas);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const pdfBlob = await docxToPdf(file);
    const pdfFile = new File([pdfBlob], 'converted.pdf', { type: 'application/pdf' });
    await pdfToCanvas(pdfFile, canvas);
  } else if (file.type.startsWith('image/')) {
    await imageToCanvas(file, canvas);
  } else {
    throw new Error('Unsupported file type');
  }
}
