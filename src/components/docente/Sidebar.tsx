import { Link, useLocation } from 'react-router-dom';
import { Home, ListChecks, Clock, User, HelpCircle, LogOut } from 'lucide-react';
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
        <h2 className="text-xl font-bold">Asignaciones Académicas</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link 
          to="/docente" 
          className={clsx(
            "sidebar-link",
            isActive('/docente') && location.pathname === '/docente' && "active"
          )}
        >
          <Home size={20} />
          <span>Inicio</span>
        </Link>

        <Link 
          to="/docente/preferencias" 
          className={clsx(
            "sidebar-link",
            isActive('/docente/preferencias') && "active"
          )}
        >
          <ListChecks size={20} />
          <span>Preferencias</span>
        </Link>

        <Link 
          to="/docente/horarios" 
          className={clsx(
            "sidebar-link",
            isActive('/docente/horarios') && "active"
          )}
        >
          <Clock size={20} />
          <span>Horarios</span>
        </Link>

        <Link 
          to="/docente/perfil" 
          className={clsx(
            "sidebar-link",
            isActive('/docente/perfil') && "active"
          )}
        >
          <User size={20} />
          <span>Perfil</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link 
          to="/ayuda" 
          className="sidebar-link mb-4"
        >
          <HelpCircle size={20} />
          <span>Ayuda</span>
        </Link>

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