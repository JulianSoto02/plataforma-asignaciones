import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Página no encontrada</h2>
        <p className="text-gray-500 mb-8">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="btn btn-primary inline-flex items-center"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;