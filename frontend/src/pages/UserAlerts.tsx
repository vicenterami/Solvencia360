import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserAlerts.css';
import BackButton from '../components/BackButton';

interface Alerta {
  id: number;
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
  tipo: 'advertencia' | 'importante' | 'informativa';
}

const UserAlerts: React.FC = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const token = localStorage.getItem('token');

  // Un solo useEffect para traer las alertas del usuario autenticado
  useEffect(() => {
    const obtenerAlertas = async () => {
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/alerts/usuario', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlertas(res.data);
      } catch (error) {
        console.error('Error obteniendo alertas:', error);
      }
    };

    obtenerAlertas();
  }, [token]);  // incluimos token en deps para silenciar ESLint

  // Patch para marcar como leída
  const marcarComoLeida = async (id: number) => {
    if (!token) return;

    try {
      await axios.patch(
        `http://localhost:5000/api/alerts/${id}/marcar-leida`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlertas(prev =>
        prev.map(a => (a.id === id ? { ...a, leida: true } : a))
      );
    } catch (error) {
      console.error('Error marcando alerta como leída:', error);
    }
  };

  return (
    <div className="useralerts-container">
      <BackButton />
      <h2>Mis Alertas y Notificaciones</h2>

      {alertas.length === 0 ? (
        <p>No tienes alertas pendientes</p>
      ) : (
        <div className="alertas-grid">
          {alertas.map((alerta) => (
            <div
              key={alerta.id}
              className={`alerta-card ${alerta.tipo} ${alerta.leida ? 'leida' : ''}`}
            >
              <div className="alerta-header">
                <h3>{alerta.titulo}</h3>
                <span className="alerta-fecha">
                  {new Date(alerta.fecha).toLocaleDateString()}
                </span>
              </div>
              <p className="alerta-mensaje">{alerta.mensaje}</p>
              {!alerta.leida && (
                <button
                  className="marcar-leida-btn"
                  onClick={() => marcarComoLeida(alerta.id)}
                >
                  Marcar como leída
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAlerts;
