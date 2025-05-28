import { Link } from 'react-router-dom';
import { BookOpen, Clock, User } from 'lucide-react';

// Datos de ejemplo
const materiasDisponibles = [
  { id: 1, nombre: 'Ingeniería de Software', codigo: 'IS101' },
  { id: 2, nombre: 'Estructuras de Datos', codigo: 'ED201' },
  { id: 3, nombre: 'Sistemas Operativos', codigo: 'SO301' },
  { id: 4, nombre: 'Bases de Datos', codigo: 'BD401' }
];

const materiasAsignadas = [
  { 
    id: 1, 
    nombre: 'Ingeniería de Software', 
    dias: 'Lunes y Miércoles', 
    horario: '10:00 - 12:00',
    grupo: 'A'
  },
  { 
    id: 2, 
    nombre: 'Estructuras de Datos', 
    dias: 'Martes y Jueves', 
    horario: '14:00 - 16:00',
    grupo: 'B'
  },
  { 
    id: 3, 
    nombre: 'Sistemas Operativos', 
    dias: 'Viernes', 
    horario: '09:00 - 11:00',
    grupo: 'A'
  }
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Asignaciones Académicas</h1>
      
      {/* Sección de Materias Disponibles */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Materias Disponibles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materiasDisponibles.map((materia) => (
            <div 
              key={materia.id} 
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{materia.nombre}</h3>
                  <p className="text-sm text-gray-500">{materia.codigo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Sección de Registro de Preferencias */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Registro de Preferencias</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="materia" className="form-label">Seleccionar Materia</label>
              <select id="materia" className="form-input">
                <option>Seleccionar</option>
                {materiasDisponibles.map((materia) => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="horario" className="form-label">Seleccionar Horario</label>
              <select id="horario" className="form-input">
                <option>Seleccionar</option>
                <option>Lunes y Miércoles (10:00 - 12:00)</option>
                <option>Martes y Jueves (14:00 - 16:00)</option>
                <option>Viernes (09:00 - 11:00)</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 text-right">
            <button className="btn btn-primary">Guardar Preferencias</button>
          </div>
        </div>
      </section>
      
      {/* Sección de Materias Asignadas */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Materias Asignadas</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Materia</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Día</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Horario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {materiasAsignadas.map((materia) => (
                <tr key={materia.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{materia.nombre}</td>
                  <td className="py-3 px-4 text-sm">{materia.grupo}</td>
                  <td className="py-3 px-4 text-sm">{materia.dias}</td>
                  <td className="py-3 px-4 text-sm">{materia.horario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;