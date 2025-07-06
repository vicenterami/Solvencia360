import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserTransactions.css';
import BackButton from '../components/BackButton';

interface Transaccion {
  id: number;
  presupuesto_id: number;
  descripcion: string;
  monto: number;
  tipo: 'ingreso' | 'gasto';
  fecha: string;
}

const UserTransactions: React.FC = () => {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(res.data.id);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/transacciones/usuario/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTransacciones(res.data));
    }
  }, [userId]);

  return (
    <div className="usertransactions-container">
      <BackButton />
      <h2>Mis Transacciones</h2>
      <div className="transactions-grid">
        {transacciones.map((t) => (
          <div key={t.id} className="transaction-card">
            <h3>{t.descripcion}</h3>
            <p>Monto: ${t.monto}</p>
            <p>Tipo: {t.tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}</p>
            <p>Fecha: {new Date(t.fecha).toLocaleDateString()}</p>
            <p>ID Presupuesto: {t.presupuesto_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTransactions;
