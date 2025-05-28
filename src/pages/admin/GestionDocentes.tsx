import { useState } from 'react';
import { toast } from 'react-toastify';

// Datos de ejemplo
const docentesIniciales = [
  { 
    id: 1, 
    nombre: 'Dr. Ricardo Mendoza', 
    correo: 'ricardo.mendoza@email.com', 
    departamento: 'Ingeniería Eléctrica',
    materiasAsignadas: 'Circuitos Eléctricos, Sistemas de Control'
  },
  { 
    id: 2, 
    nombre: 'Dra. Sofía Ramírez', 
    correo: 'sofia.ramirez@email.com', 
    departamento: 'Ingeniería Mecánica',
    materiasAsignadas: 'Mecánica de Fluidos, Termodinámica'
  },
  { 
    id: 3, 
    nombre: 'Prof. Carlos Vargas', 
    correo: 'carlos.vargas@email.com', 
    departamento: 'Ingeniería de Sistemas',
    materiasAsignadas: 'Programación Orientada a Objetos, Estructuras de Datos'
  },
  { 
    id: 4, 
    nombre: 'Dra. Laura Castro', 
    correo: 'laura.castro@email.com', 
    departamento: 'Ingeniería Civil',
    materiasAsignadas: 'Análisis Estructural, Diseño de Concreto'
  },
  { 
    id: 5, 
    nombre: 'Prof. Javier Torres', 
    correo: 'javier.torres@email.com', 
    departamento: 'Ingeniería Química',
    materiasAsignadas: 'Operaciones Unitarias, Cinética Química'
  }
];

interface Docente {
  id: number;
  nombre: string;
  correo: string;
  departamento: string;
  materiasAsignadas: string;
}

const GestionDocentes = () => {
  const [docentes, setDocentes] = useState<Docente[]>(docentesIniciales);
  const [docenteActual, setDocenteActual] = useState<Docente | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [filtro, setFiltro] = useState('');

  const abrirModalCrear = () => {
    setDocenteActual({
      id: 0,
      nombre: '',
      correo: '',
      departamento: '',
      materiasAsignadas: ''
    });
    setModoEdicion(false);
    setModalAbierto(true);
  };

  const abrirModalEditar = (docente: Docente) => {
    setDocenteActual({ ...docente });
    setModoEdicion(true);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setDocenteActual(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!docenteActual) return;
    
    const { name, value } = e.target;
    setDocenteActual({
      ...docenteActual,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!docenteActual) return;
    
    if (modoEdicion) {
      // Actualizar docente existente
      setDocentes(docentes.map(d => 
        d.id === docenteActual.id ? docenteActual : d
      ));
      toast.success('Docente actualizado correctamente');
    } else {
      // Crear nuevo docente
      const nuevoDocente = {
        ...docenteActual,
        id: Math.max(0, ...docentes.map(d => d.id)) + 1
      };
      setDocentes([...docentes, nuevoDocente]);
      toast.success('Docente agregado correctamente');
    }
    
    cerrarModal();
  };

  const eliminarDocente = (id: number) => {
    if (confirm('¿Está seguro de eliminar este docente?')) {
      setDocentes(docentes.filter(d => d.id !== id));
      toast.info('Docente eliminado');
    }
  };

  // Filtrar docentes
  const docentesFiltrados = docentes.filter(
    docente => 
      docente.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      docente.departamento.toLowerCase().includes(filtro.toLowerCase()) ||
      docente.correo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Docentes</h1>
      
      {/* Barra de herramientas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <button 
          onClick={abrirModalCrear}
          className="btn btn-primary"
        >
          Agregar Docente
        </button>
        
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Buscar docentes..."
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
      
      {/* Lista de docentes */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Correo</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Materias Asignadas</th>
              <th className="py-3 px-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {docentesFiltrados.map((docente) => (
              <tr key={docente.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{docente.nombre}</td>
                <td className="py-3 px-4 text-sm">{docente.correo}</td>
                <td className="py-3 px-4 text-sm">{docente.departamento}</td>
                <td className="py-3 px-4 text-sm">{docente.materiasAsignadas}</td>
                <td className="py-3 px-4 text-sm text-center">
                  <button 
                    onClick={() => abrirModalEditar(docente)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Editar
                  </button>
                  <span className="text-gray-300 mr-3">|</span>
                  <button 
                    onClick={() => eliminarDocente(docente.id)}
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
      
      {/* Modal para crear/editar docente */}
      {modalAbierto && docenteActual && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {modoEdicion ? 'Editar Docente' : 'Agregar Docente'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Nombre</label>
                <input 
                  type="text" 
                  name="nombre"
                  value={docenteActual.nombre}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  name="correo"
                  value={docenteActual.correo}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Departamento</label>
                <select 
                  name="departamento"
                  value={docenteActual.departamento}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Seleccionar Departamento</option>
                  <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                  <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
                  <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
                  <option value="Ingeniería Civil">Ingeniería Civil</option>
                  <option value="Ingeniería Química">Ingeniería Química</option>
                  <option value="Ciencias Básicas">Ciencias Básicas</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Materias Asignadas</label>
                <input 
                  type="text" 
                  name="materiasAsignadas"
                  value={docenteActual.materiasAsignadas}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Separadas por comas"
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
                  {modoEdicion ? 'Guardar Cambios' : 'Agregar Docente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionDocentes;