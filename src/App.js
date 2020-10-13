import React, { useRef, useState } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Document, Page, pdfjs } from 'react-pdf';
import { jsPDF } from "jspdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const App = () => {
  const doc = useRef(new jsPDF());
  const [pages, setPages] = useState(0);
  const handleTakePhoto = (dataUri) => {
    doc.current.addImage(
      dataUri,
      'PNG',
      0,
      pages * 100,
      0,
      100,
    );
    setPages(pages + 1);
  }

  return (
    <>
    <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
      idealFacingMode={FACING_MODES.ENVIRONMENT}
    />
    <Document file={doc.current.output('blob')}>
      <Page pageNumber={1} />
    </Document>
    </>
  );
}

export default App;