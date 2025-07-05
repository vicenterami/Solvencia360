// src/pages/AdminHome.tsx
import React from 'react';
import './AdminHome.css';

const AdminHome: React.FC = () => {
  return (
    <div className="adminhome-container">
      <header className="adminhome-header">
        <h1>Panel de Administración</h1>
        <p>Control sobre el sistema Solvencia360</p>
      </header>

      <section className="adminhome-cards">
        <div className="card">
          <h2>👥 Usuarios</h2>
          <p>Administra cuentas, roles y accesos.</p>
          <button>Gestionar usuarios</button>
        </div>

        <div className="card">
          <h2>📋 Presupuestos</h2>
          <p>Supervisa todos los presupuestos creados.</p>
          <button>Ver presupuestos</button>
        </div>

        <div className="card">
          <h2>💰 Transacciones</h2>
          <p>Consulta ingresos y egresos registrados.</p>
          <button>Ver transacciones</button>
        </div>

        <div className="card">
          <h2>📊 Reportes</h2>
          <p>Accede a reportes generales del sistema.</p>
          <button>Ver reportes</button>
        </div>

        <div className="card">
          <h2>⚠️ Alertas</h2>
          <p>Revisa alertas críticas o eventos pendientes.</p>
          <button>Ver alertas</button>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
