# GameHub - Landing Page de Videojuegos con Next.js

Una moderna y responsiva landing page para la venta de videojuegos, construida con **Next.js**, **TypeScript**, **React** y **Tailwind CSS**.

## 🚀 Características

- ✅ Diseño moderno y responsivo
- ✅ Carrito de compras funcional
- ✅ Filtrado de juegos por género
- ✅ Notificaciones interactivas
- ✅ Sistema de promociones
- ✅ Newsletter
- ✅ Scroll suave entre secciones
- ✅ Optimizado para SEO
- ✅ TypeScript para mayor seguridad de tipos

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

## 🛠️ Instalación

1. **Clona o descarga el proyecto**

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

4. **Abre tu navegador** y ve a `http://localhost:3000`

## 📁 Estructura del Proyecto

```
├── app/
│   ├── layout.tsx          # Layout raíz
│   ├── page.tsx            # Página principal
│   ├── globals.css         # Estilos globales
│   ├── types.ts            # Tipos de TypeScript
│   └── data.ts             # Base de datos de juegos
├── components/
│   ├── Header.tsx          # Componente de navegación
│   ├── Hero.tsx            # Sección hero
│   ├── GameCard.tsx        # Tarjeta de juego
│   ├── GamesSection.tsx    # Sección de juegos
│   ├── PromoSection.tsx    # Sección de promociones
│   ├── FeaturesSection.tsx # Sección de características
│   ├── NewsletterSection.tsx # Newsletter
│   ├── CartModal.tsx       # Modal del carrito
│   ├── Footer.tsx          # Pie de página
│   └── Notification.tsx    # Notificaciones
├── tailwind.config.js      # Configuración de Tailwind
├── postcss.config.js       # Configuración de PostCSS
├── tsconfig.json           # Configuración de TypeScript
├── next.config.js          # Configuración de Next.js
└── package.json            # Dependencias del proyecto
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila el proyecto para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 🎮 Juegos Incluidos

La landing page incluye 9 juegos populares:
- Cyberpunk 2077
- Elden Ring
- The Legend of Zelda
- Hollow Knight
- Baldur's Gate 3
- Uncharted 4
- Dark Souls 3
- The Witcher 3
- Tomb Raider

## 🛒 Funcionalidades del Carrito

- Agregar juegos al carrito
- Ver cantidad de items en el carrito
- Eliminar juegos del carrito
- Ver total de compra
- Notificaciones al agregar/eliminar items

## 🎨 Colores Principales

- **Primario**: Purple (#667eea)
- **Secundario**: Purple oscuro (#764ba2)
- **Acento**: Rojo (#ff6b6b)

## 🚀 Despliegue

### En Vercel (Recomendado)

1. Sube tu proyecto a GitHub
2. Conecta tu repositorio en [Vercel](https://vercel.com)
3. Vercel detectará automáticamente que es un proyecto Next.js
4. Click en Deploy

### Otros servicios

El proyecto también se puede desplegar en:
- Netlify
- AWS
- Google Cloud
- Digital Ocean

## 📧 Contacto

Para más información o sugerencias:
- Email: info@gamehub.com
- Teléfono: +34 911 234 567
- Ubicación: Madrid, España

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Disfruta con GameHub! 🎮**
