// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Nombre:', name);
    console.log('Email:', email);
    console.log('Contraseña:', password);

    // Aquí normalmente enviarías los datos a la API para crear la cuenta

    // Por ahora, redirigimos al login
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <button type="submit" className="login-button">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
