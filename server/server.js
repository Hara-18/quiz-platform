const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch((err) => console.log('MongoDB Connection Error:', err));

app.get('/', (req, res) => {
    res.send('Quiz Platform API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

