import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, rol, usuario_id } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);
      localStorage.setItem('usuario_id', usuario_id); // por si necesitas luego

      // Redirigir según el rol
      if (rol === 'admin') {
        navigate('/admin-home');
      } else {
        navigate('/user-home');
      }

    } catch (err: any) {
      console.error(err);
      setError('Correo o contraseña incorrectos');
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

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>

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
