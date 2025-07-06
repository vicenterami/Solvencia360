// src/pages/AdminAlerts.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminAlerts.css'; // Asegúrate de tener un archivo CSS para estilos
import BackButton from '../components/BackButton';

const AdminAlerts: React.FC = () => {
  const [alertas, setAlertas] = useState<any[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/alerts/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertas(res.data);
      } catch (error) {
        console.error('Error al obtener alertas:', error);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div>
      <BackButton />
      <h2>Alertas</h2>
      <ul>
        {alertas.map((a) => (
          <li key={a.id}>{a.mensaje} - Nivel: {a.nivel}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAlerts;
