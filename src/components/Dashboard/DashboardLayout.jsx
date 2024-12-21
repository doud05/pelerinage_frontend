import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-offwhite">
      {/* Sidebar */}
      <nav className="w-64 bg-brick text-offwhite p-4">
        <h1 className="text-xl font-bold mb-6">Tableau de bord</h1>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'block py-2 px-4 bg-terra-cotta rounded-lg'
                  : 'block py-2 px-4 hover:bg-terracotta hover:rounded-lg'
              }
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reservations"
              className={({ isActive }) =>
                isActive
                  ? 'block py-2 px-4 bg-terra-cotta rounded-lg'
                  : 'block py-2 px-4 hover:bg-terracotta hover:rounded-lg'
              }
            >
              Mes Réservations
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? 'block py-2 px-4 bg-terra-cotta rounded-lg'
                  : 'block py-2 px-4 hover:bg-terracotta hover:rounded-lg'
              }
            >
              Profil
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
