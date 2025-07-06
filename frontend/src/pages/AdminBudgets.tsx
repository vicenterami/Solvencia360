// src/pages/AdminBudgets.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminBudgets.css'; // Asegúrate de tener un archivo CSS para estilos
import BackButton from '../components/BackButton'; // Componente para volver atrás

const AdminBudgets: React.FC = () => {
  const [presupuestos, setPresupuestos] = useState<any[]>([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/usuarios/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allPresupuestos: any[] = [];
        for (const user of response.data) {
          const res = await axios.get(`http://localhost:5000/api/presupuestos/usuario/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          allPresupuestos.push(...res.data);
        }
        setPresupuestos(allPresupuestos);
      } catch (error) {
        console.error('Error al obtener presupuestos:', error);
      }
    };
    fetchBudgets();
  }, []);

  return (
    <div>
      <BackButton />
      <h2>Presupuestos</h2>
      <ul>
        {presupuestos.map((p) => (
          <li key={p.id}>{p.nombre} - {p.descripcion}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBudgets;