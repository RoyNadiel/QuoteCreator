import { pageBackgroundOptions } from '../constants/options';

// Mapa de clases Tailwind base de mesh → color hex equivalente
const meshBaseToHex: Record<string, string> = {
  'bg-slate-950': '#020617',
  'bg-gray-950': '#030712',
  'bg-green-950': '#052e16',
  'bg-rose-50': '#fff1f2',
  'bg-orange-50': '#fff7ed',
};

/** Determina si un color hex es oscuro usando luminancia relativa */
const isHexDark = (hex: string): boolean => {
  if (hex.length > 9) {
    console.error('Proporcione un valor HEX valido');
    return false;
  }
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 0.5;
};

type Target = 'content' | 'ui';

/** Devuelve el color de texto contrastante para cualquier fondo (página o recorte) */
export const getContrastColor = (
  backgroundColor: string,
  target: Target = 'content'
): string => {
  let isDark = false;

  // 1. Caso especial: Lluvia
  if (backgroundColor === 'rain') {
    isDark = true;
  }
  // 2. Hex plano: usar luminancia
  else if (backgroundColor.startsWith('#') && backgroundColor.length >= 7) {
    isDark = isHexDark(backgroundColor);
  }
  // 3. Gradiente u otro valor CSS: buscar en las opciones si es oscuro
  else {
    const option = pageBackgroundOptions.find(
      (opt) => opt.value === backgroundColor
    );
    isDark = option?.isDark ?? false;
  }

  // Colores resultantes según el objetivo
  if (target === 'ui') {
    return isDark ? '#e2e8f0' : '#1e293b'; // Colores suavizados para la UI lateral
  }

  return isDark ? '#FFFFFF' : '#1F2937'; // Colores sólidos para la cita/imagen
};

/** Resuelve el valor CSS de fondo del escrito a partir del pageBg */
export const getQuoteBackgroundColor = (pageBg: string): string => {
  if (pageBg === 'rain') return '#0f172a';

  const option = pageBackgroundOptions.find((opt) => opt.value === pageBg);

  // Mesh: usar el hex del color base (estático para la imagen)
  if (option?.meshColors) {
    return meshBaseToHex[option.meshColors.base] ?? '#0f172a';
  }

  // Gradiente CSS o hex directo
  if (pageBg.startsWith('linear-gradient') || pageBg.startsWith('#')) {
    return pageBg;
  }

  return '#ffffff';
};
