import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AssignmentCreation from "./components/AssignmentCreation";
import AssignmentList from "./components/AssignmentList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AssignmentCreation />} />
        <Route path="/assignments" element={<AssignmentList />} />
      </Routes>
    </Router>
  );
};

export default App;
