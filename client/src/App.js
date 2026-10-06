import React, { useState } from 'react';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';

function App() {
    const [user, setUser] = useState(null);
    const [view, setView] = useState('quiz');

    if (!user) {
        return <Login setUser={setUser} />;
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '15px 30px', 
                background: 'rgba(255, 255, 255, 0.9)', 
                backdropFilter: 'blur(5px)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                alignItems: 'center',
                zIndex: 1000
            }}>
                <h3 style={{ margin: 0, color: '#333' }}>🎯 Quiz Platform</h3>
                <div>
                    <span style={{ marginRight: '20px', color: '#555', fontWeight: '600' }}>👤 {user.username}</span>
                    <button onClick={() => setUser(null)} style={{ padding: '6px 12px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
                </div>
            </div>
            <div style={{ marginTop: '100px' }}>
                {view === 'quiz' ? (
                    <Quiz user={user} onFinish={() => setView('leaderboard')} />
                ) : (
                    <Leaderboard onRestart={() => setView('quiz')} />
                )}
            </div>
        </div>
    );
}

export default App;