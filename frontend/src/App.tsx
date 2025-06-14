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

  useEffect(() => {
  axios.post('http://localhost:5000/api/auth/login', {
    email: 'vicente@empresa.com',
    password: 'hash3'
  }).then(res => {
    const token = res.data.token
    setMessage('Login OK: ' + token.slice(0, 10) + '...')
    localStorage.setItem('token', token)
  }).catch(() => {
    setMessage('Login fallido')
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
