import { useState } from 'react';
import { toast } from 'react-toastify';

// Datos de ejemplo
const materiasDisponibles = [
  { id: 1, nombre: 'Ingeniería de Software', codigo: 'IS101', departamento: 'Ingeniería de Sistemas' },
  { id: 2, nombre: 'Estructuras de Datos', codigo: 'ED201', departamento: 'Ingeniería de Sistemas' },
  { id: 3, nombre: 'Sistemas Operativos', codigo: 'SO301', departamento: 'Ingeniería de Sistemas' },
  { id: 4, nombre: 'Bases de Datos', codigo: 'BD401', departamento: 'Ingeniería de Sistemas' },
  { id: 5, nombre: 'Programación Orientada a Objetos', codigo: 'POO201', departamento: 'Ingeniería de Sistemas' }
];

const horariosDisponibles = [
  { id: 1, dias: 'Lunes y Miércoles', horas: '08:00 - 10:00' },
  { id: 2, dias: 'Lunes y Miércoles', horas: '10:00 - 12:00' },
  { id: 3, dias: 'Martes y Jueves', horas: '08:00 - 10:00' },
  { id: 4, dias: 'Martes y Jueves', horas: '14:00 - 16:00' },
  { id: 5, dias: 'Viernes', horas: '09:00 - 11:00' }
];

interface Preferencia {
  id: number;
  materia: string;
  horario: string;
}

const Preferencias = () => {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [preferencias, setPreferencias] = useState<Preferencia[]>([
    { id: 1, materia: 'Ingeniería de Software', horario: 'Lunes y Miércoles, 10:00 - 12:00' },
    { id: 2, materia: 'Estructuras de Datos', horario: 'Martes y Jueves, 14:00 - 16:00' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!materiaSeleccionada || !horarioSeleccionado) {
      toast.error('Por favor seleccione una materia y un horario');
      return;
    }

    // Obtener los nombres completos
    const materia = materiasDisponibles.find(m => m.id === parseInt(materiaSeleccionada))?.nombre || '';
    const horarioObj = horariosDisponibles.find(h => h.id === parseInt(horarioSeleccionado));
    const horario = horarioObj ? `${horarioObj.dias}, ${horarioObj.horas}` : '';

    // Agregar nueva preferencia
    const nuevaPreferencia: Preferencia = {
      id: Date.now(), // Usar timestamp como ID único
      materia,
      horario
    };

    setPreferencias([...preferencias, nuevaPreferencia]);
    
    // Limpiar el formulario
    setMateriaSeleccionada('');
    setHorarioSeleccionado('');
    
    toast.success('Preferencia guardada correctamente');
  };

  const eliminarPreferencia = (id: number) => {
    setPreferencias(preferencias.filter(p => p.id !== id));
    toast.info('Preferencia eliminada');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Registro de Preferencias</h1>
      
      {/* Formulario de preferencias */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="materia" className="form-label">Seleccionar Materia</label>
              <select 
                id="materia" 
                className="form-input"
                value={materiaSeleccionada}
                onChange={(e) => setMateriaSeleccionada(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {materiasDisponibles.map((materia) => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nombre} ({materia.codigo})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="horario" className="form-label">Seleccionar Horario</label>
              <select 
                id="horario" 
                className="form-input"
                value={horarioSeleccionado}
                onChange={(e) => setHorarioSeleccionado(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {horariosDisponibles.map((horario) => (
                  <option key={horario.id} value={horario.id}>
                    {horario.dias} ({horario.horas})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6 text-right">
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Guardar Preferencia
            </button>
          </div>
        </form>
      </div>
      
      {/* Lista de preferencias registradas */}
      <div>
        <h2 className="text-xl font-bold mb-4">Mis Preferencias</h2>
        
        {preferencias.length === 0 ? (
          <p className="text-gray-500">No has registrado preferencias aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Materia</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {preferencias.map((preferencia) => (
                  <tr key={preferencia.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{preferencia.materia}</td>
                    <td className="py-3 px-4 text-sm">{preferencia.horario}</td>
                    <td className="py-3 px-4 text-sm text-right">
                      <button 
                        onClick={() => eliminarPreferencia(preferencia.id)}
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
        )}
      </div>
    </div>
  );
};

export default Preferencias;