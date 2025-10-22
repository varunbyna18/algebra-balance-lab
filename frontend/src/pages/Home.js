import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight">Algebra Balance Lab</span>
          </h1>
          <p className="hero-subtitle">
            Master basic algebra through interactive visualizations and hands-on problem solving
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">⚖️</span>
              <span>Interactive Balance Scale</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Progress Tracking</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Multiple Difficulty Levels</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/solver" className="btn btn-primary">
              Start Solving Equations
            </Link>
            <Link to="/dashboard" className="btn btn-secondary">
              View Progress
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="balance-scale">
            <div className="scale-base"></div>
            <div className="scale-arm"></div>
            <div className="scale-left">
              <div className="weight">5 + x</div>
            </div>
            <div className="scale-right">
              <div className="weight">9</div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-large">🔢</div>
            <h3>Choose Your Equation</h3>
            <p>Select from a variety of algebraic equations with different difficulty levels</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">⚖️</div>
            <h3>Visual Balance</h3>
            <p>See both sides of the equation balanced on an interactive scale</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">✅</div>
            <h3>Get Feedback</h3>
            <p>Receive instant feedback and learn from your mistakes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">📈</div>
            <h3>Track Progress</h3>
            <p>Monitor your improvement with detailed statistics and charts</p>
          </div>
        </div>
      </div>

      <div className="difficulty-section">
        <h2 className="section-title">Difficulty Levels</h2>
        <div className="difficulty-grid">
          <div className="difficulty-card easy">
            <h3>Easy</h3>
            <p>Simple addition and subtraction equations</p>
            <div className="example">5 + x = 9</div>
          </div>
          <div className="difficulty-card medium">
            <h3>Medium</h3>
            <p>Equations with coefficients and negative numbers</p>
            <div className="example">2x + 4 = 10</div>
          </div>
          <div className="difficulty-card hard">
            <h3>Hard</h3>
            <p>Complex equations with larger numbers</p>
            <div className="example">5x + 2 = 27</div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Start Learning?</h2>
        <p>Join thousands of students who have mastered algebra through visualization</p>
        <Link to="/solver" className="btn btn-primary btn-large">
          Begin Your Journey
        </Link>
      </div>
    </div>
  );
};

export default Home;
