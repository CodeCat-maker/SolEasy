import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'reactstrap';

const CsvUpload = ({ onUpload }) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split('\n').map(row => row.split(','));
        const wallets = rows.slice(1).map(row => ({
          publicKey: row[0],
          privateKey: row[1],
          createTime: row[2] || new Date().toISOString(),
          lastTransaction: row[3] || "N/A",
          balance: row[4] || "0"
        }));
        onUpload(wallets);
      };
      reader.readAsText(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.csv'
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the CSV file here ...</p>
      ) : (
        <p>Drag 'n' drop a CSV file here, or click to select one</p>
      )}
      <Button color="primary" onClick={() => document.querySelector('input[type="file"]').click()}>
        Select CSV File
      </Button>
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #007bff',
  borderRadius: '5px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  marginBottom: '20px',
  backgroundColors: 'black'
};

export default CsvUpload;