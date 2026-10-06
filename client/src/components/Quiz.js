import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Quiz({ user, onFinish }) {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/quiz/questions')
            .then(res => setQuestions(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleAnswerSubmit = () => {
        const isCorrect = selectedOption === questions[currentIndex].correctAnswer;
        const updatedScore = score + (isCorrect ? 1 : 0);
        if (isCorrect) setScore(updatedScore);

        setSelectedOption('');
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
        } else {
            setQuizFinished(true);
            submitFinalScore(updatedScore);
        }
    };

    const submitFinalScore = async (finalScore) => {
        try {
            await axios.post('http://localhost:5000/api/quiz/score', {
                userId: user.userId,
                username: user.username,
                score: finalScore,
                totalQuestions: questions.length
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (questions.length === 0) return <div style={{ color: '#fff', fontSize: '18px' }}>Loading Questions...</div>;

    if (quizFinished) {
        return (
            <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: '400px' }}>
                <h2>🎉 Quiz Completed!</h2>
                <p style={{ fontSize: '20px', margin: '20px 0' }}>Your Score: <b>{score} / {questions.length}</b></p>
                <button onClick={onFinish} style={{ padding: '12px 25px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>View Leaderboard</button>
            </div>
        );
    }

    const currentQ = questions[currentIndex];

    return (
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', marginBottom: '15px', fontSize: '14px' }}>
                <span>Category: <b>{currentQ.category}</b></span>
                <span>Question {currentIndex + 1} of {questions.length}</span>
            </div>
            <h3 style={{ color: '#333', marginBottom: '20px' }}>{currentQ.questionText}</h3>
            {currentQ.options.map((opt, idx) => (
                <div key={idx} style={{ 
                    margin: '10px 0', 
                    padding: '12px', 
                    border: selectedOption === opt ? '2px solid #667eea' : '1px solid #ddd', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    background: selectedOption === opt ? '#f0f3ff' : '#fff'
                }} onClick={() => setSelectedOption(opt)}>
                    <label style={{ cursor: 'pointer', display: 'block' }}>
                        <input 
                            type="radio" 
                            name="option" 
                            value={opt} 
                            checked={selectedOption === opt} 
                            onChange={(e) => setSelectedOption(e.target.value)} 
                            style={{ marginRight: '10px' }}
                        />
                        {opt}
                    </label>
                </div>
            ))}
            <button 
                onClick={handleAnswerSubmit} 
                disabled={!selectedOption} 
                style={{ 
                    width: '100%', 
                    padding: '12px', 
                    marginTop: '20px', 
                    background: selectedOption ? '#667eea' : '#ccc', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '6px', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: selectedOption ? 'pointer' : 'not-allowed' 
                }}
            >
                {currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
            </button>
        </div>
    );
}

export default Quiz;