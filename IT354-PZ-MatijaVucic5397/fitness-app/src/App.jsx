import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './components/Home.jsx';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';
import ClientDashboard from './components/ClientDashboard.jsx';
import TrainerDashboard from './components/TrainerDashboard.jsx';
import TrainingPage from './components/TrainingPage.jsx';
import NutritionPage from './components/NutritionPage.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;