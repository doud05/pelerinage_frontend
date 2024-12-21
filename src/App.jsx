import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/LoginForm';
import Register from './components/Auth/RegisterForm';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute'; // Vérifiez l'implémentation de PrivateRoute

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
