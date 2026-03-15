/**
 * Utilitario para cargar fuentes de Google de forma dinámica.
 */

const loadedFonts = new Set<string>();

/**
 * Carga una fuente de Google inyectando un tag <link> en el head.
 */
export function loadGoogleFont(fontFamily: string) {
  if (loadedFonts.has(fontFamily)) return;

  const fontName = fontFamily.replace(/\s+/g, "+");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${fontName}:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,700&display=swap`;

  document.head.appendChild(link);
  loadedFonts.add(fontFamily);
}

/**
 * Lista de algunas de las fuentes más populares de Google como fallback o inicio.
 */
export const popularGoogleFonts = [
  "Montserrat",
  "Roboto",
  "Open Sans",
  "Lato",
  "Roboto Condensed",
  "Source Code Pro",
  "Oswald",
  "Raleway",
  "Merriweather",
  "PT Sans",
  "Noto Sans",
  "Nunito",
  "Ubuntu",
  "Poppins",
  "Lora",
  "Quicksand",
  "Pacifico",
  "Dancing Script",
  "Caveat",
  "Permanent Marker",
  "Shadows Into Light",
  "Abril Fatface",
  "Righteous",
  "Lobster",
  "Comfortaa",
  "Amatic SC",
  "Indie Flower",
  "Bebas Neue",
  "Josefin Sans",
  "Fira Sans",
  "Cabin",
  "Arvo",
  "Archivo",
  "Kanit",
  "Mulish",
  "Outfit",
  "Space Grotesk",
  "Syne",
  "Unbounded",
];
