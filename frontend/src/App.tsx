import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('Cargando...')

  useEffect(() => {
    axios.get('http://localhost:5000/api/ping') // ajusta si tu backend usa otro puerto
      .then(res => {
        setMessage(res.data.message)
      })
      .catch(err => {
        console.error(err)
        setMessage('Error al conectar con el backend 😢')
      })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Solvencia360</h1>
      <p>{message}</p>
    </div>
  )
}

export default App
