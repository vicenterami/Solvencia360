import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('Cargando...')
  const [presupuestos, setPresupuestos] = useState<string[]>([])

  useEffect(() => {
    // Primero login
    axios.post('http://localhost:5000/api/auth/login', {
      email: 'vicente@empresa.com',
      password: 'hash3'
    }).then(res => {
      const token = res.data.token
      setMessage('Login OK ✅')
      localStorage.setItem('token', token)

      // Luego consultar presupuestos del usuario 3 (Vicente)
      return axios.get('http://localhost:5000/api/presupuestos/usuario/3', {
        headers: { Authorization: `Bearer ${token}` }
      })
    }).then(res => {
      setPresupuestos(res.data.map((p: any) => p.nombre))
    }).catch(err => {
      console.error(err)
      setMessage('Login o consulta fallida ❌')
    })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Solvencia360</h1>
      <p>{message}</p>
      {presupuestos.length > 0 && (
        <div>
          <h2>Presupuestos de Vicente:</h2>
          <ul>
            {presupuestos.map((nombre, i) => <li key={i}>{nombre}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
