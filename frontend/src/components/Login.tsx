import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string | null>(null);
  const navigate                = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, rol, usuario_id } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);
      localStorage.setItem('usuario_id', String(usuario_id));

      if (rol === 'admin') {
        navigate('/admin-home');
      } else {
        navigate('/user-home');
      }
    } catch (err) {
      console.error(err);
      setError('Correo o contraseña incorrectos');
    }
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
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>

          {/* Mostramos siempre el enlace de registro */}
          <div className="register-link">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="register-button">
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
