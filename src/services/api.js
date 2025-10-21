import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Equations API
export const equationsAPI = {
  // Get all equations or filter by difficulty
  getEquations: (difficulty) => {
    const params = difficulty ? { difficulty } : {};
    return api.get('/equations', { params });
  },

  // Get a specific equation
  getEquation: (id) => {
    return api.get(`/equations/${id}`);
  },

  // Verify an answer
  verifyAnswer: (equationId, userAnswer) => {
    return api.post('/equations/verify', { equationId, userAnswer });
  },
};

// Attempts API
export const attemptsAPI = {
  // Record a new attempt
  recordAttempt: (userId, equationId, userAnswer, timeSpent) => {
    return api.post('/attempts', { userId, equationId, userAnswer, timeSpent });
  },

  // Get user's attempts and statistics
  getUserAttempts: (userId, difficulty) => {
    const params = difficulty ? { difficulty } : {};
    return api.get(`/attempts/${userId}`, { params });
  },

  // Get detailed statistics
  getUserStats: (userId) => {
    return api.get(`/attempts/${userId}/stats`);
  },
};

export default api;
