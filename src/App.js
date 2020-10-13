import React from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

function App (props) {
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto', dataUri);
  }

  return (
    <>
    <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
      idealFacingMode={FACING_MODES.ENVIRONMENT}
    />
      <PDFViewer>
      <MyDocument />
    </PDFViewer>
    </>
  );
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export default App;