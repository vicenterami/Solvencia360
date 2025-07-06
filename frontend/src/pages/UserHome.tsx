// src/pages/UserHome.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserHome.css';

const UserHome: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="userhome-container">
      <header className="userhome-header">
        <h1>Panel del Usuario</h1>
        <p>Bienvenido a Solvencia360</p>
        <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
      </header>

      <section className="userhome-cards">
        <div className="card">
          <h2>📋 Presupuestos</h2>
          <p>Visualiza tus presupuestos activos.</p>
          <button onClick={() => navigate('/user-budgets')}>Ver presupuestos</button>
        </div>

        <div className="card">
          <h2>💸 Transacciones</h2>
          <p>Registra ingresos o egresos.</p>
          <button onClick={() => navigate('/user-transactions')}>Ver transacciones</button>
        </div>

        <div className="card">
          <h2>📈 Reportes</h2>
          <p>Accede a gráficos y reportes.</p>
          <button onClick={() => navigate('/user-reports')}>Ver reportes</button>
        </div>

        <div className="card">
          <h2>🔔 Alertas</h2>
          <p>Revisa notificaciones importantes.</p>
          <button onClick={() => navigate('/user-alerts')}>Ver alertas</button>
        </div>
      </section>
    </div>
  );
};

export default UserHome;
