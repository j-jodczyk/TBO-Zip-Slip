"use client";

// Import required libraries
import React, { useState } from "react";
import axios from "axios";


const API_URL = 'http://localhost:4000';


function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  // Handle file upload (mock function)
  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${API_URL}/api/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert(`File "${selectedFile.name}" uploaded successfully!`);
      } else {
        alert('File upload failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while uploading the file.');
    }

    setSelectedFile(null);
  };

  return (
    <div className="App" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <header className="App-header">
        <h1 className="handjet" style={{ marginTop: 100, fontSize: "5em" }}>Unzipper</h1>
      </header>
        <input type="file" className="form-control" style={{ width: "50%" }} />
        <button onClick={handleUpload} style={{ marginTop: "10px" }} className="btn btn-dark">
          Prześlij plik
        </button>
    </div>
  );
}

export default App;
