import React, { useState, useEffect, useCallback } from 'react';
import { equationsAPI, attemptsAPI } from '../services/api';
import BalanceScale from '../components/BalanceScale';
import './EquationSolver.css';

const EquationSolver = () => {
  const [equations, setEquations] = useState([]);
  const [currentEquation, setCurrentEquation] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [difficulty, setDifficulty] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const loadEquations = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await equationsAPI.getEquations(difficulty === 'all' ? null : difficulty);
      setEquations(response.data);
      if (response.data.length > 0) {
        setCurrentEquation(response.data[0]);
        setStartTime(Date.now());
      }
    } catch (error) {
      console.error('Error loading equations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [difficulty]);

  useEffect(() => {
    loadEquations();
  }, [loadEquations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentEquation || !userAnswer) return;

    try {
      const response = await equationsAPI.verifyAnswer(currentEquation._id, parseFloat(userAnswer));
      const isCorrect = response.data.isCorrect;
      
      setFeedback({
        isCorrect,
        correctAnswer: response.data.correctAnswer,
        userAnswer: parseFloat(userAnswer)
      });

      // Record attempt
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      await attemptsAPI.recordAttempt(
        'user123', // In a real app, this would come from authentication
        currentEquation._id,
        parseFloat(userAnswer),
        timeSpent
      );

      setAttempts(prev => prev + 1);
    } catch (error) {
      console.error('Error verifying answer:', error);
    }
  };

  const nextEquation = () => {
    const currentIndex = equations.findIndex(eq => eq._id === currentEquation._id);
    const nextIndex = (currentIndex + 1) % equations.length;
    setCurrentEquation(equations[nextIndex]);
    setUserAnswer('');
    setFeedback(null);
    setStartTime(Date.now());
    setAttempts(0);
  };

  const resetCurrent = () => {
    setUserAnswer('');
    setFeedback(null);
    setStartTime(Date.now());
    setAttempts(0);
  };

  if (isLoading) {
    return (
      <div className="solver-loading">
        <div className="loading-spinner"></div>
        <p>Loading equations...</p>
      </div>
    );
  }

  if (!currentEquation) {
    return (
      <div className="solver-error">
        <h2>No equations available</h2>
        <p>Please try a different difficulty level.</p>
      </div>
    );
  }

  return (
    <div className="equation-solver">
      <div className="solver-header">
        <h1>Equation Solver</h1>
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="solver-content">
        <div className="equation-display">
          <div className="equation-card">
            <h2 className="equation-text">{currentEquation.equation}</h2>
            <p className="equation-description">{currentEquation.description}</p>
            <div className="equation-info">
              <span className={`difficulty-badge ${currentEquation.difficulty}`}>
                {currentEquation.difficulty.toUpperCase()}
              </span>
              <span className="attempts-count">Attempts: {attempts}</span>
            </div>
          </div>
        </div>

        <div className="visualization-section">
          <BalanceScale 
            equation={currentEquation}
            userAnswer={userAnswer ? parseFloat(userAnswer) : null}
            feedback={feedback}
          />
        </div>

        <div className="input-section">
          <form onSubmit={handleSubmit} className="answer-form">
            <div className="input-group">
              <label htmlFor="answer">Your Answer:</label>
              <input
                type="number"
                id="answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                step="0.01"
                disabled={feedback?.isCorrect}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={!userAnswer || feedback?.isCorrect}>
                Check Answer
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetCurrent}>
                Reset
              </button>
            </div>
          </form>

          {feedback && (
            <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="feedback-icon">
                {feedback.isCorrect ? '✅' : '❌'}
              </div>
              <div className="feedback-content">
                <h3>{feedback.isCorrect ? 'Correct!' : 'Incorrect'}</h3>
                {!feedback.isCorrect && (
                  <p>The correct answer is <strong>{feedback.correctAnswer}</strong></p>
                )}
                <p>Your answer: <strong>{feedback.userAnswer}</strong></p>
              </div>
            </div>
          )}

          {feedback?.isCorrect && (
            <div className="next-actions">
              <button className="btn btn-success" onClick={nextEquation}>
                Next Equation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquationSolver;
