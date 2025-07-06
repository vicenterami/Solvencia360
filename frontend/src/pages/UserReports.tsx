import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserReports.css';
import BackButton from '../components/BackButton';

interface Reporte {
  total_ingresos: number;
  total_egresos: number;
  saldo: number;
}

const UserReports: React.FC = () => {
  const [reportes, setReportes] = useState<Reporte | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const obtenerReportes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reportes/usuario', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReportes(res.data);
      } catch (error) {
        console.error('Error obteniendo reportes:', error);
        setReportes(null);
      }
    };

    obtenerReportes();
  }, [token]);

  return (
    <div className="userreports-container">
      <BackButton />
      <h2>Mis Reportes Financieros</h2>
      
      {reportes ? (
        <div className="reporte-detalle">
          <div className="reporte-item">
            <span className="reporte-label">Ingresos totales:</span>
            <span className="reporte-valor">${reportes.total_ingresos.toFixed(2)}</span>
          </div>
          <div className="reporte-item">
            <span className="reporte-label">Egresos totales:</span>
            <span className="reporte-valor">${reportes.total_egresos.toFixed(2)}</span>
          </div>
          <div className="reporte-item saldo">
            <span className="reporte-label">Saldo actual:</span>
            <span className="reporte-valor">${reportes.saldo.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <p>Cargando reportes financieros...</p>
      )}
    </div>
  );
};

export default UserReports;
