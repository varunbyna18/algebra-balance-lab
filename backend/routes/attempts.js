const express = require('express');
const router = express.Router();
const Attempt = require('../models/Attempt');
const Equation = require('../models/Equation');

// POST /api/attempts - Record a new attempt
router.post('/', async (req, res) => {
  try {
    const { userId, equationId, userAnswer, timeSpent } = req.body;
    
    if (!userId || !equationId || userAnswer === undefined || !timeSpent) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const equation = await Equation.findById(equationId);
    if (!equation) {
      return res.status(404).json({ error: 'Equation not found' });
    }

    const isCorrect = Math.abs(userAnswer - equation.solution) < 0.001;
    
    const attempt = new Attempt({
      userId,
      equationId,
      userAnswer,
      isCorrect,
      timeSpent,
      difficulty: equation.difficulty
    });

    await attempt.save();
    res.status(201).json(attempt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/attempts/:userId - Get user's attempts and statistics
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { difficulty } = req.query;
    
    const filter = { userId };
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const attempts = await Attempt.find(filter).populate('equationId');
    
    // Calculate statistics
    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter(attempt => attempt.isCorrect).length;
    const accuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;
    
    // Group by difficulty
    const byDifficulty = attempts.reduce((acc, attempt) => {
      const diff = attempt.difficulty;
      if (!acc[diff]) {
        acc[diff] = { total: 0, correct: 0 };
      }
      acc[diff].total++;
      if (attempt.isCorrect) {
        acc[diff].correct++;
      }
      return acc;
    }, {});

    // Calculate average time per difficulty
    const avgTimeByDifficulty = attempts.reduce((acc, attempt) => {
      const diff = attempt.difficulty;
      if (!acc[diff]) {
        acc[diff] = { totalTime: 0, count: 0 };
      }
      acc[diff].totalTime += attempt.timeSpent;
      acc[diff].count++;
      return acc;
    }, {});

    Object.keys(avgTimeByDifficulty).forEach(diff => {
      avgTimeByDifficulty[diff].average = avgTimeByDifficulty[diff].totalTime / avgTimeByDifficulty[diff].count;
    });

    res.json({
      totalAttempts,
      correctAttempts,
      accuracy: Math.round(accuracy * 100) / 100,
      byDifficulty,
      avgTimeByDifficulty,
      recentAttempts: attempts.slice(-10).reverse() // Last 10 attempts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/attempts/:userId/stats - Get detailed statistics
router.get('/:userId/stats', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const attempts = await Attempt.find({ userId }).populate('equationId');
    
    // Daily progress (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentAttempts = attempts.filter(attempt => 
      new Date(attempt.createdAt) >= thirtyDaysAgo
    );
    
    const dailyProgress = recentAttempts.reduce((acc, attempt) => {
      const date = attempt.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { total: 0, correct: 0 };
      }
      acc[date].total++;
      if (attempt.isCorrect) {
        acc[date].correct++;
      }
      return acc;
    }, {});

    res.json({
      dailyProgress,
      totalAttempts: attempts.length,
      recentAttempts: recentAttempts.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
