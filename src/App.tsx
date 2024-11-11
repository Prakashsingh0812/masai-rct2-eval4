// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizSetup from './components/QuizSetup';
import QuizPage from './components/QuizPage';
import Leaderboard from './components/Leaderboard';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ padding: '32px', maxWidth: '1200px', margin: 'auto' }}>
          <Routes>
            <Route path="/" element={<QuizSetup />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
