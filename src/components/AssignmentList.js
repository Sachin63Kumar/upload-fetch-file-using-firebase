import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/assignments`
        );
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      <h1>Assignment List</h1>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment._id}>
            <h2>{assignment.title}</h2>
            <p>{assignment.instructions}</p>
            <p>
              Deadline: {new Date(assignment.deadline).toLocaleDateString()}
            </p>
            <p>Marks: {assignment.marks}</p>
            <a
              href={assignment.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Assignment Description
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;
