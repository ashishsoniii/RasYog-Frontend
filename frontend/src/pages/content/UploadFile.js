import React, { useState } from "react";
import axios from "axios";

function UploadFile() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, fileHandler) => {
    event.preventDefault();
    const droppedFile =
      event.dataTransfer?.files[0] || event.target?.files?.[0];
    if (droppedFile) {
      fileHandler(droppedFile);
    }
  };

  const handleUpload = () => {
    if (file1 && file2) {
      const formData = new FormData();
      formData.append("File1", file1);
      formData.append("File2", file2);

      axios
        .post("http://127.0.0.1:5000/upload", formData)
        .then((response) => {
          console.log(response.data);
          window.alert("File uploaded successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
        window.alert("Please upload both files");
    }
  };

  return (
    <>
      <div className="containerz">
        <div
          className="drop-area"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, handleFile1Change)}
        >
          <p>Upload Store_data_v2:</p>
          <input type="file" onChange={handleFile1Change} />
        </div>
        <div
          className="drop-area"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, handleFile2Change)}
        >
          <p>Upload total_data_file:</p>
          <input type="file" onChange={handleFile2Change} />
        </div>
      </div>
      <div className="container-btn">
        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </>
  );
}

export default UploadFile;
