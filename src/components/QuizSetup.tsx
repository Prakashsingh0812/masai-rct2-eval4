// src/components/QuizSetup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizSetup: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('22');  // Default category: Geography
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(10);
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz?category=${category}&difficulty=${difficulty}&numQuestions=${numQuestions}`);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '400px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Set up your Quiz</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <input
          type="number"
          placeholder="Number of Questions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          onClick={startQuiz}
          style={{
            backgroundColor: '#38B2AC',
            color: 'white',
            padding: '12px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            width: '100%',
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSetup;
