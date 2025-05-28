import { Link } from 'react-router-dom';
import { BookOpen, Users, Table, FileText, Bell } from 'lucide-react';

// Datos de ejemplo para el dashboard
const estadisticas = [
  { id: 1, titulo: 'Total de Docentes', valor: 45, icono: <Users className="h-8 w-8 text-blue-500" /> },
  { id: 2, titulo: 'Total de Asignaturas', valor: 68, icono: <BookOpen className="h-8 w-8 text-green-500" /> },
  { id: 3, titulo: 'Asignaciones Completadas', valor: 152, icono: <Table className="h-8 w-8 text-purple-500" /> },
  { id: 4, titulo: 'Notificaciones Enviadas', valor: 24, icono: <Bell className="h-8 w-8 text-yellow-500" /> }
];

const actividadesRecientes = [
  { id: 1, accion: 'Asignación creada', detalle: 'Circuitos Eléctricos - Dr. Ricardo Mendoza', tiempo: 'Hace 10 minutos' },
  { id: 2, accion: 'Docente agregado', detalle: 'Dra. María Fernández - Ingeniería Química', tiempo: 'Hace 2 horas' },
  { id: 3, accion: 'Notificación enviada', detalle: 'Recordatorio de entrega de preferencias', tiempo: 'Ayer' },
  { id: 4, accion: 'Asignatura actualizada', detalle: 'Cambio de horario - Programación Orientada a Objetos', tiempo: 'Ayer' },
  { id: 5, accion: 'Asignación eliminada', detalle: 'Análisis Estructural - Grupo C', tiempo: 'Hace 2 días' }
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {estadisticas.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {stat.icono}
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm font-medium">{stat.titulo}</p>
                <h2 className="text-3xl font-bold">{stat.valor}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Sección principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividades recientes */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Actividades Recientes</h2>
            
            <div className="divide-y divide-gray-200">
              {actividadesRecientes.map((actividad) => (
                <div key={actividad.id} className="py-4">
                  <div className="flex justify-between">
                    <p className="font-medium">{actividad.accion}</p>
                    <span className="text-sm text-gray-500">{actividad.tiempo}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{actividad.detalle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Accesos rápidos */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Accesos Rápidos</h2>
            
            <div className="space-y-3">
              <Link 
                to="/admin/asignaturas" 
                className="block p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Gestionar Asignaturas</span>
                </div>
              </Link>
              
              <Link 
                to="/admin/docentes" 
                className="block p-4 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-500 mr-3" />
                  <span>Gestionar Docentes</span>
                </div>
              </Link>
              
              <Link 
                to="/admin/asignaciones" 
                className="block p-4 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center">
                  <Table className="h-5 w-5 text-purple-500 mr-3" />
                  <span>Gestionar Asignaciones</span>
                </div>
              </Link>
              
              <Link 
                to="/admin/reportes" 
                className="block p-4 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-amber-500 mr-3" />
                  <span>Ver Reportes</span>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Calendario */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
            <h2 className="text-xl font-bold mb-4">Próximos Eventos</h2>
            
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                <p className="font-medium">Registro de preferencias</p>
                <p className="text-sm text-gray-600">Finaliza en 5 días</p>
              </div>
              
              <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded">
                <p className="font-medium">Asignación de materias</p>
                <p className="text-sm text-gray-600">Inicia en 7 días</p>
              </div>
              
              <div className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded">
                <p className="font-medium">Publicación de horarios</p>
                <p className="text-sm text-gray-600">En 15 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;