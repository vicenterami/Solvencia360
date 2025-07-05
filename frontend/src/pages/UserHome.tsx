// src/pages/UserHome.tsx
import React from 'react';
import './UserHome.css';

const UserHome: React.FC = () => {
  return (
    <div className="userhome-container">
      <header className="userhome-header">
        <h1>Bienvenido a Solvencia360</h1>
        <p>Tu panel de control financiero</p>
      </header>

      <section className="userhome-cards">
        <div className="card">
          <h2>📋 Presupuestos</h2>
          <p>Visualiza y gestiona tus presupuestos activos por proyecto o departamento.</p>
          <button>Ver presupuestos</button>
        </div>

        <div className="card">
          <h2>💸 Transacciones</h2>
          <p>Registra ingresos o egresos asociados a un presupuesto.</p>
          <button>Registrar transacción</button>
        </div>

        <div className="card">
          <h2>📈 Reportes</h2>
          <p>Accede a gráficos y análisis financieros.</p>
          <button>Ver reportes</button>
        </div>

        <div className="card">
          <h2>🔔 Alertas</h2>
          <p>Revisa notificaciones por excedentes u otros eventos importantes.</p>
          <button>Ver alertas</button>
        </div>
      </section>
    </div>
  );
};

export default UserHome;
