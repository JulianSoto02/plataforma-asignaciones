import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

// Datos de ejemplo
const perfilDocente = {
  nombre: 'Dr. Juan Pérez',
  email: 'juan.perez@universidad.edu',
  departamento: 'Ingeniería de Sistemas',
  especialidad: 'Ingeniería de Software',
  titulo: 'Doctor en Ciencias de la Computación',
  telefono: '555-123-4567',
  oficina: 'Edificio A, Oficina 302',
  horasConsulta: 'Lunes y Miércoles 14:00 - 16:00'
};

const Perfil = () => {
  const { user } = useAuth();
  const [editando, setEditando] = useState(false);
  const [perfil, setPerfil] = useState(perfilDocente);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPerfil({
      ...perfil,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el perfil en el backend
    toast.success('Perfil actualizado correctamente');
    setEditando(false);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Cabecera del perfil */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
              {user?.name.charAt(0) || 'D'}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold">{perfil.nombre}</h2>
              <p className="text-gray-600">{perfil.titulo}</p>
              <p className="text-gray-500">{perfil.departamento}</p>
            </div>
            
            {!editando && (
              <button 
                className="ml-auto btn btn-secondary"
                onClick={() => setEditando(true)}
              >
                Editar Perfil
              </button>
            )}
          </div>
        </div>
        
        {/* Contenido del perfil */}
        <div className="p-6">
          {editando ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={perfil.nombre}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={perfil.email}
                    onChange={handleChange}
                    className="form-input"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="form-label">Departamento</label>
                  <input
                    type="text"
                    name="departamento"
                    value={perfil.departamento}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Especialidad</label>
                  <input
                    type="text"
                    name="especialidad"
                    value={perfil.especialidad}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Título académico</label>
                  <input
                    type="text"
                    name="titulo"
                    value={perfil.titulo}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={perfil.telefono}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Oficina</label>
                  <input
                    type="text"
                    name="oficina"
                    value={perfil.oficina}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Horas de consulta</label>
                  <input
                    type="text"
                    name="horasConsulta"
                    value={perfil.horasConsulta}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setPerfil(perfilDocente);
                    setEditando(false);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
                <p>{perfil.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Departamento</h3>
                <p>{perfil.departamento}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Especialidad</h3>
                <p>{perfil.especialidad}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Título académico</h3>
                <p>{perfil.titulo}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                <p>{perfil.telefono}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Oficina</h3>
                <p>{perfil.oficina}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Horas de consulta</h3>
                <p>{perfil.horasConsulta}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;