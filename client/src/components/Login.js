import React, { useState } from 'react';
import axios from 'axios';

function Login({ setUser }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
        const payload = isRegistering ? { username, email, password } : { email, password };
        try {
            const res = await axios.post(`http://localhost:5000${endpoint}`, payload);
            if (!isRegistering) {
                setUser({ userId: res.data.userId, username: res.data.username });
            } else {
                alert('Registration successful! Please log in.');
                setIsRegistering(false);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div style={{
            background: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            width: '380px',
            textAlign: 'center'
        }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>
                {isRegistering ? '🚀 Create Account' : '👋 Welcome Back'}
            </h2>
            {error && <p style={{ color: '#e74c3c', background: '#fadbd8', padding: '8px', borderRadius: '4px', fontSize: '14px' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <div style={{ marginBottom: '15px' }}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px' }}
                        />
                    </div>
                )}
                <div style={{ marginBottom: '15px' }}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px' }}
                    />
                </div>
                <button type="submit" style={{
                    width: '100%',
                    padding: '12px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s'
                }}>
                    {isRegistering ? 'Register' : 'Login'}
                </button>
            </form>
            <p 
                onClick={() => setIsRegistering(!isRegistering)} 
                style={{ color: '#667eea', cursor: 'pointer', marginTop: '20px', fontSize: '14px', fontWeight: '600' }}
            >
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
            </p>
        </div>
    );
}

export default Login;