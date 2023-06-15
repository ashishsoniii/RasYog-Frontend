import React, { useState } from "react";
import axios from "axios";
import excel from "../../assets/excel.png";

function UploadFile() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [selectedFileName1, setSelectedFileName1] = useState(
    "Select an Excel File"
  );
  const [selectedFileName2, setSelectedFileName2] = useState(
    "Select an Excel File"
  );

  const handleFile1Change = (event) => {
    const selectedFile = event.target.files[0];
    setFile1(selectedFile);
    setSelectedFileName1(
      selectedFile ? selectedFile.name : "Select an Excel File"
    );
  };

  const handleFile2Change = (event) => {
    const selectedFile = event.target.files[0];
    setFile2(selectedFile);
    setSelectedFileName2(
      selectedFile ? selectedFile.name : "Select an Excel File"
    );
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
          <p>Upload store_data_v2:</p>
          <label className="custom-file-label">
            <img
              className="file-input-image"
              src={excel}
              alt="logo-excel"
              onClick={() => document.getElementById("file-input1").click()}
            />
            <input
              id="file-input1"
              className="hidden-file-input"
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFile1Change}
            />
            <p className="selected-file-name">{selectedFileName1}</p>
          </label>
        </div>

        <div
          className="drop-area"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, handleFile2Change)}
        >
          <p>Upload total_data_file:</p>
          <label className="custom-file-label">
            <img
              className="file-input-image"
              src={excel}
              alt="logo-excel"
              onClick={() => document.getElementById("file-input2").click()}
            />
            <input
              id="file-input2"
              className="hidden-file-input"
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFile2Change}
            />
            <p className="selected-file-name">{selectedFileName2}</p>
          </label>
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
