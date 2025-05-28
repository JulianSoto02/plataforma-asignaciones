import { useState } from 'react';

// Datos de ejemplo
const materiasAsignadas = [
  { id: 1, nombre: 'Ingeniería de Software', dias: 'Lunes y Miércoles', horario: '10:00 - 12:00', aula: 'A-101', grupo: 'A' },
  { id: 2, nombre: 'Estructuras de Datos', dias: 'Martes y Jueves', horario: '14:00 - 16:00', aula: 'B-203', grupo: 'B' },
  { id: 3, nombre: 'Sistemas Operativos', dias: 'Viernes', horario: '09:00 - 11:00', aula: 'C-305', grupo: 'A' }
];

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const horasClase = [
  '08:00 - 10:00', 
  '10:00 - 12:00', 
  '12:00 - 14:00', 
  '14:00 - 16:00', 
  '16:00 - 18:00'
];

interface Evento {
  id: number;
  titulo: string;
  grupo: string;
  aula: string;
}

// Preparar eventos para el horario
const crearEventosHorario = () => {
  const eventos: Record<string, Record<string, Evento | null>> = {};
  
  // Inicializar estructura vacía
  diasSemana.forEach(dia => {
    eventos[dia] = {};
    horasClase.forEach(hora => {
      eventos[dia][hora] = null;
    });
  });
  
  // Llenar con materias asignadas
  materiasAsignadas.forEach(materia => {
    const dias = materia.dias.split(' y ');
    dias.forEach(dia => {
      if (diasSemana.includes(dia)) {
        eventos[dia][materia.horario] = {
          id: materia.id,
          titulo: materia.nombre,
          grupo: materia.grupo,
          aula: materia.aula
        };
      }
    });
  });
  
  return eventos;
};

const Horarios = () => {
  const [vistaActiva, setVistaActiva] = useState<'lista' | 'horario'>('lista');
  const [eventosHorario] = useState(crearEventosHorario());

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Horarios</h1>
      
      {/* Selector de vista */}
      <div className="flex space-x-2 mb-6">
        <button 
          className={`px-4 py-2 rounded-lg ${vistaActiva === 'lista' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setVistaActiva('lista')}
        >
          Vista de Lista
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${vistaActiva === 'horario' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setVistaActiva('horario')}
        >
          Vista de Horario
        </button>
      </div>
      
      {/* Vista de Lista */}
      {vistaActiva === 'lista' && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Materia</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Días</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Aula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {materiasAsignadas.map((materia) => (
                <tr key={materia.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{materia.nombre}</td>
                  <td className="py-3 px-4 text-sm">{materia.grupo}</td>
                  <td className="py-3 px-4 text-sm">{materia.dias}</td>
                  <td className="py-3 px-4 text-sm">{materia.horario}</td>
                  <td className="py-3 px-4 text-sm">{materia.aula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Vista de Horario */}
      {vistaActiva === 'horario' && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                {diasSemana.map((dia) => (
                  <th key={dia} className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {horasClase.map((hora) => (
                <tr key={hora} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{hora}</td>
                  {diasSemana.map((dia) => {
                    const evento = eventosHorario[dia][hora];
                    return (
                      <td key={`${dia}-${hora}`} className="py-3 px-4">
                        {evento ? (
                          <div className="p-2 bg-blue-100 border border-blue-200 rounded">
                            <div className="font-medium">{evento.titulo}</div>
                            <div className="text-xs text-gray-500">Grupo: {evento.grupo}</div>
                            <div className="text-xs text-gray-500">Aula: {evento.aula}</div>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Leyenda */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-medium mb-2">Leyenda</h3>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
          <span className="text-sm">Clase asignada</span>
        </div>
      </div>
    </div>
  );
};

export default Horarios;