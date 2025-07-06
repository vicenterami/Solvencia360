// src/pages/AdminReports.tsx
import React from 'react';
import axios from 'axios';
import './AdminReports.css';
import BackButton from '../components/BackButton';

const AdminReports: React.FC = () => {
  const [resumen, setResumen] = React.useState<any | null>(null);
  const [idPresupuesto, setIdPresupuesto] = React.useState<string>(''); // <-- AQUÍ DEBÍA ESTAR

  const consultar = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/reportes/presupuesto/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumen(res.data);
    } catch (error) {
      console.error('❌ Error al obtener reporte:', error);
      setResumen(null);
    }
  };

  return (
    <div className="adminreports-container">
      <BackButton />
      <h2>Reportes</h2>

      <div className="form-reporte">
        <input
          type="number"
          placeholder="ID del presupuesto"
          value={idPresupuesto}
          onChange={(e) => setIdPresupuesto(e.target.value)}
        />
        <button onClick={() => consultar(Number(idPresupuesto))}>Consultar</button>
      </div>

      {resumen && (
        <div className="reporte-detalle">
          <p><strong>Ingresos:</strong> {resumen.total_ingresos}</p>
          <p><strong>Egresos:</strong> {resumen.total_egresos}</p>
          <p><strong>Saldo:</strong> {resumen.saldo}</p>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
