import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
  const [training, setTraining] = React.useState(null);
  const [nutritionPlan, setNutritionPlan] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const [trainingsResponse, nutritionResponse] = await Promise.all([
          axios.get(`http://localhost:3001/trainings?clientId=${user.id}`),
          axios.get(`http://localhost:3001/nutritionPlans?clientId=${user.id}`)
        ]);
        setTraining(trainingsResponse.data[0] || null);
        setNutritionPlan(nutritionResponse.data[0] || null);
      } catch (error) {
        console.error('Greška pri dohvatanju podataka:', error);
      }
    };
    fetchData();
  }, [user?.id]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Moj Dashboard</h2>
      {training && (
        <div className="mb-6 p-4 bg-gray-100 rounded">
          <h3 className="text-xl font-bold mb-2">Moj plan treninga</h3>
          <p><strong>Tip:</strong> {training.frequency}</p>
          <h4 className="text-lg font-bold mt-2">Dani:</h4>
          <ul className="list-disc pl-5">
            {training.days.map((day, index) => (
              <li key={index}>{day || `Dan ${index + 1}`}</li>
            ))}
          </ul>
        </div>
      )}
      {nutritionPlan && (
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="text-xl font-bold mb-2">Moj plan ishrane</h3>
          <p><strong>Tip:</strong> {nutritionPlan.calories}</p>
          <h4 className="text-lg font-bold mt-2">Obroci:</h4>
          <ul className="list-disc pl-5">
            {nutritionPlan.meals.map((meal, index) => (
              <li key={index}>{meal || `Obrok ${index + 1}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;