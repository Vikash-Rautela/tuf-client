import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubmissionForm from './pages/SubmissionForm';
import SubmissionTable from './pages/SubmissionTable';
import Nav from './components/Nav'; // Make sure the path to Nav is correct

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<SubmissionForm />} />
          <Route path="/submissions" element={<SubmissionTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
