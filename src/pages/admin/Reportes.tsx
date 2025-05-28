import { useState } from 'react';

// Datos de ejemplo para el reporte
const datosReporte = [
  { id: 1, docente: 'Dr. Ricardo Mendoza', departamento: 'Ingeniería Eléctrica', materias: 2, grupos: 3, horasSemanales: 12 },
  { id: 2, docente: 'Dra. Sofía Ramírez', departamento: 'Ingeniería Mecánica', materias: 2, grupos: 2, horasSemanales: 8 },
  { id: 3, docente: 'Prof. Carlos Vargas', departamento: 'Ingeniería de Sistemas', materias: 2, grupos: 4, horasSemanales: 16 },
  { id: 4, docente: 'Dra. Laura Castro', departamento: 'Ingeniería Civil', materias: 2, grupos: 1, horasSemanales: 4 },
  { id: 5, docente: 'Prof. Javier Torres', departamento: 'Ingeniería Química', materias: 2, grupos: 2, horasSemanales: 8 },
  { id: 6, docente: 'Dr. Manuel López', departamento: 'Ciencias Básicas', materias: 3, grupos: 5, horasSemanales: 20 },
  { id: 7, docente: 'Dra. Ana Martínez', departamento: 'Ingeniería Industrial', materias: 1, grupos: 2, horasSemanales: 8 },
  { id: 8, docente: 'Prof. Roberto Sánchez', departamento: 'Ingeniería de Sistemas', materias: 2, grupos: 3, horasSemanales: 12 }
];

const departamentos = [
  'Todos',
  'Ingeniería Eléctrica',
  'Ingeniería Mecánica',
  'Ingeniería de Sistemas',
  'Ingeniería Civil',
  'Ingeniería Química',
  'Ciencias Básicas',
  'Ingeniería Industrial'
];

const semestres = [
  'Todos',
  '2025-1',
  '2024-2',
  '2024-1',
  '2023-2'
];

const Reportes = () => {
  const [filtroDepartamento, setFiltroDepartamento] = useState('Todos');
  const [filtroSemestre, setFiltroSemestre] = useState('Todos');
  
  // Aplicar filtros
  const datosFiltrados = datosReporte.filter(item => {
    const cumpleDepartamento = filtroDepartamento === 'Todos' || item.departamento === filtroDepartamento;
    return cumpleDepartamento; // No filtramos por semestre en este ejemplo porque no tenemos ese campo
  });

  // Función para exportar a CSV
  const exportarCSV = () => {
    // Cabeceras CSV
    const cabeceras = ['ID', 'Docente', 'Departamento', 'Materias', 'Grupos', 'Horas Semanales'];
    
    // Convertir datos a formato CSV
    const filas = datosFiltrados.map(item => 
      [item.id, item.docente, item.departamento, item.materias, item.grupos, item.horasSemanales].join(',')
    );
    
    // Unir cabeceras y filas
    const contenidoCSV = [cabeceras.join(','), ...filas].join('\n');
    
    // Crear blob y descargar
    const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_asignaciones_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reportes de Asignación Académica</h1>
      
      {/* Filtros y botones de acción */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="form-label">Departamento</label>
          <select 
            className="form-input"
            value={filtroDepartamento}
            onChange={(e) => setFiltroDepartamento(e.target.value)}
          >
            {departamentos.map((depto) => (
              <option key={depto} value={depto}>{depto}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="form-label">Semestre</label>
          <select 
            className="form-input"
            value={filtroSemestre}
            onChange={(e) => setFiltroSemestre(e.target.value)}
          >
            {semestres.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setFiltroDepartamento('Todos');
              setFiltroSemestre('Todos');
            }}
          >
            Limpiar Filtros
          </button>
        </div>
        
        <div className="flex items-end">
          <button 
            className="btn btn-secondary"
            onClick={exportarCSV}
          >
            Exportar CSV
          </button>
        </div>
      </div>
      
      {/* Tabla de reportes */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Docente</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
              <th className="py-3 px-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Materias</th>
              <th className="py-3 px-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Grupos</th>
              <th className="py-3 px-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Horas Semanales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {datosFiltrados.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{item.docente}</td>
                <td className="py-3 px-4 text-sm">{item.departamento}</td>
                <td className="py-3 px-4 text-sm text-center">{item.materias}</td>
                <td className="py-3 px-4 text-sm text-center">{item.grupos}</td>
                <td className="py-3 px-4 text-sm text-center">{item.horasSemanales}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={2} className="py-3 px-4 text-sm font-medium">Total</td>
              <td className="py-3 px-4 text-sm font-medium text-center">
                {datosFiltrados.reduce((sum, item) => sum + item.materias, 0)}
              </td>
              <td className="py-3 px-4 text-sm font-medium text-center">
                {datosFiltrados.reduce((sum, item) => sum + item.grupos, 0)}
              </td>
              <td className="py-3 px-4 text-sm font-medium text-center">
                {datosFiltrados.reduce((sum, item) => sum + item.horasSemanales, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      {/* Información adicional */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-2">Promedio de horas por docente</h3>
          <p className="text-2xl font-bold text-blue-600">
            {datosFiltrados.length > 0 
              ? (datosFiltrados.reduce((sum, item) => sum + item.horasSemanales, 0) / datosFiltrados.length).toFixed(1) 
              : 0}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-2">Total de docentes</h3>
          <p className="text-2xl font-bold text-blue-600">{datosFiltrados.length}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-2">Total de grupos</h3>
          <p className="text-2xl font-bold text-blue-600">
            {datosFiltrados.reduce((sum, item) => sum + item.grupos, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reportes;