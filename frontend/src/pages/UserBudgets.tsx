import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserBudgets.css';
import BackButton from '../components/BackButton';

const UserBudgets: React.FC = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const token = localStorage.getItem('token');
  const [userId, setUserId] = useState<number | null>(null);

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
      axios.get(`http://localhost:5000/api/presupuestos/usuario/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => setPresupuestos(res.data));
    }
  }, [userId]);

  return (
    <div className="userbudgets-container">
      <BackButton />
      <h2>Mis Presupuestos</h2>
      <ul>
        {presupuestos.map((p: any) => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> — {p.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBudgets;
