# 🎨 QuoteCreator

Una aplicación web moderna y elegante para crear y descargar imágenes de citas personalizadas.

## ✨ Características

- **Diseño Minimalista**: Interfaz limpia con efectos de glassmorphism, sombras profundas y decoraciones tipográficas.
- **Temas de Fondo Dinámicos**: El fondo seleccionado se aplica tanto al lienzo de edición como a la imagen descargada.
  - 🌧️ Efecto de lluvia animado.
  - 🎨 Mesh gradients animados (Aurora Night, Emerald Deep, Rose Glow, Soft Sunshine, Classic Mesh).
  - 🌈 Gradientes CSS suaves (Sunset Pastel, Ocean Pastel, Lavender, Dreamy).
  - 🎨 Colores sólidos (tonos oscuros elegantes y claros clásicos).
- **Personalización Completa**:
  - Selector de fuentes dinámico con carga asíncrona desde Google Fonts y fuentes locales.
  - Ajuste manual de tamaño de fuente y alineación de texto (izquierda, centro, derecha).
  - Campo de autor con fuente independiente.
  - Tamaño de fuente sugerido automáticamente al cambiar el formato de la imagen.
- **Formatos de Exportación**:
  - 🟥 Cuadrado (1:1) — 800×800 px
  - 📱 Instagram Portrait (4:5) — 800×1000 px
  - 🖥️ Horizontal (16:9) — 1200×675 px
  - 📲 Stories (9:16) — 607×1080 px
  - 📄 Vertical (3:4) — 800×1067 px
- **Previsualización en Tiempo Real**: Modal con animación de entrada suave para revisar la imagen antes de descargar.
- **Descarga Fiel al Original**: La imagen descargada replica exactamente el fondo, el texto y las proporciones del lienzo, con escalado proporcional de tipografía y padding.

## 🚀 Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 + TypeScript | UI y lógica |
| Vite | Bundler y dev server |
| Tailwind CSS 4.1.x | Estilos utilitarios |
| Lucide React | Iconografía |
| html2canvas | Captura y exportación de imagen |

## 🛠️ Instalación y Desarrollo

1. Clona el repositorio:

```bash
git clone https://github.com/RoyNadiel/QuoteCreator.git
```

2. Instala las dependencias:

```bash
pnpm install
```

3. Inicia el servidor de desarrollo:

```bash
pnpm dev
```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── AuthorFooter.tsx     # Pie de autor en lienzo y preview
│   ├── Canvas.tsx           # Lienzo editor + modal de preview/descarga
│   ├── DecorativeSidebars.tsx
│   ├── FontPicker.tsx
│   ├── MeshBackground.tsx   # Fondos mesh animados
│   ├── RainBackground.tsx   # Fondo de lluvia animada
│   └── Sidebar.tsx          # Panel de opciones
├── constants/
│   └── options.ts           # Opciones de fuentes, fondos y formatos
├── types/
│   └── index.ts
└── utils/
    ├── colors.ts            # Lógica de color de texto/fondo adaptativo
    └── fonts.ts             # Carga dinámica de Google Fonts
```
