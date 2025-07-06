// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/user-home"
          element={
            <ProtectedRoute allowedRoles={['usuario']}>
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-home"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
