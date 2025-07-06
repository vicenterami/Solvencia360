import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminUsers.css';
import BackButton from '../components/BackButton';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

const AdminUsers: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevoPassword, setNuevoPassword] = useState('');
  const [nuevoRol, setNuevoRol] = useState<'admin' | 'usuario'>('usuario');

  const token = localStorage.getItem('token');

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/usuarios/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const crearUsuario = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/usuarios/', {
        nombre: nuevoNombre,
        email: nuevoEmail,
        password: nuevoPassword,
        rol: nuevoRol,
      });
      console.log('✅ Usuario creado:', res.data);
      setNuevoNombre('');
      setNuevoEmail('');
      setNuevoPassword('');
      setNuevoRol('usuario');
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const eliminarUsuario = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const actualizarUsuario = async (usuario: Usuario) => {
    try {
      await axios.put(`http://localhost:5000/api/usuarios/${usuario.id}`, usuario, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('✅ Usuario actualizado');
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };


  return (
    <div className="adminusers-container">
      <BackButton />
      <h2>Gestión de Usuarios</h2>

      <div className="form-crear-usuario">
        <h3>Crear nuevo usuario</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={nuevoEmail}
          onChange={(e) => setNuevoEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={nuevoPassword}
          onChange={(e) => setNuevoPassword(e.target.value)}
        />
        <select value={nuevoRol} onChange={(e) => setNuevoRol(e.target.value as 'admin' | 'usuario')}>
          <option value="usuario">Usuario</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={crearUsuario}>Crear</button>
      </div>

      <div className="usuarios-lista">
        <h2>Lista de Usuarios</h2>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>
                <input
                  type="text"
                  value={u.nombre}
                  onChange={(e) =>
                    setUsuarios((prev) =>
                      prev.map((x) => (x.id === u.id ? { ...x, nombre: e.target.value } : x))
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="email"
                  value={u.email}
                  onChange={(e) =>
                    setUsuarios((prev) =>
                      prev.map((x) => (x.id === u.id ? { ...x, email: e.target.value } : x))
                    )
                  }
                />
              </td>
              <td>
                <select
                  value={u.rol}
                  onChange={(e) =>
                    setUsuarios((prev) =>
                      prev.map((x) => (x.id === u.id ? { ...x, rol: e.target.value } : x))
                    )
                  }
                >
                  <option value="usuario">Usuario</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button className="actualizar-btn" onClick={() => actualizarUsuario(u)}>
                  Actualizar
                </button>
                <button className="eliminar-btn" onClick={() => eliminarUsuario(u.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
