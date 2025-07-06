// src/pages/AdminHome.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';

const AdminHome: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="adminhome-container">
      <header className="adminhome-header">
        <h1>Panel de Administración</h1>
        <p>Control sobre el sistema Solvencia360</p>
        <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
      </header>

      <section className="adminhome-cards">
        <div className="card">
          <h2>👥 Usuarios</h2>
          <p>Administra cuentas, roles y accesos.</p>
          <button onClick={() => navigate('/admin-users')}>Gestionar usuarios</button>
        </div>

        <div className="card">
          <h2>📋 Presupuestos</h2>
          <p>Supervisa todos los presupuestos creados.</p>
          <button onClick={() => navigate('/admin-budgets')}>Ver presupuestos</button>
        </div>

        <div className="card">
          <h2>💰 Transacciones</h2>
          <p>Consulta ingresos y egresos registrados.</p>
          <button onClick={() => navigate('/admin-transactions')}>Ver transacciones</button>
        </div>

        <div className="card">
          <h2>📊 Reportes</h2>
          <p>Accede a reportes generales del sistema.</p>
          <button onClick={() => navigate('/admin-reports')}>Ver reportes</button>
        </div>

        <div className="card">
          <h2>⚠️ Alertas</h2>
          <p>Revisa alertas críticas o eventos pendientes.</p>
          <button onClick={() => navigate('/admin-alerts')}>Ver alertas</button>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
