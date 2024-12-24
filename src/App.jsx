import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'; // Assurez-vous d'importer `Outlet` ici
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
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={['admin', 'gestionnaire', 'pelerin']}>
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route path="admin" element={<DashboardAdmin />} />
            <Route path="gestionnaire" element={<DashboardGestionnaire />} />
            <Route path="pelerin" element={<DashboardPelerin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
