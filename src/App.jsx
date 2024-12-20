import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute'; // Import de la route privée

/**
 * @description Composant principal pour définir les routes de l'application
 */
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-offwhite text-dark font-classic">
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes protégées par rôle */}
          <Route element={<PrivateRoute allowedRoles={['admin', 'gestionnaire']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Route>

          {/* Route par défaut (404) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
