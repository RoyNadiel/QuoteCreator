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

  // Mesh Dinámicos (Animated)
  {
    name: "Classic Mesh",
    value: "mesh-classic",
    isDark: true,
    meshColors: {
      blob1: "bg-blue-600/30",
      blob2: "bg-purple-600/25",
      blob3: "bg-indigo-800/20",
      blob4: "bg-sky-500/20",
      base: "bg-slate-950",
    },
  },
  {
    name: "Aurora Night",
    value: "mesh-dark-purple",
    isDark: true,
    meshColors: {
      blob1: "bg-emerald-500/20",
      blob2: "bg-indigo-600/30",
      blob3: "bg-blue-900/40",
      blob4: "bg-teal-400/10",
      base: "bg-gray-950",
    },
  },
  {
    name: "Emerald Deep",
    value: "mesh-dark-green",
    isDark: true,
    meshColors: {
      blob1: "bg-green-600/20",
      blob2: "bg-emerald-700/25",
      blob3: "bg-teal-800/30",
      blob4: "bg-lime-500/10",
      base: "bg-green-950",
    },
  },
  {
    name: "Rose Glow",
    value: "mesh-pastel-pink",
    isDark: false,
    meshColors: {
      blob1: "bg-rose-200/50",
      blob2: "bg-pink-100/40",
      blob3: "bg-fuchsia-100/30",
      blob4: "bg-white/40",
      base: "bg-rose-50",
    },
  },
  {
    name: "Soft Sunshine",
    value: "mesh-pastel-yellow",
    isDark: false,
    meshColors: {
      blob1: "bg-amber-100/60",
      blob2: "bg-yellow-50/50",
      blob3: "bg-orange-100/30",
      blob4: "bg-white/60",
      base: "bg-orange-50",
    },
  },

  // Pastel Gradients
  {
    name: "Sunset Pastel",
    value: "linear-gradient(135deg, #fcd34d, #fda4af)",
    isDark: false,
  },
  {
    name: "Ocean Pastel",
    value: "linear-gradient(135deg, #bae6fd, #e0e7ff)",
    isDark: false,
  },
  {
    name: "Lavender Pastel",
    value: "linear-gradient(135deg, #e0e7ff, #f5f3ff)",
    isDark: false,
  },
  {
    name: "Dreamy",
    value: "linear-gradient(135deg, #fdf2f8, #f5f3ff)",
    isDark: false,
  },

  // Elegant Dark
  { name: "Deep Navy", value: "#1e293b", isDark: true },
  { name: "Deep Slate", value: "#334155", isDark: true },
  { name: "Deep Forest", value: "#064e3b", isDark: true },
  { name: "Charcoal", value: "#1a1a1a", isDark: true },

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
