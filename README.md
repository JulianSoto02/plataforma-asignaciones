# Sistema de Asignación Académica

Este proyecto es una aplicación web para la gestión de asignaciones académicas de docentes en una facultad de ingeniería. Permite a los administradores gestionar docentes, asignaturas y asignaciones, mientras que los docentes pueden registrar sus preferencias de materias y horarios.

## Características

- **Autenticación**: Sistema de login con recuperación de contraseña
- **Panel del Docente**: 
  - Vista de materias disponibles
  - Registro de preferencias de materias y horarios
  - Visualización de asignaciones actuales
- **Panel del Administrador**:
  - Gestión de docentes (CRUD)
  - Gestión de asignaturas (CRUD)
  - Asignación de materias a docentes
  - Reportes con filtros y exportación
  - Sistema de notificaciones
  - Configuración de cuenta

## Tecnologías utilizadas

- React.js
- Tailwind CSS
- React Router para navegación
- React Table para tablas de datos
- React Toastify para notificaciones

## Requisitos previos

- Node.js (versión 16.x o superior)
- npm (versión 8.x o superior)

## Instalación

1. Clone el repositorio:
```bash
git clone https://github.com/usuario/sistema-asignacion-academica.git
cd sistema-asignacion-academica
```

2. Instale las dependencias:
```bash
npm install
```

3. Inicie el servidor de desarrollo:
```bash
npm run dev
```

4. Abra su navegador en `http://localhost:5173` para ver la aplicación.

## Compilación para producción

Para compilar la aplicación para producción, ejecute:
```bash
npm run build
```

Los archivos compilados se generarán en el directorio `dist/`.

## Despliegue

### Despliegue en GitHub Pages

1. Ajuste la configuración de base en `vite.config.js`:
```js
export default defineConfig({
  // ...
  base: '/nombre-del-repositorio/',
  // ...
});
```

2. Cree un script de despliegue en `package.json`:
```json
"scripts": {
  // ...
  "deploy": "gh-pages -d dist"
}
```

3. Instale la dependencia de gh-pages:
```bash
npm install --save-dev gh-pages
```

4. Ejecute el despliegue:
```bash
npm run build && npm run deploy
```

### Despliegue en Vercel

1. Instale la CLI de Vercel:
```bash
npm install -g vercel
```

2. Despliegue la aplicación:
```bash
vercel
```

## Estructura del proyecto

```
/
├── public/
│   └── assets/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── context/        # Contextos de React
│   ├── hooks/          # Hooks personalizados
│   ├── layouts/        # Componentes de layout
│   ├── pages/          # Páginas de la aplicación
│   ├── styles/         # Estilos CSS
│   ├── utils/          # Utilidades y funciones auxiliares
│   ├── App.tsx         # Componente principal
│   ├── index.css       # Estilos globales
│   └── main.tsx        # Punto de entrada
├── .eslintrc.json      # Configuración de ESLint
├── index.html          # Plantilla HTML
├── package.json        # Dependencias y scripts
├── postcss.config.js   # Configuración de PostCSS
├── tailwind.config.js  # Configuración de Tailwind CSS
├── tsconfig.json       # Configuración de TypeScript
└── vite.config.js      # Configuración de Vite
```

## Autor

[Su nombre] - [Su correo electrónico]

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo LICENSE para más detalles.