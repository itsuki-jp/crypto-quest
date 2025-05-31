import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import RSALearningPage from './pages/learning/RSALearningPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning/rsa" element={<RSALearningPage />} />
      </Routes>
    </Router>
  );
}

export default App;
