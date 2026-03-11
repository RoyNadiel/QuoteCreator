import type { AspectRatioOption } from "../types";

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

export const colorOptions = [
  { name: "Crema", value: "#FFF9F0" },
  { name: "Rosa Suave", value: "#FFE5E5" },
  { name: "Azul Cielo", value: "#E8F4F8" },
  { name: "Verde Menta", value: "#E8F8F5" },
  { name: "Gris Claro", value: "#F5F5F5" },
  { name: "Amarillo Pastel", value: "#FFF9E6" },
  { name: "Lavanda", value: "#F3F0FF" },
  { name: "Melocotón", value: "#FFEEE0" },
  { name: "Negro", value: "#1F2937" },
  { name: "Gris Oscuro", value: "#374151" },
  { name: "Azul Oscuro", value: "#1E3A5F" },
  { name: "Verde Oscuro", value: "#1F3A34" },
  { name: "Marrón Oscuro", value: "#3D2817" },
  { name: "Carbón", value: "#2D3748" },
  { name: "Oscuro", value: "#111111" },
];

export const aspectRatioOptions: AspectRatioOption[] = [
  { name: "Cuadrado (1:1)", value: "1/1", width: 800, height: 800 },
  { name: "Instagram Portrait (4:5)", value: "4/5", width: 800, height: 1000 },
  { name: "Horizontal (16:9)", value: "16/9", width: 1200, height: 675 },
  { name: "Stories (9:16)", value: "9/16", width: 607, height: 1080 },
  { name: "Vertical (3:4)", value: "3/4", width: 800, height: 1067 },
];
