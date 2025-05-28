import { useState } from 'react';
import { toast } from 'react-toastify';

// Datos de ejemplo
const estudiantesIniciales = [
  { id: 1, nombre: 'Ana García', matricula: 'EST20210001', carrera: 'Ingeniería de Sistemas', semestre: 5, email: 'ana.garcia@estudiante.edu' },
  { id: 2, nombre: 'Luis Martínez', matricula: 'EST20210002', carrera: 'Ingeniería Eléctrica', semestre: 3, email: 'luis.martinez@estudiante.edu' },
  { id: 3, nombre: 'Carmen Rodríguez', matricula: 'EST20210003', carrera: 'Ingeniería Mecánica', semestre: 7, email: 'carmen.rodriguez@estudiante.edu' },
  { id: 4, nombre: 'Jorge Sánchez', matricula: 'EST20210004', carrera: 'Ingeniería Civil', semestre: 4, email: 'jorge.sanchez@estudiante.edu' },
  { id: 5, nombre: 'María López', matricula: 'EST20210005', carrera: 'Ingeniería Química', semestre: 6, email: 'maria.lopez@estudiante.edu' }
];

interface Estudiante {
  id: number;
  nombre: string;
  matricula: string;
  carrera: string;
  semestre: number;
  email: string;
}

const GestionEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>(estudiantesIniciales);
  const [estudianteActual, setEstudianteActual] = useState<Estudiante | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [filtro, setFiltro] = useState('');

  const abrirModalCrear = () => {
    setEstudianteActual({
      id: 0,
      nombre: '',
      matricula: '',
      carrera: '',
      semestre: 1,
      email: ''
    });
    setModoEdicion(false);
    setModalAbierto(true);
  };

  const abrirModalEditar = (estudiante: Estudiante) => {
    setEstudianteActual({ ...estudiante });
    setModoEdicion(true);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEstudianteActual(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!estudianteActual) return;
    
    const { name, value } = e.target;
    setEstudianteActual({
      ...estudianteActual,
      [name]: name === 'semestre' ? parseInt(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!estudianteActual) return;
    
    if (modoEdicion) {
      // Actualizar estudiante existente
      setEstudiantes(estudiantes.map(e => 
        e.id === estudianteActual.id ? estudianteActual : e
      ));
      toast.success('Estudiante actualizado correctamente');
    } else {
      // Crear nuevo estudiante
      const nuevoEstudiante = {
        ...estudianteActual,
        id: Math.max(0, ...estudiantes.map(e => e.id)) + 1
      };
      setEstudiantes([...estudiantes, nuevoEstudiante]);
      toast.success('Estudiante agregado correctamente');
    }
    
    cerrarModal();
  };

  const eliminarEstudiante = (id: number) => {
    if (confirm('¿Está seguro de eliminar este estudiante?')) {
      setEstudiantes(estudiantes.filter(e => e.id !== id));
      toast.info('Estudiante eliminado');
    }
  };

  // Filtrar estudiantes
  const estudiantesFiltrados = estudiantes.filter(
    estudiante => 
      estudiante.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      estudiante.matricula.toLowerCase().includes(filtro.toLowerCase()) ||
      estudiante.carrera.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Estudiantes</h1>
      
      {/* Barra de herramientas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <button 
          onClick={abrirModalCrear}
          className="btn btn-primary"
        >
          Agregar Estudiante
        </button>
        
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            className="form-input pr-10"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Lista de estudiantes */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Matrícula</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Carrera</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Semestre</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="py-3 px-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {estudiantesFiltrados.map((estudiante) => (
              <tr key={estudiante.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{estudiante.nombre}</td>
                <td className="py-3 px-4 text-sm">{estudiante.matricula}</td>
                <td className="py-3 px-4 text-sm">{estudiante.carrera}</td>
                <td className="py-3 px-4 text-sm">{estudiante.semestre}</td>
                <td className="py-3 px-4 text-sm">{estudiante.email}</td>
                <td className="py-3 px-4 text-sm text-center">
                  <button 
                    onClick={() => abrirModalEditar(estudiante)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Editar
                  </button>
                  <span className="text-gray-300 mr-3">|</span>
                  <button 
                    onClick={() => eliminarEstudiante(estudiante.id)}
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
      
      {/* Modal para crear/editar estudiante */}
      {modalAbierto && estudianteActual && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {modoEdicion ? 'Editar Estudiante' : 'Agregar Estudiante'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Nombre completo</label>
                <input 
                  type="text" 
                  name="nombre"
                  value={estudianteActual.nombre}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Matrícula</label>
                <input 
                  type="text" 
                  name="matricula"
                  value={estudianteActual.matricula}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Carrera</label>
                <select 
                  name="carrera"
                  value={estudianteActual.carrera}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Seleccionar Carrera</option>
                  <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                  <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
                  <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
                  <option value="Ingeniería Civil">Ingeniería Civil</option>
                  <option value="Ingeniería Química">Ingeniería Química</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Semestre</label>
                <select 
                  name="semestre"
                  value={estudianteActual.semestre}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                    <option key={sem} value={sem}>Semestre {sem}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={estudianteActual.email}
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
                  {modoEdicion ? 'Guardar Cambios' : 'Agregar Estudiante'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionEstudiantes;