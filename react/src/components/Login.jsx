import React, { useState } from 'react';

const LoginRegister = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const endpoint = isLogin ? 'http://localhost:8085/api/login' : 'http://localhost:8085/api/register';
      const response = await fetch(endpoint, requestOptions);
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:', responseData);
        onLogin(); // Call the onLogin prop to set authentication state
      } else {
        console.error('Failed to fetch:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username:</label>
            <input type="text" name="username" className="form-input" required />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" name="email" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" name="password" className="form-input" required />
        </div>
        <div class="button-container">
            <button type="submit" className="auth-button">{isLogin ? 'Login' : 'Register'}</button>
        </div>
      </form>
      <button onClick={handleToggle} className="toggle-button">
        {isLogin ? 'Need to register? Click here' : 'Already have an account? Login here'}
      </button>
    </div>
  );
};

export default LoginRegister;
