import { pageBackgroundOptions } from "../constants/options";

// Mapa de clases Tailwind base de mesh → color hex equivalente
const meshBaseToHex: Record<string, string> = {
  "bg-slate-950": "#020617",
  "bg-gray-950": "#030712",
  "bg-green-950": "#052e16",
  "bg-rose-50": "#fff1f2",
  "bg-orange-50": "#fff7ed",
};

/** Determina si un color hex es oscuro usando luminancia relativa */
const isHexDark = (hex: string): boolean => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 0.5;
};

/** Devuelve el color de texto adecuado para cualquier fondo */
export const getQuoteTextColor = (backgroundColor: string): string => {
  // Hex plano: usar luminancia
  if (backgroundColor.startsWith("#") && backgroundColor.length >= 7) {
    return isHexDark(backgroundColor) ? "#FFFFFF" : "#1F2937";
  }
  // Gradiente u otro valor CSS: buscar en las opciones para saber si es oscuro
  const option = pageBackgroundOptions.find((opt) => opt.value === backgroundColor);
  if (option) {
    return option.isDark ? "#FFFFFF" : "#1F2937";
  }
  return "#1F2937";
};

/** Resuelve el valor CSS de fondo del escrito a partir del pageBg */
export const getQuoteBackgroundColor = (pageBg: string): string => {
  if (pageBg === "rain") return "#0f172a";

  const option = pageBackgroundOptions.find((opt) => opt.value === pageBg);

  // Mesh: usar el hex del color base (estático para la imagen)
  if (option?.meshColors) {
    return meshBaseToHex[option.meshColors.base] ?? "#0f172a";
  }

  // Gradiente CSS: devolver el string completo
  if (pageBg.startsWith("linear-gradient")) {
    return pageBg;
  }

  // Color sólido hex directo
  if (pageBg.startsWith("#")) return pageBg;

  return "#ffffff";
};

export const getPageTextColor = (pageBg: string): string => {
  if (pageBg === "rain") return "#e2e8f0"; // slate-200
  const option = pageBackgroundOptions.find((opt) => opt.value === pageBg);
  if (option) {
    return option.isDark ? "#e2e8f0" : "#1e293b";
  }
  return "#1e293b";
};
