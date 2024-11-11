// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#38B2AC', padding: '16px', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Quiz App</h2>
        <div>
          <Link to="/" style={{ marginRight: '16px', color: 'white' }}>
            Home
          </Link>
          <Link to="/leaderboard" style={{ color: 'white' }}>
            Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
