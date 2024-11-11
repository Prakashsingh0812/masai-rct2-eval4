// src/components/QuizPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}

const QuizPage: React.FC = () => {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category') || '22';  // Default to Geography if no category is provided
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(new Set()); // Track selected answers

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10`);
        
        if (response.status === 429) {
          setError("Too many requests. Please try again later.");
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        
        if (!data.results || !Array.isArray(data.results)) {
          setError("No questions available.");
          setLoading(false);
          return;
        }

        const formattedQuestions = data.results.map((question: any) => ({
          question: question.question,
          correct_answer: question.correct_answer,
          incorrect_answers: question.incorrect_answers,
          all_answers: [...question.incorrect_answers, question.correct_answer].sort(),
        }));

        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError("Error fetching questions. Please try again.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, retry]);

  const handleAnswerClick = (index: number) => {
    if (!selectedAnswers.has(index)) {
      setSelectedAnswers((prev) => new Set(prev).add(index));
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handleRetry = () => {
    setRetry(prev => !prev);
    setError(null);
    setLoading(true);
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleRetry} style={{ backgroundColor: '#38B2AC', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
          Retry
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ padding: '32px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ marginBottom: '24px' }}>Quiz</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
        <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></p>

        {currentQuestion.all_answers.map((answer, index) => (
          <button
            key={index}
            disabled={selectedAnswers.has(index)}  // Disable button if already clicked
            onClick={() => handleAnswerClick(index)}
            style={{
              backgroundColor: selectedAnswers.has(index) ? '#38B2AC' : '#38B2AC',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              opacity: selectedAnswers.has(index) ? 0.6 : 1,  // Reduce opacity if selected
            }}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}

        <button
          onClick={nextQuestion}
          style={{
            backgroundColor: '#38B2AC',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '16px',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
