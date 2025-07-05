// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('usuario');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);

    // Redirigir según el rol
    if (role === 'administrador') {
      navigate('/admin-home');
    } else {
      navigate('/user-home');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>SOLVENCIA360</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Tipo de usuario</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="usuario">Usuario</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>

          {/* Solo mostrar el botón de registrarse si es usuario */}
          {role === 'usuario' && (
            <div style={{ marginTop: '15px' }}>
              <button
                type="button"
                className="register-button"
                onClick={handleRegisterClick}
              >
                ¿No tienes cuenta? Regístrate aquí
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
