import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import DashboardPelerin from './pages/DashboardPelerin';
import DashboardGestionnaire from './pages/DashboardGestionnaire';
import DashboardAdmin from './pages/DashboardAdmin';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary'; // Nouveau

const App = () => {
  console.log('Routes chargées dans App.jsx.');

  return (
    <ErrorBoundary>
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
      <div>Composant de test pour admin</div>
    </PrivateRoute>
  }
/>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
