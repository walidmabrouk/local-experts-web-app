import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        "/api/profile/Profile-photo-upload",
        formData
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default ImageUpload;
