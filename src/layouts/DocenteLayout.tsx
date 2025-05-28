import { Outlet } from 'react-router-dom';
import Sidebar from '../components/docente/Sidebar';
import Header from '../components/docente/Header';

const DocenteLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - visible en escritorio, oculto en móvil */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>
      
      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DocenteLayout;