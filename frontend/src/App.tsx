import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('Cargando...')
  const [presupuestos, setPresupuestos] = useState<any[]>([])
  const [transacciones, setTransacciones] = useState<any[]>([])
  const [alertas, setAlertas] = useState<any[]>([])
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    const runFullTest = async () => {
      try {
        // 1. Login
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
          email: 'vicente@empresa.com',
          password: 'hash3'
        })
        const token = loginRes.data.token
        localStorage.setItem('token', token)
        setMessage('🔐 Login OK')
        addTestResult('✅ Login exitoso')

        // 2. Test CRUD Presupuestos
        await testPresupuestos(token)

        // 3. Test CRUD Transacciones  
        await testTransacciones(token)

        // 4. Test CRUD Alertas
        await testAlertas(token)

        setMessage(prev => prev + ' | 🎉 Tests completados')

      } catch (err) {
        console.error(err)
        setMessage('❌ Error en tests')
        addTestResult('❌ Error general en tests')
      }
    }
    runFullTest()
  }, [])

  // Helper para agregar resultados de test
  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, result])
  }

  // Test completo de Presupuestos CRUD
  const testPresupuestos = async (token: string) => {
    try {
      // GET: Listar presupuestos
      const listRes = await axios.get(
        'http://localhost:5000/api/presupuestos/usuario/3',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setPresupuestos(listRes.data)
      addTestResult(`✅ Presupuestos listados (${listRes.data.length} encontrados)`)

      // POST: Crear presupuesto de prueba
      const createRes = await axios.post(
        'http://localhost:5000/api/presupuestos/',
        {
          nombre: 'Test Presupuesto - Frontend',
          descripcion: 'Presupuesto creado desde test automático',
          fecha_inicio: '2025-06-01',
          fecha_fin: '2025-12-31',
          usuario_id: 3
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const nuevoPresupuestoId = createRes.data.id
      addTestResult(`✅ Presupuesto creado (ID: ${nuevoPresupuestoId})`)

      // PUT: Actualizar presupuesto
      await axios.put(
        `http://localhost:5000/api/presupuestos/${nuevoPresupuestoId}`,
        { nombre: 'Test Presupuesto - ACTUALIZADO' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      addTestResult(`✅ Presupuesto ${nuevoPresupuestoId} actualizado`)

      // DELETE: Eliminar presupuesto de prueba
      await axios.delete(
        `http://localhost:5000/api/presupuestos/${nuevoPresupuestoId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      addTestResult(`✅ Presupuesto ${nuevoPresupuestoId} eliminado`)

    } catch (err) {
      console.error('Error en test presupuestos:', err)
      addTestResult('❌ Error en test de presupuestos')
    }
  }

  // Test completo de Transacciones CRUD
  const testTransacciones = async (token: string) => {
    try {
      // GET: Listar transacciones
      const listRes = await axios.get(
        'http://localhost:5000/api/transacciones/presupuesto/3',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTransacciones(listRes.data)
      addTestResult(`✅ Transacciones listadas (${listRes.data.length} encontradas)`)

      // POST: Crear transacción de prueba
      const createRes = await axios.post(
        'http://localhost:5000/api/transacciones/',
        {
          tipo: 'ingreso',
          monto: 1500,
          descripcion: 'Test Transacción - Frontend Auto',
          fecha: '2025-06-27',
          presupuesto_id: 3
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const nuevaTransaccionId = createRes.data.id
      addTestResult(`✅ Transacción creada (ID: ${nuevaTransaccionId})`)

      // PUT: Actualizar transacción
      await axios.put(
        `http://localhost:5000/api/transacciones/${nuevaTransaccionId}`,
        { 
          descripcion: 'Test Transacción - ACTUALIZADA',
          monto: 2000
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      addTestResult(`✅ Transacción ${nuevaTransaccionId} actualizada`)

      // Recargar lista para ver cambios
      const updatedRes = await axios.get(
        'http://localhost:5000/api/transacciones/presupuesto/3',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTransacciones(updatedRes.data)

      // DELETE: Eliminar transacción de prueba
      await axios.delete(
        `http://localhost:5000/api/transacciones/${nuevaTransaccionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      addTestResult(`✅ Transacción ${nuevaTransaccionId} eliminada`)

      // Recargar lista final
      const finalRes = await axios.get(
        'http://localhost:5000/api/transacciones/presupuesto/3',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTransacciones(finalRes.data)

    } catch (err) {
      console.error('Error en test transacciones:', err)
      addTestResult('❌ Error en test de transacciones')
    }
  }

  // Test completo de Alertas CRUD
  const testAlertas = async (token: string) => {
    try {
      // GET: Listar todas las alertas
      const listRes = await axios.get(
        'http://localhost:5000/api/alerts/',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAlertas(listRes.data)
      addTestResult(`✅ Alertas listadas (${listRes.data.length} encontradas)`)

      // POST: Crear alerta de prueba
      const createRes = await axios.post(
        'http://localhost:5000/api/alerts/',
        {
          mensaje: 'Alerta de prueba desde Frontend - Presupuesto al 85%',
          nivel: 'warning',
          presupuesto_id: 3
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const nuevaAlertaId = createRes.data.id
      addTestResult(`✅ Alerta creada (ID: ${nuevaAlertaId})`)

      // GET: Detalle de la alerta específica
      const detailRes = await axios.get(
        `http://localhost:5000/api/alerts/${nuevaAlertaId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      console.log('Detalle de alerta:', detailRes.data)
      addTestResult(`✅ Detalle de alerta ${nuevaAlertaId} obtenido`)

      // POST: Crear otra alerta con nivel diferente
      const createRes2 = await axios.post(
        'http://localhost:5000/api/alerts/',
        {
          mensaje: 'Alerta crítica - Límite de presupuesto excedido',
          nivel: 'error',
          presupuesto_id: 3
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const alerta2Id = createRes2.data.id
      addTestResult(`✅ Segunda alerta creada (ID: ${alerta2Id})`)

      // PUT: Actualizar primera alerta
      await axios.put(
        `http://localhost:5000/api/alerts/${nuevaAlertaId}`,
        { 
          mensaje: 'Alerta ACTUALIZADA - Presupuesto controlado',
          nivel: 'info'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      addTestResult(`✅ Alerta ${nuevaAlertaId} actualizada`)

      // GET: Recargar lista de alertas
      const updatedListRes = await axios.get(
        'http://localhost:5000/api/alerts/',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAlertas(updatedListRes.data)
      addTestResult(`✅ Lista de alertas actualizada (${updatedListRes.data.length} total)`)

      // DELETE: Eliminar alertas de prueba
      await axios.delete(
        `http://localhost:5000/api/alerts/${nuevaAlertaId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      addTestResult(`✅ Alerta ${nuevaAlertaId} eliminada`)

      await axios.delete(
        `http://localhost:5000/api/alerts/${alerta2Id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      addTestResult(`✅ Alerta ${alerta2Id} eliminada`)

      // GET: Lista final de alertas
      const finalListRes = await axios.get(
        'http://localhost:5000/api/alerts/',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAlertas(finalListRes.data)

    } catch (err) {
      console.error('Error en test alertas:', err)
      addTestResult('❌ Error en test de alertas')
    }
  }

  // Función que carga transacciones desde el backend
  const loadTransacciones = async (token: string) => {
    try {
      const resp = await axios.get(
        'http://localhost:5000/api/transacciones/presupuesto/3',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTransacciones(resp.data)
      setMessage(prev => prev + ' | Transacciones ✅')
    } catch (err) {
      console.error(err)
      setMessage('Error cargando transacciones ❌')
    }
  }

  // Función para eliminar transacción y refrescar la lista
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token')
    if (!token) return setMessage('No token disponible ❌')

    try {
      await axios.delete(
        `http://localhost:5000/api/transacciones/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage(`Transacción ${id} eliminada ✅`)
      // Refrescar lista
      await loadTransacciones(token)
    } catch (err) {
      console.error(err)
      setMessage(`Error eliminando transacción ${id} ❌`)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🏦 Solvencia360 - Test Suite Completo</h1>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{message}</p>

      {/* Resultados de Tests */}
      {testResults.length > 0 && (
        <div style={{ marginBottom: '2rem', backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '8px' }}>
          <h2>📋 Resultados de Tests:</h2>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {testResults.map((result, i) => (
              <div key={i} style={{ 
                padding: '0.25rem 0', 
                color: result.includes('❌') ? '#dc2626' : '#059669',
                fontFamily: 'monospace'
              }}>
                {result}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sección Presupuestos */}
      {presupuestos.length > 0 && (
        <div style={{ marginBottom: '2rem', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
          <h2>💰 Presupuestos ({presupuestos.length}):</h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {presupuestos.map((p, i) => (
              <div key={i} style={{ 
                padding: '0.75rem', 
                backgroundColor: '#f9fafb',
                borderRadius: '6px',
                border: '1px solid #e5e7eb'
              }}>
                <strong>{p.nombre}</strong> (ID: {p.id})
                <br />
                <small style={{ color: '#6b7280' }}>
                  {p.descripcion} | {p.fecha_inicio} → {p.fecha_fin}
                </small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sección Transacciones */}
      {transacciones.length > 0 && (
        <div style={{ marginBottom: '2rem', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
          <h2>💳 Transacciones del Presupuesto 3 ({transacciones.length}):</h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {transacciones.map((t) => (
              <div key={t.id} style={{
                padding: '0.75rem',
                backgroundColor: t.tipo === 'ingreso' ? '#ecfdf5' : '#fef2f2',
                borderRadius: '6px',
                border: `1px solid ${t.tipo === 'ingreso' ? '#d1fae5' : '#fecaca'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong>{t.descripcion}</strong><br/>
                  <small style={{ color: '#6b7280' }}>
                    {t.fecha} | ID: {t.id}
                  </small>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    color: t.tipo === 'ingreso' ? '#059669' : '#dc2626',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}>
                    {t.tipo === 'ingreso' ? '+' : '-'}${t.monto}
                  </span><br/>
                  <small style={{
                    color: t.tipo === 'ingreso' ? '#059669' : '#dc2626',
                    textTransform: 'capitalize'
                  }}>
                    {t.tipo}
                  </small>
                  <br/>
                  <button
                    onClick={() => handleDelete(t.id)}
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sección Alertas */}
      {alertas.length > 0 && (
        <div style={{ marginBottom: '2rem', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
          <h2>🚨 Alertas ({alertas.length}):</h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {alertas.map((a) => {
              const getAlertColor = (nivel: string) => {
                switch(nivel) {
                  case 'info': return { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' }
                  case 'warning': return { bg: '#fffbeb', border: '#fed7aa', text: '#d97706' }
                  case 'error': return { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' }
                  case 'critical': return { bg: '#7f1d1d', border: '#991b1b', text: '#ffffff' }
                  default: return { bg: '#f3f4f6', border: '#d1d5db', text: '#374151' }
                }
              }
              const colors = getAlertColor(a.nivel)
              
              return (
                <div key={a.id} style={{
                  padding: '0.75rem',
                  backgroundColor: colors.bg,
                  borderRadius: '6px',
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <strong>{a.mensaje}</strong><br/>
                      <small>
                        Presupuesto ID: {a.presupuesto_id} | Creada: {new Date(a.creada_en).toLocaleString()}
                      </small>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: colors.text,
                      color: colors.bg,
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      marginLeft: '1rem'
                    }}>
                      {a.nivel}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
