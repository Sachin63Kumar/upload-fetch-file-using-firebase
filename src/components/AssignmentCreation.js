import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AssignmentCreation = () => {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [file, setFile] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [marks, setMarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 1 * 1024 * 1024) {
      // 1 MB size limit
      setErrorMessage("File size should not exceed 1 MB");
      setFile(null);
    } else {
      setErrorMessage("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage("File is required and should be less than 1 MB");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append("file", file);
    formData.append("deadline", deadline);
    formData.append("marks", marks);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/assignments/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Assignment created:", response.data);
      setTitle("");
      setInstructions("");
      setFile(null);
      setDeadline("");
      setMarks("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating assignment:", error);
      setErrorMessage("Error creating assignment. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create Assignment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div>
          <label>File:</label>
          <input type="file" onChange={handleFileChange} required />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Marks:</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Assignment</button>
      </form>
      <button onClick={() => navigate(`/assignments`)}>View Assignments</button>
    </div>
  );
};

export default AssignmentCreation;
