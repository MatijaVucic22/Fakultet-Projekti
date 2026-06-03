import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const TrainerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [clients, setClients] = React.useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [trainingPlan, setTrainingPlan] = useState({ frequency: '', days: ['pon', 'uto', 'sre', 'čet', 'pet', 'sub', 'ned'] });
  const [nutritionPlan, setNutritionPlan] = useState({ calories: '', meals: ['', '', ''] });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users?role=client');
        setClients(response.data);
      } catch (error) {
        console.error('Greška pri dohvatanju klijenata:', error);
      }
    };
    fetchClients();
  }, []);

  const handleSavePlans = async (e) => {
    e.preventDefault();
    if (!selectedClientId) {
      alert('Izaberite klijenta!');
      return;
    }

    try {
      const existingTrainings = await axios.get(`http://localhost:3001/trainings?clientId=${selectedClientId}`);
      if (existingTrainings.data.length > 0) {
        await axios.put(`http://localhost:3001/trainings/${existingTrainings.data[0].id}`, {
          clientId: selectedClientId,
          trainerId: user.id,
          ...trainingPlan,
          days: trainingPlan.days.map(day => day.trim()).filter(day => day)
        });
      } else {
        await axios.post('http://localhost:3001/trainings', {
          clientId: selectedClientId,
          trainerId: user.id,
          ...trainingPlan,
          days: trainingPlan.days.map(day => day.trim()).filter(day => day)
        });
      }

      const existingNutritionPlans = await axios.get(`http://localhost:3001/nutritionPlans?clientId=${selectedClientId}`);
      if (existingNutritionPlans.data.length > 0) {
        await axios.put(`http://localhost:3001/nutritionPlans/${existingNutritionPlans.data[0].id}`, {
          clientId: selectedClientId,
          trainerId: user.id,
          ...nutritionPlan,
          meals: nutritionPlan.meals.filter(meal => meal.trim())
        });
      } else {
        await axios.post('http://localhost:3001/nutritionPlans', {
          clientId: selectedClientId,
          trainerId: user.id,
          ...nutritionPlan,
          meals: nutritionPlan.meals.filter(meal => meal.trim())
        });
      }

      setTrainingPlan({ frequency: '', days: ['pon', 'uto', 'sre', 'čet', 'pet', 'sub', 'ned'] });
      setNutritionPlan({ calories: '', meals: ['', '', ''] });
      alert('Planovi uspešno sačuvani!');
    } catch (error) {
      console.error('Greška pri sačuvavanju planova:', error);
      alert('Greška pri sačuvavanju planova.');
    }
  };

  const handleDayChange = (index, value) => {
    const newDays = [...trainingPlan.days];
    newDays[index] = value;
    setTrainingPlan({ ...trainingPlan, days: newDays });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Klijenti</h2>
      <ul className="space-y-2 mb-6">
        {clients.map(client => (
          <li key={client.id} className="p-4 bg-gray-100 rounded">
            <p><strong>Ime:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <button
              onClick={() => setSelectedClientId(client.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Izaberi
            </button>
          </li>
        ))}
      </ul>
      {selectedClientId && (
        <div className="space-y-6">
          <h4 className="text-lg font-bold">Trening:</h4>
          <form onSubmit={handleSavePlans} className="space-y-4">
            <select
              value={trainingPlan.frequency}
              onChange={(e) => setTrainingPlan({ ...trainingPlan, frequency: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Izaberi frekvenciju treninga</option>
              <option value="3xNedeljno">3x nedeljno</option>
              <option value="4xNedeljno">4x nedeljno</option>
              <option value="5xNedeljno">5x nedeljno</option>
            </select>
            <h4 className="text-lg font-bold">Dani:</h4>
            {trainingPlan.days.map((day, index) => (
              <input
                key={index}
                type="text"
                value={day}
                onChange={(e) => handleDayChange(index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
            ))}
            <h4 className="text-lg font-bold">Ishrana:</h4>
            <select
              value={nutritionPlan.calories}
              onChange={(e) => setNutritionPlan({ ...nutritionPlan, calories: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Izaberi kalorije</option>
              <option value="2000kcal">2000 kcal</option>
              <option value="2500kcal">2500 kcal</option>
              <option value="3000kcal">3000 kcal</option>
            </select>
            <h4 className="text-lg font-bold">Obroci:</h4>
            {nutritionPlan.meals.map((meal, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Obrok ${index + 1}`}
                value={meal}
                onChange={(e) => {
                  const newMeals = [...nutritionPlan.meals];
                  newMeals[index] = e.target.value;
                  setNutritionPlan({ ...nutritionPlan, meals: newMeals });
                }}
                className="w-full p-2 border rounded"
              />
            ))}
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
              Sačuvaj planove
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;