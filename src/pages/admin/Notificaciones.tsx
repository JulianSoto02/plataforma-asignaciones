import { useState } from 'react';
import { toast } from 'react-toastify';

// Datos de ejemplo
const notificacionesIniciales = [
  { 
    id: 1, 
    titulo: 'Recordatorio de entrega de preferencias', 
    mensaje: 'Se recuerda a todos los docentes que la fecha límite para registrar sus preferencias de horarios es el próximo viernes.', 
    destinatarios: 'Todos los docentes',
    fecha: '2025-05-20',
    estado: 'Enviada'
  },
  { 
    id: 2, 
    titulo: 'Actualización de asignaciones', 
    mensaje: 'Se han actualizado las asignaciones académicas para el próximo semestre. Por favor revisar en el sistema.', 
    destinatarios: 'Docentes de Ingeniería de Sistemas',
    fecha: '2025-05-18',
    estado: 'Enviada'
  },
  { 
    id: 3, 
    titulo: 'Reunión de coordinación', 
    mensaje: 'Se convoca a reunión de coordinación para discutir las asignaciones del próximo semestre.', 
    destinatarios: 'Coordinadores de departamento',
    fecha: '2025-05-15',
    estado: 'Enviada'
  },
  { 
    id: 4, 
    titulo: 'Cambio de aulas', 
    mensaje: 'Debido a mantenimiento, las clases del edificio A serán reubicadas temporalmente.', 
    destinatarios: 'Docentes con clases en Edificio A',
    fecha: '2025-05-10',
    estado: 'Programada'
  }
];

interface Notificacion {
  id: number;
  titulo: string;
  mensaje: string;
  destinatarios: string;
  fecha: string;
  estado: 'Enviada' | 'Programada' | 'Borrador';
}

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>(notificacionesIniciales);
  const [notificacionActual, setNotificacionActual] = useState<Notificacion | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const abrirModalCrear = () => {
    setNotificacionActual({
      id: 0,
      titulo: '',
      mensaje: '',
      destinatarios: '',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Borrador'
    });
    setModoEdicion(false);
    setModalAbierto(true);
  };

  const abrirModalEditar = (notificacion: Notificacion) => {
    setNotificacionActual({ ...notificacion });
    setModoEdicion(true);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setNotificacionActual(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!notificacionActual) return;
    
    const { name, value } = e.target;
    setNotificacionActual({
      ...notificacionActual,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!notificacionActual) return;
    
    if (modoEdicion) {
      // Actualizar notificación existente
      setNotificaciones(notificaciones.map(n => 
        n.id === notificacionActual.id ? notificacionActual : n
      ));
      toast.success('Notificación actualizada correctamente');
    } else {
      // Crear nueva notificación
      const nuevaNotificacion = {
        ...notificacionActual,
        id: Math.max(0, ...notificaciones.map(n => n.id)) + 1
      };
      setNotificaciones([...notificaciones, nuevaNotificacion]);
      toast.success('Notificación creada correctamente');
    }
    
    cerrarModal();
  };

  const enviarNotificacion = (id: number) => {
    setNotificaciones(notificaciones.map(n => 
      n.id === id ? { ...n, estado: 'Enviada' } : n
    ));
    toast.success('Notificación enviada correctamente');
  };

  const eliminarNotificacion = (id: number) => {
    if (confirm('¿Está seguro de eliminar esta notificación?')) {
      setNotificaciones(notificaciones.filter(n => n.id !== id));
      toast.info('Notificación eliminada');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Notificaciones</h1>
      
      {/* Botón para crear notificación */}
      <div className="mb-6">
        <button 
          onClick={abrirModalCrear}
          className="btn btn-primary"
        >
          Nueva Notificación
        </button>
      </div>
      
      {/* Lista de notificaciones */}
      <div className="space-y-4">
        {notificaciones.map((notificacion) => (
          <div 
            key={notificacion.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{notificacion.titulo}</h3>
                <p className="text-sm text-gray-500">
                  {notificacion.fecha} • 
                  <span className={`ml-2 ${
                    notificacion.estado === 'Enviada' ? 'text-green-600' : 
                    notificacion.estado === 'Programada' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {notificacion.estado}
                  </span>
                </p>
              </div>
              <div className="flex space-x-2">
                {notificacion.estado !== 'Enviada' && (
                  <button 
                    onClick={() => enviarNotificacion(notificacion.id)}
                    className="text-blue-600 hover:text-blue-900 px-2 py-1"
                  >
                    Enviar
                  </button>
                )}
                <button 
                  onClick={() => abrirModalEditar(notificacion)}
                  className="text-gray-600 hover:text-gray-900 px-2 py-1"
                >
                  Editar
                </button>
                <button 
                  onClick={() => eliminarNotificacion(notificacion.id)}
                  className="text-red-600 hover:text-red-900 px-2 py-1"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-4">{notificacion.mensaje}</p>
              <p className="text-sm text-gray-600">
                <strong>Destinatarios:</strong> {notificacion.destinatarios}
              </p>
            </div>
          </div>
        ))}
        
        {notificaciones.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">No hay notificaciones disponibles.</p>
          </div>
        )}
      </div>
      
      {/* Modal para crear/editar notificación */}
      {modalAbierto && notificacionActual && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">
              {modoEdicion ? 'Editar Notificación' : 'Nueva Notificación'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Título</label>
                <input 
                  type="text" 
                  name="titulo"
                  value={notificacionActual.titulo}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Mensaje</label>
                <textarea 
                  name="mensaje"
                  value={notificacionActual.mensaje}
                  onChange={handleInputChange}
                  className="form-input min-h-32"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Destinatarios</label>
                <select 
                  name="destinatarios"
                  value={notificacionActual.destinatarios}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Seleccionar destinatarios</option>
                  <option value="Todos los docentes">Todos los docentes</option>
                  <option value="Docentes de Ingeniería de Sistemas">Docentes de Ingeniería de Sistemas</option>
                  <option value="Docentes de Ingeniería Eléctrica">Docentes de Ingeniería Eléctrica</option>
                  <option value="Docentes de Ingeniería Mecánica">Docentes de Ingeniería Mecánica</option>
                  <option value="Coordinadores de departamento">Coordinadores de departamento</option>
                  <option value="Docentes con clases en Edificio A">Docentes con clases en Edificio A</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Fecha</label>
                <input 
                  type="date" 
                  name="fecha"
                  value={notificacionActual.fecha}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Estado</label>
                <select 
                  name="estado"
                  value={notificacionActual.estado}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="Borrador">Borrador</option>
                  <option value="Programada">Programada</option>
                  <option value="Enviada">Enviada</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={cerrarModal}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                >
                  {modoEdicion ? 'Guardar Cambios' : 'Crear Notificación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notificaciones;