import React, { useState, useRef } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { pdfjs } from 'react-pdf';
import { jsPDF } from 'jspdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const App = () => {
  const [images, setImages] = useState([]);
  const handleTakePhoto = (dataUri) => setImages([...images, dataUri]);
  const cameraRef = useRef();
  const handleSubmit = () => {
    const { clientWidth, clientHeight } = cameraRef.current;
    const doc = new jsPDF({
      unit: 'px',
      format: [clientWidth, clientHeight],
    });

    images.forEach((image, i) => {
      if (i > 0) doc.addPage();

      doc.addImage(image, 'png', 0, 0, clientWidth, clientHeight);
    });

    doc.save();
  };

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <div style={{ position: 'relative', display: 'inline-block' }} ref={cameraRef}>
      <Camera
        isImageMirror={false}
        onTakePhoto = {handleTakePhoto}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        idealResolution={{ width: window.innerWidth, height: window.innerHeight }}
      />
        <div style={{ position: 'absolute', bottom: 30, right: 30 }}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;