import { useState } from 'react';
import { toast } from 'react-toastify';

// Datos de ejemplo
const asignaturasIniciales = [
  { id: 1, nombre: 'Matemáticas Avanzadas', codigo: 'MA301', creditos: 4, departamento: 'Ciencias Básicas' },
  { id: 2, nombre: 'Programación Orientada a Objetos', codigo: 'CS202', creditos: 3, departamento: 'Ingeniería de Software' },
  { id: 3, nombre: 'Circuitos Electrónicos', codigo: 'EE201', creditos: 3, departamento: 'Ingeniería Eléctrica' },
  { id: 4, nombre: 'Mecánica de Fluidos', codigo: 'ME305', creditos: 4, departamento: 'Ingeniería Mecánica' },
  { id: 5, nombre: 'Química Industrial', codigo: 'CH203', creditos: 3, departamento: 'Ingeniería Química' }
];

interface Asignatura {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number;
  departamento: string;
}

const GestionAsignaturas = () => {
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>(asignaturasIniciales);
  const [asignaturaActual, setAsignaturaActual] = useState<Asignatura | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const abrirModalCrear = () => {
    setAsignaturaActual({
      id: 0,
      nombre: '',
      codigo: '',
      creditos: 3,
      departamento: ''
    });
    setModoEdicion(false);
    setModalAbierto(true);
  };

  const abrirModalEditar = (asignatura: Asignatura) => {
    setAsignaturaActual({ ...asignatura });
    setModoEdicion(true);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAsignaturaActual(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!asignaturaActual) return;
    
    const { name, value } = e.target;
    setAsignaturaActual({
      ...asignaturaActual,
      [name]: name === 'creditos' ? parseInt(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!asignaturaActual) return;
    
    if (modoEdicion) {
      // Actualizar asignatura existente
      setAsignaturas(asignaturas.map(a => 
        a.id === asignaturaActual.id ? asignaturaActual : a
      ));
      toast.success('Asignatura actualizada correctamente');
    } else {
      // Crear nueva asignatura
      const nuevaAsignatura = {
        ...asignaturaActual,
        id: Math.max(0, ...asignaturas.map(a => a.id)) + 1
      };
      setAsignaturas([...asignaturas, nuevaAsignatura]);
      toast.success('Asignatura creada correctamente');
    }
    
    cerrarModal();
  };

  const eliminarAsignatura = (id: number) => {
    if (confirm('¿Está seguro de eliminar esta asignatura?')) {
      setAsignaturas(asignaturas.filter(a => a.id !== id));
      toast.info('Asignatura eliminada');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Asignaturas</h1>
      
      {/* Acciones */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Acciones</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={abrirModalCrear}
            className="btn btn-primary"
          >
            Crear Asignatura
          </button>
          
          <button className="btn btn-secondary">
            Editar Asignatura
          </button>
          
          <button className="btn btn-danger">
            Eliminar Asignatura
          </button>
        </div>
      </div>
      
      {/* Lista de asignaturas */}
      <div>
        <h2 className="text-xl font-bold mb-4">Lista de Asignaturas</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {asignaturas.map((asignatura) => (
                <tr key={asignatura.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{asignatura.nombre}</td>
                  <td className="py-3 px-4 text-sm">{asignatura.codigo}</td>
                  <td className="py-3 px-4 text-sm">{asignatura.creditos}</td>
                  <td className="py-3 px-4 text-sm">{asignatura.departamento}</td>
                  <td className="py-3 px-4 text-sm text-right">
                    <button 
                      onClick={() => abrirModalEditar(asignatura)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => eliminarAsignatura(asignatura.id)}
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
      </div>
      
      {/* Modal para crear/editar asignatura */}
      {modalAbierto && asignaturaActual && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {modoEdicion ? 'Editar Asignatura' : 'Crear Asignatura'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Nombre</label>
                <input 
                  type="text" 
                  name="nombre"
                  value={asignaturaActual.nombre}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Código</label>
                <input 
                  type="text" 
                  name="codigo"
                  value={asignaturaActual.codigo}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Créditos</label>
                <input 
                  type="number" 
                  name="creditos"
                  value={asignaturaActual.creditos}
                  onChange={handleInputChange}
                  className="form-input"
                  min="1"
                  max="10"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Departamento</label>
                <input 
                  type="text" 
                  name="departamento"
                  value={asignaturaActual.departamento}
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
                  {modoEdicion ? 'Guardar Cambios' : 'Crear Asignatura'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionAsignaturas;