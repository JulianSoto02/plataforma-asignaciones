import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import DocenteLayout from './layouts/DocenteLayout';

// Páginas con carga perezosa
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Páginas de Docente
const DashboardDocente = lazy(() => import('./pages/docente/Dashboard'));
const PreferenciasDocente = lazy(() => import('./pages/docente/Preferencias'));
const HorariosDocente = lazy(() => import('./pages/docente/Horarios'));
const PerfilDocente = lazy(() => import('./pages/docente/Perfil'));

// Páginas de Administrador
const DashboardAdmin = lazy(() => import('./pages/admin/Dashboard'));
const GestionAsignaturas = lazy(() => import('./pages/admin/GestionAsignaturas'));
const GestionDocentes = lazy(() => import('./pages/admin/GestionDocentes'));
const GestionAsignaciones = lazy(() => import('./pages/admin/GestionAsignaciones'));
const GestionEstudiantes = lazy(() => import('./pages/admin/GestionEstudiantes'));
const Reportes = lazy(() => import('./pages/admin/Reportes'));
const Notificaciones = lazy(() => import('./pages/admin/Notificaciones'));
const Configuracion = lazy(() => import('./pages/Configuracion'));

function App() {
  const { user } = useAuth();

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas para docentes */}
          <Route path="/docente" element={
            <ProtectedRoute role="docente">
              <DocenteLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardDocente />} />
            <Route path="preferencias" element={<PreferenciasDocente />} />
            <Route path="horarios" element={<HorariosDocente />} />
            <Route path="perfil" element={<PerfilDocente />} />
          </Route>
          
          {/* Rutas protegidas para administradores */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/asignaturas" replace />} />
            <Route path="asignaturas" element={<GestionAsignaturas />} />
            <Route path="docentes" element={<GestionDocentes />} />
            <Route path="asignaciones" element={<GestionAsignaciones />} />
            <Route path="estudiantes" element={<GestionEstudiantes />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="notificaciones" element={<Notificaciones />} />
          </Route>
          
          {/* Configuración - accesible para ambos roles */}
          <Route path="/configuracion" element={
            <ProtectedRoute>
              {user?.role === 'admin' ? <AdminLayout /> : <DocenteLayout />}
            </ProtectedRoute>
          }>
            <Route index element={<Configuracion />} />
          </Route>
          
          {/* Redirección a dashboard según rol */}
          <Route path="/" element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin' : '/docente'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;