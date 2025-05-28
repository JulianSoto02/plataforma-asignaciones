import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, FileText, Bell, LogOut, Table } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import clsx from 'clsx';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Panel de Administración</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link 
          to="/admin" 
          className={clsx(
            "sidebar-link",
            isActive('/admin') && location.pathname === '/admin' && "active"
          )}
        >
          <Home size={20} />
          <span>Inicio</span>
        </Link>

        <Link 
          to="/admin/asignaturas" 
          className={clsx(
            "sidebar-link",
            isActive('/admin/asignaturas') && "active"
          )}
        >
          <BookOpen size={20} />
          <span>Asignaturas</span>
        </Link>

        <Link 
          to="/admin/docentes" 
          className={clsx(
            "sidebar-link",
            isActive('/admin/docentes') && "active"
          )}
        >
          <Users size={20} />
          <span>Docentes</span>
        </Link>

        <Link 
          to="/admin/asignaciones" 
          className={clsx(
            "sidebar-link",
            isActive('/admin/asignaciones') && "active"
          )}
        >
          <Table size={20} />
          <span>Asignaciones</span>
        </Link>

        <Link 
          to="/admin/reportes" 
          className={clsx(
            "sidebar-link",
            isActive('/admin/reportes') && "active"
          )}
        >
          <FileText size={20} />
          <span>Reportes</span>
        </Link>

        <Link 
          to="/admin/notificaciones" 
          className={clsx(
            "sidebar-link",
            isActive('/admin/notificaciones') && "active"
          )}
        >
          <Bell size={20} />
          <span>Notificaciones</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={() => logout()}
          className="w-full sidebar-link text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;