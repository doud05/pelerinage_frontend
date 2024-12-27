import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import DashboardPelerin from './pages/DashboardPelerin';
import DashboardGestionnaire from './pages/DashboardGestionnaire';
import DashboardAdmin from './pages/DashboardAdmin';
import AnnuaireAdmin from './pages/AnnuaireAdmin';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  console.log('Routes chargées dans App.jsx.');

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/dashboard" element={<Outlet />}>
            <Route path="admin" element={<DashboardAdmin />} />
            <Route path="gestionnaire" element={<DashboardGestionnaire />} />
            <Route path="pelerin" element={<DashboardPelerin />} />
          </Route>
          <Route path="/annuaire" element={<AnnuaireAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
