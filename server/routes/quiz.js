const router = require('express').Router();
const Question = require('../models/Question');
const Score = require('../models/Score');

// Seed sample questions if empty
router.get('/seed', async (req, res) => {
    try {
        const count = await Question.countDocuments();
        if (count === 0) {
            await Question.insertMany([
                {
                    questionText: "What is the capital of France?",
                    options: ["Berlin", "Madrid", "Paris", "Rome"],
                    correctAnswer: "Paris",
                    category: "Geography"
                },
                {
                    questionText: "Which programming language runs in the browser?",
                    options: ["Python", "Java", "JavaScript", "C++"],
                    correctAnswer: "JavaScript",
                    category: "Computer Science"
                },
                {
                    questionText: "What is 5 + 3 * 2?",
                    options: ["16", "11", "13", "10"],
                    correctAnswer: "11",
                    category: "Mathematics"
                }
            ]);
            return res.json({ message: "Sample questions seeded successfully!" });
        }
        res.json({ message: "Questions already exist." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all quiz questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit Quiz Score
router.post('/score', async (req, res) => {
    try {
        const { userId, username, score, totalQuestions } = req.body;
        const newScore = new Score({ user: userId, username, score, totalQuestions });
        await newScore.save();
        res.status(201).json({ message: 'Score saved successfully!', newScore });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Leaderboard (sorted by highest score descending)
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await Score.find().sort({ score: -1, createdAt: 1 }).limit(10);
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;