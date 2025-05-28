import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Configuracion = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idioma, setIdioma] = useState('Español');
  const [notificaciones, setNotificaciones] = useState(true);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulación de cambio de contraseña
    alert('Contraseña actualizada correctamente');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Configuración</h1>

      <div className="space-y-8">
        {/* Sección de Cuenta */}
        <section className="card">
          <h2 className="text-xl font-bold mb-6">Cuenta</h2>
          <form onSubmit={handleChangePassword}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <label className="form-label">Cambiar contraseña</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-input max-w-md"
                  placeholder="********" 
                />
              </div>
              <button type="submit" className="btn btn-secondary">Actualizar</button>
            </div>
          </form>
        </section>

        {/* Sección de Preferencias */}
        <section className="card">
          <h2 className="text-xl font-bold mb-6">Preferencias</h2>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="form-label">Idioma</label>
              <div className="text-sm text-gray-500">{idioma}</div>
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => setIdioma('Español')}
            >
              Cambiar
            </button>
          </div>

          {/* Notificaciones */}
          <div className="flex items-center justify-between mt-6">
            <div>
              <label className="form-label">Notificaciones</label>
              <div className="text-sm text-gray-500">
                {notificaciones ? 'Notificaciones activadas' : 'Notificaciones desactivadas'}
              </div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificaciones}
                onChange={() => setNotificaciones(!notificaciones)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </section>

        {/* Sección de Ayuda */}
        <section className="card">
          <h2 className="text-xl font-bold mb-6">Ayuda</h2>
          
          <div className="flex items-center justify-between py-3 border-b">
            <div>Centro de ayuda</div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b">
            <div>Contáctanos</div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b">
            <div>Política de privacidad</div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>Términos de servicio</div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </section>
        
        {/* Botón de Cerrar Sesión */}
        <div className="mt-8">
          <button 
            className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;