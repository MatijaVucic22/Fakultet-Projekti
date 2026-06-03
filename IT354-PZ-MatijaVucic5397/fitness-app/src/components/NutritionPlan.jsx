import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const NutritionPlan = () => {
  const { user } = useContext(AuthContext)
  const [plans, setPlans] = useState([])
  const [newPlan, setNewPlan] = useState({ name: '', description: '', calories: '', clientId: '' })

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:3001/nutritionPlans')
        setPlans(response.data.filter(p => p.trainerId === user.id))
      } catch (error) {
        console.error('Greška pri dohvatanju planova:', error)
      }
    }
    fetchPlans()
  }, [user.id])

  const handleAddPlan = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3001/nutritionPlans', {
        ...newPlan,
        trainerId: user.id
      })
      setNewPlan({ name: '', description: '', calories: '', clientId: '' })
      fetchPlans()
    } catch (error) {
      console.error('Greška pri dodavanju plana:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Planovi Ishrane</h2>
      {user.role === 'trainer' && (
        <form onSubmit={handleAddPlan} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Naziv"
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Opis"
            value={newPlan.description}
            onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Kalorije"
            value={newPlan.calories}
            onChange={(e) => setNewPlan({ ...newPlan, calories: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Client ID"
            value={newPlan.clientId}
            onChange={(e) => setNewPlan({ ...newPlan, clientId: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Dodaj plan
          </button>
        </form>
      )}
      <ul className="space-y-2">
        {plans.map(plan => (
          <li key={plan.id} className="p-4 bg-gray-100 rounded">
            <p><strong>Naziv:</strong> {plan.name}</p>
            <p><strong>Opis:</strong> {plan.description}</p>
            <p><strong>Kalorije:</strong> {plan.calories}</p>
            <p><strong>Klijent:</strong> {plan.clientId}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NutritionPlan