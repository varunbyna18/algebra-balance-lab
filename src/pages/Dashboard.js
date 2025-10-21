import React, { useState, useEffect } from 'react';
import { attemptsAPI } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [dailyProgress, setDailyProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  useEffect(() => {
    loadUserStats();
  }, [selectedDifficulty, loadUserStats]);

  const loadUserStats = async () => {
    try {
      setIsLoading(true);
      const response = await attemptsAPI.getUserAttempts('user123', selectedDifficulty === 'all' ? null : selectedDifficulty);
      const statsResponse = await attemptsAPI.getUserStats('user123');
      
      setStats(response.data);
      setDailyProgress(statsResponse.data);
    } catch (error) {
      console.error('Error loading user stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const COLORS = {
    easy: '#27ae60',
    medium: '#f39c12',
    hard: '#e74c3c'
  };

  const prepareDifficultyData = () => {
    if (!stats?.byDifficulty) return [];
    
    return Object.entries(stats.byDifficulty).map(([difficulty, data]) => ({
      difficulty: difficulty.toUpperCase(),
      correct: data.correct,
      incorrect: data.total - data.correct,
      total: data.total,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
    }));
  };

  const prepareDailyData = () => {
    if (!dailyProgress?.dailyProgress) return [];
    
    return Object.entries(dailyProgress.dailyProgress)
      .map(([date, data]) => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        correct: data.correct,
        total: data.total,
        accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-7); // Last 7 days
  };

  const prepareAccuracyData = () => {
    if (!stats?.byDifficulty) return [];
    
    return Object.entries(stats.byDifficulty).map(([difficulty, data]) => ({
      name: difficulty.toUpperCase(),
      value: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      color: COLORS[difficulty]
    }));
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your progress...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="dashboard-error">
        <h2>No data available</h2>
        <p>Start solving equations to see your progress!</p>
      </div>
    );
  }

  const difficultyData = prepareDifficultyData();
  const dailyData = prepareDailyData();
  const accuracyData = prepareAccuracyData();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Your Progress Dashboard</h1>
        <div className="difficulty-filter">
          <label htmlFor="difficulty-filter">Filter by difficulty:</label>
          <select
            id="difficulty-filter"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.totalAttempts}</h3>
            <p>Total Attempts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.correctAttempts}</h3>
            <p>Correct Answers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{stats.accuracy}%</h3>
            <p>Accuracy Rate</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>{dailyProgress?.recentAttempts || 0}</h3>
            <p>Recent Attempts</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Performance by Difficulty</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={difficultyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="difficulty" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="correct" fill="#27ae60" name="Correct" />
              <Bar dataKey="incorrect" fill="#e74c3c" name="Incorrect" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Accuracy by Difficulty</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={accuracyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {accuracyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container full-width">
          <h3>Daily Progress (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="#667eea" strokeWidth={3} name="Accuracy %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-attempts">
        <h3>Recent Attempts</h3>
        <div className="attempts-list">
          {stats.recentAttempts?.slice(0, 5).map((attempt, index) => (
            <div key={index} className={`attempt-item ${attempt.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="attempt-info">
                <div className="attempt-equation">{attempt.equationId?.equation}</div>
                <div className="attempt-details">
                  <span className="attempt-answer">Your answer: {attempt.userAnswer}</span>
                  <span className="attempt-time">{attempt.timeSpent}s</span>
                </div>
              </div>
              <div className="attempt-result">
                {attempt.isCorrect ? '✅' : '❌'}
              </div>
            </div>
          )) || <p>No recent attempts</p>}
        </div>
      </div>

      <div className="achievements">
        <h3>Achievements</h3>
        <div className="achievements-grid">
          <div className={`achievement ${stats.totalAttempts >= 10 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🎯</div>
            <div className="achievement-text">
              <h4>First Steps</h4>
              <p>Complete 10 equations</p>
            </div>
          </div>
          <div className={`achievement ${stats.accuracy >= 80 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🏆</div>
            <div className="achievement-text">
              <h4>Accuracy Master</h4>
              <p>Achieve 80% accuracy</p>
            </div>
          </div>
          <div className={`achievement ${stats.totalAttempts >= 50 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">💪</div>
            <div className="achievement-text">
              <h4>Persistent Learner</h4>
              <p>Complete 50 equations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
