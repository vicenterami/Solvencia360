// src/pages/AdminTransactions.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminTransactions.css'; // Asegúrate de tener un archivo CSS para estilos
import BackButton from '../components/BackButton'; // Componente para volver atrás

const AdminTransactions: React.FC = () => {
  const [transacciones, setTransacciones] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const presupuestoIds = [1, 2, 3]; // puedes mejorar esto consultando /presupuestos
        const all: any[] = [];
        for (const id of presupuestoIds) {
          const res = await axios.get(`http://localhost:5000/api/transacciones/presupuesto/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          all.push(...res.data);
        }
        setTransacciones(all);
      } catch (error) {
        console.error('Error al obtener transacciones:', error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <BackButton />
      <h2>Transacciones</h2>
      <ul>
        {transacciones.map((t) => (
          <li key={t.id}>{t.tipo}: {t.descripcion} (${t.monto})</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTransactions;