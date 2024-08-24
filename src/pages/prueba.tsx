// Definir tus componentes de página
// const MainPage = () => <div>Main Page</div>;
// const AboutPage = () => <div>About Page</div>;
// const ContactPage = () => <div>Contact Page</div>;

// Exportar los componentes para usarlos en las rutas
export const RUTAS = [
  {
    name: 'main',
    Component: () => import('./Home'),  // Carga bajo demanda
  },
  {
    name: 'about',
    Component: () => import('./About'),  // Carga bajo demanda
  },
  {
    name: 'contact',
    Component: () => import('./Contact'),  // Carga bajo demanda
  },
];