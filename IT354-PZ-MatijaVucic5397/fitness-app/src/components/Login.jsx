import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
      if (response.data.length > 0) {
        const user = response.data[0];
        login(user);
        alert('Uspešno ste prijavljeni!');
        navigate(user.role === 'client' ? '/client-dashboard' : '/trainer-dashboard');
      } else {
        alert('Pogrešni podaci za prijavljivanje.');
      }
    } catch (error) {
      console.error('Greška pri prijavljivanju:', error);
      alert('Greška pri prijavljivanju.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Prijava</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Prijavi se
        </button>
        <p className="text-center">
          Nemaš nalog? <Link to="/register" className="text-blue-500 hover:underline">Registruj se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;