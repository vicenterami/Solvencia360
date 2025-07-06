import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ allowedRoles, children }) => {
  const [rol, setRol] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setRol('none');

      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRol(res.data.rol);
      } catch (err) {
        console.error('❌ Error al verificar rol:', err);
        setRol('none');
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, []);

  if (loading) return <div>Cargando...</div>;

  if (!rol || !allowedRoles.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
