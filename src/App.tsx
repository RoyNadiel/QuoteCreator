import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import html2canvas from "html2canvas";
import { loadGoogleFont } from "./utils/fonts";
import { RainBackground } from "./components/RainBackground";
import { MeshBackground } from "./components/MeshBackground";
import { Sidebar } from "./components/Sidebar";
import { aspectRatioOptions, pageBackgroundOptions } from "./constants/options";
import { getQuoteTextColor, getPageTextColor } from "./utils/colors";
import type { TextAlign } from "./types";
import Canvas from "./components/Canvas";

// --- Componente Principal ---

function App() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [quoteBackgroundColor, setQuoteBackgroundColor] = useState("#FFF9F0");
  const [quoteFontFamily, setQuoteFontFamily] = useState("Serif");
  const [autorFontFamily, setAutorFontFamily] = useState("Serif");
  const [fontSize, setFontSize] = useState(24);
  const [textAlign, setTextAlign] = useState<TextAlign>("center");
  const [aspectRatio, setAspectRatio] = useState(aspectRatioOptions[0]);
  const [pageBg, setPageBg] = useState("rain");
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cargar fuentes si son de Google al cambiar
  useEffect(() => {
    loadGoogleFont(quoteFontFamily);
  }, [quoteFontFamily]);

  useEffect(() => {
    loadGoogleFont(autorFontFamily);
  }, [autorFontFamily]);

  const handleDownload = async () => {
    if (!text.trim()) {
      console.log("No hay texto para descargar");
      return;
    }

    console.log("Iniciando descarga...");
    setIsDownloading(true);
    setShowPreview(true);

    try {
      // Esperar a que el DOM se actualice y el elemento se renderice
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (!previewRef.current) {
        console.error("previewRef.current (Elemento de Captura) es null");
        return;
      }

      console.log("Capturando con html2canvas...");

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null, // Permitir transparencia para capturar la sombra correctamente sobre el fondo
        scale: 4, // Alta resolución requerida para calidad premium
        logging: true,
        useCORS: true,
        allowTaint: true,
        // No limitamos width/height aquí para que capture todo el contenedor (incluyendo el padding de la sombra)
        onclone: (clonedDoc) => {
          const element = clonedDoc.getElementById("download-capture");
          if (element) {
            // Dimensiones fijas para el elemento interno
            element.style.height = `${aspectRatio.height}px`;
            element.style.width = `${aspectRatio.width}px`;
            element.style.maxWidth = "none";
            element.style.maxHeight = "none";
            
            // Forzar sombra visible en la captura
            element.style.boxShadow = "0 40px 100px -20px rgba(0, 0, 0, 0.4)";
            
            // Asegurar que el padre del clon tenga espacio y fondo limpio
            if (element.parentElement) {
              element.parentElement.style.padding = "100px";
              element.parentElement.style.display = "flex";
              element.parentElement.style.justifyContent = "center";
              element.parentElement.style.alignItems = "center";
              element.parentElement.style.backgroundColor = "transparent";
            }
          }
        },
      });

      console.log("Canvas creado, generando imagen...");
      const link = document.createElement("a");
      link.download = `Escrito-${author || "sin-autor"}-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      console.log("Descarga iniciada");
    } catch (error) {
      console.error("Error al descargar:", error);
    } finally {
      // Esperar un momento antes de ocultar la preview
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowPreview(false);
      setIsDownloading(false);
    }
  };

  const currentBgOption = pageBackgroundOptions.find(
    (opt) => opt.value === pageBg,
  );
  const isMesh = !!currentBgOption?.meshColors;

  const formattedTime = currentTime.toLocaleTimeString([], {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const pageTextColor = getPageTextColor(pageBg);
  const quoteTextColor = getQuoteTextColor(quoteBackgroundColor);

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden transition-colors duration-500"
      style={{
        background: pageBg === "rain" || isMesh ? "#0f172a" : pageBg,
      }}
    >
      {pageBg === "rain" && <RainBackground />}
      {isMesh && <MeshBackground colors={currentBgOption.meshColors} />}

      {/* Boton de Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`fixed top-4 left-4 z-50 p-2 hover:shadow-md rounded-lg transition-all ${
          pageBg === "rain" || getPageTextColor(pageBg) === "#e2e8f0"
            ? "hover:bg-slate-700/80 text-white/70 hover:text-white"
            : "hover:bg-black/10 text-slate-700 hover:text-black"
        }`}
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <Sidebar
        menuOpen={menuOpen}
        pageBg={pageBg}
        setPageBg={setPageBg}
        author={author}
        setAuthor={setAuthor}
        quoteFontFamily={quoteFontFamily}
        setQuoteFontFamily={setQuoteFontFamily}
        autorFontFamilty={autorFontFamily}
        setAutorFontFamily={setAutorFontFamily}
        fontSize={fontSize}
        setFontSize={setFontSize}
        quoteBackgroundColor={quoteBackgroundColor}
        setQuoteBackgroundColor={setQuoteBackgroundColor}
        textAlign={textAlign}
        setTextAlign={setTextAlign}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        text={text}
        isDownloading={isDownloading}
        handleDownload={handleDownload}
        setShowPreview={setShowPreview}
      />

      {menuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <Canvas
        text={text}
        setText={setText}
        author={author}
        quoteFontFamily={quoteFontFamily}
        autorFontFamily={autorFontFamily}
        fontSize={fontSize}
        textAlign={textAlign}
        aspectRatio={aspectRatio}
        pageTextColor={pageTextColor}
        quoteBackgroundColor={quoteBackgroundColor}
        formattedTime={formattedTime}
        showPreview={showPreview}
        previewRef={previewRef}
        setShowPreview={setShowPreview}
        quoteTextColor={quoteTextColor}
        isDownloading={isDownloading}
      />
    </div>
  );
}

export default App;
