import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard({ onRestart }) {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/quiz/leaderboard')
            .then(res => setLeaders(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <h2>🏆 Leaderboard</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #ddd', color: '#555' }}>
                        <th style={{ padding: '10px' }}>Rank</th>
                        <th style={{ padding: '10px' }}>Username</th>
                        <th style={{ padding: '10px' }}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaders.map((item, index) => (
                        <tr key={item._id} style={{ borderBottom: '1px solid #eee', background: index === 0 ? '#fff9e6' : 'transparent' }}>
                            <td style={{ padding: '12px', fontWeight: index === 0 ? 'bold' : 'normal' }}>{index === 0 ? '👑 1' : index + 1}</td>
                            <td style={{ padding: '12px', fontWeight: '600' }}>{item.username}</td>
                            <td style={{ padding: '12px' }}>{item.score} / {item.totalQuestions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={onRestart} style={{ width: '100%', padding: '12px', marginTop: '25px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Take Quiz Again</button>
        </div>
    );
}

export default Leaderboard;