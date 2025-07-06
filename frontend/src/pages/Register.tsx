// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Enviar datos al backend
      const response = await axios.post('http://localhost:5000/api/usuarios/', {
        nombre: name,
        email: email,
        password: password,
        rol: "usuario", // <--- lo agregamos
      });

      console.log('✅ Usuario creado:', response.data);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');

      // Redirigir al login
      navigate('/');
    } catch (error: any) {
      console.error('❌ Error al registrar usuario:', error);
      alert('Error al registrar. Verifica los datos o si el email ya está registrado.');
    }
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
