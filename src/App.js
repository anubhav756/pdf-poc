import React, { useState, useRef } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import axios from 'axios';
import 'react-html5-camera-photo/build/css/index.css';
import dataURIToBlob from './utils';

const App = () => {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState();
  const cameraRef = useRef();
  const handleTakePhoto = (dataUri) => setPreview(dataUri);
  const savePhoto = (accept) => {
    if (accept) setImages([...images, preview]);
    setPreview();
  };
  const handleSubmit = () => {
    const data = new FormData();

    images.map(dataURIToBlob).forEach((blob) => data.append('file', blob));

    axios.post('http://localhost:3001/upload', data)
      .then(res => {
        console.log(res.statusText)
      })
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }} ref={cameraRef}>
      {preview ? (
          <img src={preview} alt="Preview" width="100%" height="100%" />
        ) : (
          <Camera
            isFullscreen
            isMaxResolution
            isImageMirror={false}
            onTakePhotoAnimationDone = {handleTakePhoto}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
          />
      )}
      <div style={{ position: 'absolute', bottom: 30, right: 30 }}>
        {preview ? (
          <>
            <button onClick={() => savePhoto(false)}>Re-take</button>
            <button onClick={() => savePhoto(true)}>Next</button>
          </>
        ) : (
          <button onClick={handleSubmit}>Save PDF</button>
        )}
      </div>
    </div>
  );
}

export default App;