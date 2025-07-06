// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AdminUsers from './pages/AdminUsers';
import AdminBudgets from './pages/AdminBudgets';
import AdminTransactions from './pages/AdminTransactions';
import AdminReports from './pages/AdminReports';
import AdminAlerts from './pages/AdminAlerts';
import UserBudgets from './pages/UserBudgets';
import UserTransactions from './pages/UserTransactions';
import UserReports from './pages/UserReports';
import UserAlerts from './pages/UserAlerts';

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
        <Route
          path="/admin-users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-budgets"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminBudgets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-transactions"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-reports"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-alerts"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminAlerts />
            </ProtectedRoute>
          }
        />

          <Route
            path="/user-budgets"
            element={
              <ProtectedRoute allowedRoles={['usuario']}>
                <UserBudgets />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user-transactions"
            element={
              <ProtectedRoute allowedRoles={['usuario']}>
                <UserTransactions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user-reports"
            element={
              <ProtectedRoute allowedRoles={['usuario']}>
                <UserReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-alerts"
            element={
              <ProtectedRoute allowedRoles={['usuario']}>
                <UserAlerts />
              </ProtectedRoute>
            }
          />
      </Routes>
    </Router>
  );
}

export default App;
