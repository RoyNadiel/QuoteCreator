import type { AspectRatioOption, BackgroundOption } from "../types";

export const fontOptions = [
  { name: "Serif", value: "Georgia, serif" },
  { name: "Sans Serif", value: "system-ui, sans-serif" },
  { name: "Inconsolata", value: "Inconsolata, monospace" },
  { name: "Libertinus", value: "Libertinus Mono, sans-serif" },
  { name: "Montserrat Alternates", value: "Montserrat Alternates, sans-serif" },
  { name: "Fira Code", value: "Fira Code, monospace" },
  { name: "League Spartan", value: "League Spartan, serif" },
  { name: "Audiowide", value: "Audiowide, sans-serif" },
  { name: "Bellota", value: "Bellota, serif" },
  { name: "Faculty Glyphic", value: "FacultyGlyphic, serif" },
  { name: "Jetbrans Mono", value: "Jetbrans Mono, monospace" },
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Mancondo", value: "Mancondo, serif" },
  { name: "Monospace", value: "Courier New, monospace" },
  { name: "Playfair", value: "Playfair Display, serif" },
];

export const pageBackgroundOptions: BackgroundOption[] = [
  // Patterns/Special
  { name: "Lluvia", value: "rain", isDark: true },
  // Soft Vibrant Solids
  { name: "Azul Suave", value: "#60a5fa", isDark: false },
  { name: "Rojo Suave", value: "#f87171", isDark: false },
  { name: "Verde Suave", value: "#34d399", isDark: false },
  { name: "Naranja Suave", value: "#fbbf24", isDark: false },
  { name: "Violeta Suave", value: "#a78bfa", isDark: false },
  // Elegant Dark Solids
  { name: "Deep Navy", value: "#1e293b", isDark: true },
  { name: "Deep Slate", value: "#334155", isDark: true },
  { name: "Deep Forest", value: "#064e3b", isDark: true },
  { name: "Charcoal", value: "#1a1a1a", isDark: true },
  // Pastel Gradients
  { name: "Sunset Pastel", value: "linear-gradient(135deg, #fcd34d, #fda4af)", isDark: false },
  { name: "Ocean Pastel", value: "linear-gradient(135deg, #bae6fd, #e0e7ff)", isDark: false },
  { name: "Lavender Pastel", value: "linear-gradient(135deg, #e0e7ff, #f5f3ff)", isDark: false },
  { name: "Dreamy", value: "linear-gradient(135deg, #fdf2f8, #f5f3ff)", isDark: false },
  // Classic/Base
  { name: "Crema", value: "#FFF9F0", isDark: false },
  { name: "Blanco Puro", value: "#FFFFFF", isDark: false },
];

export const quoteColorOptions: BackgroundOption[] = [
  { name: "Papel", value: "#FFF9F0", isDark: false },
  { name: "Puro", value: "#FFFFFF", isDark: false },
  { name: "Rosa", value: "#FFE5E5", isDark: false },
  { name: "Cielo", value: "#E8F4F8", isDark: false },
  { name: "Menta", value: "#E8F8F5", isDark: false },
  { name: "Gris", value: "#F5F5F5", isDark: false },
  { name: "Noche", value: "#1F2937", isDark: true },
  { name: "Oscuro", value: "#111111", isDark: true },
  { name: "Carbón", value: "#2D3748", isDark: true },
  { name: "Marrón", value: "#3D2817", isDark: true },
];

export const aspectRatioOptions: AspectRatioOption[] = [
  { name: "Cuadrado (1:1)", value: "1/1", width: 800, height: 800 },
  { name: "Instagram Portrait (4:5)", value: "4/5", width: 800, height: 1000 },
  { name: "Horizontal (16:9)", value: "16/9", width: 1200, height: 675 },
  { name: "Stories (9:16)", value: "9/16", width: 607, height: 1080 },
  { name: "Vertical (3:4)", value: "3/4", width: 800, height: 1067 },
];
