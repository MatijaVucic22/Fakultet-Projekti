import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const TrainingLog = () => {
  const { user } = useContext(AuthContext)
  const [trainings, setTrainings] = useState([])
  const [newTraining, setNewTraining] = useState({ type: '', duration: '', date: '', clientId: '' })

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trainings')
        setTrainings(response.data.filter(t => t.trainerId === user.id))
      } catch (error) {
        console.error('Greška pri dohvatanju treninga:', error)
      }
    }
    fetchTrainings()
  }, [user.id])

  const handleAddTraining = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3001/trainings', {
        ...newTraining,
        trainerId: user.id
      })
      setNewTraining({ type: '', duration: '', date: '', clientId: '' })
      fetchTrainings()
    } catch (error) {
      console.error('Greška pri dodavanju treninga:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Log Treninga</h2>
      {user.role === 'trainer' && (
        <form onSubmit={handleAddTraining} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Vrsta treninga"
            value={newTraining.type}
            onChange={(e) => setNewTraining({ ...newTraining, type: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Trajanje (min)"
            value={newTraining.duration}
            onChange={(e) => setNewTraining({ ...newTraining, duration: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            value={newTraining.date}
            onChange={(e) => setNewTraining({ ...newTraining, date: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Client ID"
            value={newTraining.clientId}
            onChange={(e) => setNewTraining({ ...newTraining, clientId: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Dodaj trening
          </button>
        </form>
      )}
      <ul className="space-y-2">
        {trainings.map(training => (
          <li key={training.id} className="p-4 bg-gray-100 rounded">
            <p><strong>Vrsta:</strong> {training.type}</p>
            <p><strong>Trajanje:</strong> {training.duration} min</p>
            <p><strong>Datum:</strong> {training.date}</p>
            <p><strong>Klijent:</strong> {training.clientId}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrainingLog