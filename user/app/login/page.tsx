'use client';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      window.location.href = 'http://localhost:3002/admin';
    } else {
      alert('Login gagal');
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>🔐 Login Admin</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={handleLogin} style={button}>
          Login
        </button>
      </div>
    </div>
  );
}

const container = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f5f5f5',
};

const card = {
  background: 'white',
  padding: 20,
  borderRadius: 10,
  width: 300,
};

const input = {
  width: '100%',
  marginTop: 10,
  padding: 10,
};

const button = {
  marginTop: 15,
  width: '100%',
  padding: 10,
  backgroundColor: '#2b6cb0',
  color: 'white',
  border: 'none',
};