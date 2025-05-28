import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';

const Header = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Icono de menú para móvil */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>

          {/* Logo - visible solo en móvil */}
          <div className="md:hidden flex items-center">
            <span className="text-xl font-semibold">Panel de Administración</span>
          </div>

          {/* Navegación de encabezado */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/admin" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Inicio
            </Link>
            <Link to="/admin/asignaturas" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Asignaturas
            </Link>
            <Link to="/admin/docentes" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Docentes
            </Link>
            <Link to="/admin/reportes" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Reportes
            </Link>
          </nav>

          {/* Notificaciones y perfil de usuario */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="sr-only">Ver notificaciones</span>
              <Bell className="h-6 w-6" />
            </button>

            {/* Perfil de usuario */}
            <div className="relative">
              <Link to="/configuracion" className="flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar del usuario" className="h-full w-full object-cover" />
                  ) : (
                    <span className="h-full w-full flex items-center justify-center bg-blue-500 text-white text-sm">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-40 bg-black bg-opacity-25" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 z-50 w-full bg-white overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;