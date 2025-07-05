import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({ username, password });
      login(response);
      setError('');
    } catch (err) {
      setError('Wrong credentials. Retry');
      console.error('Login Error:', error)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required />
        </div>
        <div>
          <label>Password:</label>
          <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required /> 
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;