import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import DashboardPelerin from './pages/DashboardPelerin';
import DashboardGestionnaire from './pages/DashboardGestionnaire';
import DashboardAdmin from './pages/DashboardAdmin';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route
          path="/dashboard/pelerin"
          element={
            <PrivateRoute allowedRoles={['pelerin']}>
              <DashboardPelerin />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/gestionnaire"
          element={
            <PrivateRoute allowedRoles={['gestionnaire']}>
              <DashboardGestionnaire />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
