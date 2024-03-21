import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubmissionForm from './pages/SubmissionForm';
import SubmissionTable from './pages/SubmissionTable';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<SubmissionForm />} />
        <Route path="/submissions" element={<SubmissionTable />} />
      </Routes>
    </Router>
  );
}

export default App;
