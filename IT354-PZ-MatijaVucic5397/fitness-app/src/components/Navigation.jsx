import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Resetuje user stanje i localStorage
    navigate('/'); // Preusmerava na home page
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fitness App</h1>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/client-dashboard" className="text-white hover:underline">{user.name}</Link>
              {user.role === 'client' && (
                <>
                  <Link to="/training" className="text-white hover:underline">Treninzi</Link>
                  <Link to="/nutrition" className="text-white hover:underline">Ishrana</Link>
                </>
              )}
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Odjavi se
              </button>
            </>
          ) : (
            <div>
              <Link to="/login" className="bg-green-500 px-4 py-2 rounded mr-2">
                Prijavi se
              </Link>
              <Link to="/register" className="bg-blue-500 px-4 py-2 rounded">
                Registruj se
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;