import React, { useRef, useState } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Document, Page, pdfjs } from 'react-pdf';
import { jsPDF } from 'jspdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const App = () => {
  const doc = useRef(new jsPDF());
  const [pages, setPages] = useState(0);
  const handleTakePhoto = (dataUri) => {
    if (pages) doc.current.addPage();

    doc.current.addImage(
      dataUri,
      'PNG',
      0,
      0,
    );
  
    setPages(pages + 1);
  }

  return (
    <>
    <Camera
      onTakePhoto = {handleTakePhoto}
      idealFacingMode={FACING_MODES.ENVIRONMENT}
    />
    <Document file={doc.current.output('blob')}>
      {Array.from(
        new Array(doc.current.getNumberOfPages()),
        (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
          />
        ),
      )}
    </Document>
    </>
  );
}

export default App;