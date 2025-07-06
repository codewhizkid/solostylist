import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StylistContext } from '../context/StylistContext';

const WelcomePage = () => {
  const { setStylist } = useContext(StylistContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    if (isRegistering) {
      try {
        const response = await fetch('http://localhost:3001/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        setRegistrationSuccess(true);

      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Authentication failed');
        }
        
        localStorage.setItem('token', data.token);
        setStylist(prev => ({...prev, ...data.stylist}));
        
        if (data.stylist.bio) {
          navigate('/dashboard');
        } else {
          navigate('/onboarding/about');
        }

      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
        <p className="text-xl text-gray-300 mb-8">
          You've taken the first step to being an independent stylist.
        </p>
        <button
          onClick={() => {
            setRegistrationSuccess(false);
            setIsRegistering(false);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Simply Independent
        </h1>
        <p className="text-xl text-gray-400">
          {isRegistering ? 'Create your account to get started.' : 'Log in to manage your business.'}
        </p>
      </div>

      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-lg">
        <form onSubmit={handleAuth}>
          {isRegistering && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            {isRegistering ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="font-medium text-indigo-400 hover:text-indigo-300 ml-1"
          >
            {isRegistering ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default WelcomePage; 