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
            path="/test-private-admin"
            element={
            <PrivateRoute allowedRoles={['admin']}>
            <DashboardAdmin />
            </PrivateRoute>
            }
            />

          <Route path="/test-dashboard-pelerin" element={<DashboardPelerin />} />
          <Route path="/test-dashboard-gestionnaire" element={<DashboardGestionnaire />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
