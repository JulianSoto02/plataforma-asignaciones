import { useState } from 'react';
import { toast } from 'react-toastify';

// Datos de ejemplo
const asignacionesIniciales = [
  { id: 1, docente: 'Dr. Ricardo Mendoza', materia: 'Circuitos Eléctricos', grupo: 'A', dias: 'Lunes y Miércoles', horario: '10:00 - 12:00', aula: 'A-101' },
  { id: 2, docente: 'Dra. Sofía Ramírez', materia: 'Mecánica de Fluidos', grupo: 'B', dias: 'Martes y Jueves', horario: '14:00 - 16:00', aula: 'B-203' },
  { id: 3, docente: 'Prof. Carlos Vargas', materia: 'Programación Orientada a Objetos', grupo: 'A', dias: 'Lunes y Miércoles', horario: '08:00 - 10:00', aula: 'C-305' },
  { id: 4, docente: 'Dra. Laura Castro', materia: 'Análisis Estructural', grupo: 'A', dias: 'Viernes', horario: '09:00 - 13:00', aula: 'D-401' },
  { id: 5, docente: 'Prof. Javier Torres', materia: 'Operaciones Unitarias', grupo: 'C', dias: 'Martes y Jueves', horario: '16:00 - 18:00', aula: 'E-502' }
];

// Datos de ejemplo para selects
const docentesDisponibles = [
  { id: 1, nombre: 'Dr. Ricardo Mendoza' },
  { id: 2, nombre: 'Dra. Sofía Ramírez' },
  { id: 3, nombre: 'Prof. Carlos Vargas' },
  { id: 4, nombre: 'Dra. Laura Castro' },
  { id: 5, nombre: 'Prof. Javier Torres' }
];

const materiasDisponibles = [
  { id: 1, nombre: 'Circuitos Eléctricos' },
  { id: 2, nombre: 'Mecánica de Fluidos' },
  { id: 3, nombre: 'Programación Orientada a Objetos' },
  { id: 4, nombre: 'Análisis Estructural' },
  { id: 5, nombre: 'Operaciones Unitarias' },
  { id: 6, nombre: 'Sistemas Operativos' },
  { id: 7, nombre: 'Estructuras de Datos' }
];

interface Asignacion {
  id: number;
  docente: string;
  materia: string;
  grupo: string;
  dias: string;
  horario: string;
  aula: string;
}

const GestionAsignaciones = () => {
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>(asignacionesIniciales);
  const [asignacionActual, setAsignacionActual] = useState<Asignacion | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [filtroDocente, setFiltroDocente] = useState('');
  const [filtroMateria, setFiltroMateria] = useState('');

  const abrirModalCrear = () => {
    setAsignacionActual({
      id: 0,
      docente: '',
      materia: '',
      grupo: '',
      dias: '',
      horario: '',
      aula: ''
    });
    setModoEdicion(false);
    setModalAbierto(true);
  };

  const abrirModalEditar = (asignacion: Asignacion) => {
    setAsignacionActual({ ...asignacion });
    setModoEdicion(true);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAsignacionActual(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!asignacionActual) return;
    
    const { name, value } = e.target;
    setAsignacionActual({
      ...asignacionActual,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!asignacionActual) return;
    
    if (modoEdicion) {
      // Actualizar asignación existente
      setAsignaciones(asignaciones.map(a => 
        a.id === asignacionActual.id ? asignacionActual : a
      ));
      toast.success('Asignación actualizada correctamente');
    } else {
      // Crear nueva asignación
      const nuevaAsignacion = {
        ...asignacionActual,
        id: Math.max(0, ...asignaciones.map(a => a.id)) + 1
      };
      setAsignaciones([...asignaciones, nuevaAsignacion]);
      toast.success('Asignación creada correctamente');
    }
    
    cerrarModal();
  };

  const eliminarAsignacion = (id: number) => {
    if (confirm('¿Está seguro de eliminar esta asignación?')) {
      setAsignaciones(asignaciones.filter(a => a.id !== id));
      toast.info('Asignación eliminada');
    }
  };

  // Filtrar asignaciones
  const asignacionesFiltradas = asignaciones.filter(
    asignacion => 
      asignacion.docente.toLowerCase().includes(filtroDocente.toLowerCase()) &&
      asignacion.materia.toLowerCase().includes(filtroMateria.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Asignaciones</h1>
      
      {/* Barra de herramientas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <button 
          onClick={abrirModalCrear}
          className="btn btn-primary"
        >
          Crear Asignación
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Filtrar por docente..."
              className="form-input pr-10"
              value={filtroDocente}
              onChange={(e) => setFiltroDocente(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Filtrar por materia..."
              className="form-input pr-10"
              value={filtroMateria}
              onChange={(e) => setFiltroMateria(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista de asignaciones */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Docente</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Materia</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Días</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Horario</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Aula</th>
              <th className="py-3 px-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {asignacionesFiltradas.map((asignacion) => (
              <tr key={asignacion.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{asignacion.docente}</td>
                <td className="py-3 px-4 text-sm">{asignacion.materia}</td>
                <td className="py-3 px-4 text-sm">{asignacion.grupo}</td>
                <td className="py-3 px-4 text-sm">{asignacion.dias}</td>
                <td className="py-3 px-4 text-sm">{asignacion.horario}</td>
                <td className="py-3 px-4 text-sm">{asignacion.aula}</td>
                <td className="py-3 px-4 text-sm text-center">
                  <button 
                    onClick={() => abrirModalEditar(asignacion)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Editar
                  </button>
                  <span className="text-gray-300 mr-3">|</span>
                  <button 
                    onClick={() => eliminarAsignacion(asignacion.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal para crear/editar asignación */}
      {modalAbierto && asignacionActual && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {modoEdicion ? 'Editar Asignación' : 'Crear Asignación'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Docente</label>
                <select 
                  name="docente"
                  value={asignacionActual.docente}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Seleccionar Docente</option>
                  {docentesDisponibles.map((docente) => (
                    <option key={docente.id} value={docente.nombre}>
                      {docente.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Materia</label>
                <select 
                  name="materia"
                  value={asignacionActual.materia}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Seleccionar Materia</option>
                  {materiasDisponibles.map((materia) => (
                    <option key={materia.id} value={materia.nombre}>
                      {materia.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Grupo</label>
                <select 
                  name="grupo"
                  value={asignacionActual.grupo}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Seleccionar Grupo</option>
                  <option value="A">Grupo A</option>
                  <option value="B">Grupo B</option>
                  <option value="C">Grupo C</option>
                  <option value="D">Grupo D</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Días</label>
                <select 
                  name="dias"
                  value={asignacionActual.dias}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Seleccionar Días</option>
                  <option value="Lunes y Miércoles">Lunes y Miércoles</option>
                  <option value="Martes y Jueves">Martes y Jueves</option>
                  <option value="Viernes">Viernes</option>
                  <option value="Sábado">Sábado</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Horario</label>
                <select 
                  name="horario"
                  value={asignacionActual.horario}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Seleccionar Horario</option>
                  <option value="08:00 - 10:00">08:00 - 10:00</option>
                  <option value="10:00 - 12:00">10:00 - 12:00</option>
                  <option value="14:00 - 16:00">14:00 - 16:00</option>
                  <option value="16:00 - 18:00">16:00 - 18:00</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Aula</label>
                <input 
                  type="text" 
                  name="aula"
                  value={asignacionActual.aula}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
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
                  {modoEdicion ? 'Guardar Cambios' : 'Crear Asignación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionAsignaciones;