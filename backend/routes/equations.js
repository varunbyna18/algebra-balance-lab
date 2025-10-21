const express = require('express');
const router = express.Router();
const Equation = require('../models/Equation');

// GET /api/equations - Get all equations or filter by difficulty
router.get('/', async (req, res) => {
  try {
    const { difficulty } = req.query;
    const filter = difficulty ? { difficulty } : {};
    const equations = await Equation.find(filter);
    res.json(equations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/equations/:id - Get a specific equation
router.get('/:id', async (req, res) => {
  try {
    const equation = await Equation.findById(req.params.id);
    if (!equation) {
      return res.status(404).json({ error: 'Equation not found' });
    }
    res.json(equation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/equations/verify - Verify an answer
router.post('/verify', async (req, res) => {
  try {
    const { equationId, userAnswer } = req.body;
    
    if (!equationId || userAnswer === undefined) {
      return res.status(400).json({ error: 'Equation ID and user answer are required' });
    }

    const equation = await Equation.findById(equationId);
    if (!equation) {
      return res.status(404).json({ error: 'Equation not found' });
    }

    const isCorrect = Math.abs(userAnswer - equation.solution) < 0.001; // Allow for small floating point differences
    
    res.json({
      isCorrect,
      correctAnswer: equation.solution,
      userAnswer,
      equation: equation.equation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/equations - Create a new equation (for seeding data)
router.post('/', async (req, res) => {
  try {
    const equation = new Equation(req.body);
    await equation.save();
    res.status(201).json(equation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
