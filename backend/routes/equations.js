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

// POST /api/equations/seed - Seed the database with sample equations
router.post('/seed', async (req, res) => {
  try {
    const sampleEquations = [
      {
        equation: "x + 7 = 12",
        difficulty: "easy",
        solution: 5,
        variables: [{ name: "x", coefficient: 1 }],
        constants: [{ value: 7, side: "left" }, { value: 12, side: "right" }],
        description: "Basic addition equation"
      },
      {
        equation: "2x + 3 = 11",
        difficulty: "easy",
        solution: 4,
        variables: [{ name: "x", coefficient: 2 }],
        constants: [{ value: 3, side: "left" }, { value: 11, side: "right" }],
        description: "Simple linear equation with coefficient"
      },
      {
        equation: "3x - 5 = 10",
        difficulty: "medium",
        solution: 5,
        variables: [{ name: "x", coefficient: 3 }],
        constants: [{ value: -5, side: "left" }, { value: 10, side: "right" }],
        description: "Linear equation with subtraction"
      },
      {
        equation: "4x + 8 = 24",
        difficulty: "medium",
        solution: 4,
        variables: [{ name: "x", coefficient: 4 }],
        constants: [{ value: 8, side: "left" }, { value: 24, side: "right" }],
        description: "Medium difficulty linear equation"
      },
      {
        equation: "5x - 12 = 18",
        difficulty: "medium",
        solution: 6,
        variables: [{ name: "x", coefficient: 5 }],
        constants: [{ value: -12, side: "left" }, { value: 18, side: "right" }],
        description: "Linear equation with negative constant"
      },
      {
        equation: "2x + 15 = 35",
        difficulty: "medium",
        solution: 10,
        variables: [{ name: "x", coefficient: 2 }],
        constants: [{ value: 15, side: "left" }, { value: 35, side: "right" }],
        description: "Linear equation with larger numbers"
      },
      {
        equation: "7x - 9 = 26",
        difficulty: "hard",
        solution: 5,
        variables: [{ name: "x", coefficient: 7 }],
        constants: [{ value: -9, side: "left" }, { value: 26, side: "right" }],
        description: "Advanced linear equation"
      },
      {
        equation: "3x + 14 = 41",
        difficulty: "hard",
        solution: 9,
        variables: [{ name: "x", coefficient: 3 }],
        constants: [{ value: 14, side: "left" }, { value: 41, side: "right" }],
        description: "Complex linear equation with larger coefficients"
      },
      {
        equation: "6x - 18 = 42",
        difficulty: "hard",
        solution: 10,
        variables: [{ name: "x", coefficient: 6 }],
        constants: [{ value: -18, side: "left" }, { value: 42, side: "right" }],
        description: "Challenging linear equation"
      },
      {
        equation: "8x + 7 = 55",
        difficulty: "hard",
        solution: 6,
        variables: [{ name: "x", coefficient: 8 }],
        constants: [{ value: 7, side: "left" }, { value: 55, side: "right" }],
        description: "Expert level linear equation"
      }
    ];

    // Clear existing equations
    await Equation.deleteMany({});
    
    // Insert sample equations
    await Equation.insertMany(sampleEquations);
    
    res.json({ 
      message: 'Database seeded successfully', 
      count: sampleEquations.length 
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
