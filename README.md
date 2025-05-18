# Onsen Coffee - Tienda de Café de Especialidad

![Onsen Coffee](public/images/hero-coffee.png)

## Descripción

Onsen Coffee es una plataforma de e-commerce completa para una tienda de café de especialidad. La aplicación permite a los usuarios explorar y comprar diferentes tipos de café, leer artículos relacionados con el café, gestionar un carrito de compras, y completar el proceso de pago. El sitio está diseñado con un enfoque en la experiencia de usuario, la accesibilidad y el rendimiento.

## Características Principales

- **Catálogo de Productos**: Exploración de productos con filtrado por categoría, origen, nivel de tueste y precio
- **Sistema de Búsqueda**: Búsqueda avanzada en productos y artículos del blog
- **Carrito de Compras**: Gestión completa del carrito con persistencia en localStorage
- **Proceso de Checkout**: Flujo de pago con validación de formularios
- **Blog**: Artículos detallados sobre café con categorización y artículos relacionados
- **Modo Oscuro**: Soporte completo para tema claro y oscuro
- **Diseño Responsive**: Adaptable a todos los tamaños de pantalla
- **Optimización SEO**: Metadatos, sitemap y robots.txt para mejor posicionamiento
- **Animaciones**: Transiciones suaves y efectos visuales para mejorar la experiencia de usuario
- **Accesibilidad**: Implementación de prácticas WCAG para garantizar la accesibilidad

## Tecnologías Utilizadas

- **Next.js 14**: Framework de React con renderizado del lado del servidor y App Router
- **TypeScript**: Tipado estático para JavaScript
- **Tailwind CSS**: Framework de CSS utilitario para estilos
- **Shadcn/UI**: Componentes de UI reutilizables y accesibles
- **React Context API**: Para gestión de estado global (carrito de compras)
- **Next Themes**: Para implementación del modo oscuro
- **Lucide React**: Iconos SVG
- **Vercel Analytics**: Para análisis de rendimiento y uso
- **LocalStorage API**: Para persistencia de datos del carrito

## Estructura del Proyecto

\`\`\`
onsen-coffee/
├── app/                    # Rutas y páginas de Next.js
│   ├── about/              # Página Sobre Nosotros
│   ├── blog/               # Sección de blog y artículos
│   │   └── [slug]/         # Página de artículo individual
│   ├── cart/               # Página del carrito de compras
│   ├── checkout/           # Proceso de pago
│   │   └── success/        # Página de confirmación de pedido
│   ├── contact/            # Página de contacto
│   ├── products/           # Catálogo de productos
│   │   └── [slug]/         # Página de producto individual
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página de inicio
│   ├── robots.ts           # Configuración de robots.txt
│   └── sitemap.ts          # Generador de sitemap
├── components/             # Componentes reutilizables
│   ├── blog/               # Componentes específicos del blog
│   ├── home/               # Componentes específicos de la página de inicio
│   ├── icons/              # Componentes de iconos
│   ├── layout/             # Componentes de layout (header, footer)
│   ├── products/           # Componentes específicos de productos
│   ├── search/             # Componentes de búsqueda
│   ├── ui/                 # Componentes de UI básicos
│   └── theme-provider.tsx  # Proveedor de tema (claro/oscuro)
├── context/                # Contextos de React
│   └── cart-context.tsx    # Contexto del carrito de compras
├── lib/                    # Utilidades y funciones
│   ├── data.ts             # Datos de productos y blog
│   ├── types.ts            # Tipos de TypeScript
│   └── utils.ts            # Funciones de utilidad
├── public/                 # Archivos estáticos
│   └── images/             # Imágenes del sitio
└── ...                     # Archivos de configuración
\`\`\`

## Instalación y Uso

### Requisitos Previos

- Node.js 18.0.0 o superior
- npm o yarn

### Pasos de Instalación

1. Clona el repositorio:
\`\`\`bash
git clone https://github.com/tu-usuario/onsen-coffee.git
cd onsen-coffee
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
# o
yarn install
\`\`\`

3. Ejecuta el servidor de desarrollo:
\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación construida
- `npm run lint`: Ejecuta el linter para verificar errores de código

## Despliegue

El proyecto está configurado para ser desplegado en Vercel:

1. Crea una cuenta en [Vercel](https://vercel.com) si aún no tienes una
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno necesarias
4. Despliega la aplicación

También puedes desplegar manualmente:

\`\`\`bash
npm run build
vercel deploy
\`\`\`

## Optimizaciones de Rendimiento

- Imágenes optimizadas con Next.js Image
- Componentes del lado del servidor cuando es posible
- Carga diferida de componentes pesados
- Optimización de fuentes con next/font
- Minificación de CSS y JavaScript en producción
- Análisis de rendimiento con Vercel Analytics

## Accesibilidad

El proyecto sigue las pautas WCAG 2.1 para garantizar la accesibilidad:

- Estructura semántica de HTML
- Contraste de colores adecuado
- Textos alternativos para imágenes
- Navegación por teclado
- Etiquetas ARIA cuando es necesario
- Mensajes de error claros en formularios

## Mejoras Futuras

- Implementación de autenticación de usuarios
- Integración con pasarelas de pago reales (Stripe, PayPal)
- Panel de administración para gestionar productos y pedidos
- Sistema de reseñas y valoraciones de productos
- Integración con CMS para gestión de contenidos
- Internacionalización para soporte de múltiples idiomas
- Implementación de PWA para experiencia móvil mejorada
- Integración con sistemas de inventario y ERP

## Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Créditos

- Diseño y desarrollo: [Tu Nombre]
- Imágenes: Unsplash
- Iconos: Lucide React
- Componentes UI: shadcn/ui

---

Desarrollado con ❤️ y ☕ por [Tu Nombre]
