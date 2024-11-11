// src/components/Leaderboard.tsx
import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Leaderboard: React.FC = () => {
  const [leaderboard] = useLocalStorage('leaderboard', []);

  return (
    <div style={{ padding: '32px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ marginBottom: '24px' }}>Leaderboard</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry: any, index: number) => (
            <tr key={index}>
              <td style={{ padding: '8px' }}>{entry.name}</td>
              <td style={{ textAlign: 'right', padding: '8px' }}>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
