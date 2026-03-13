import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import html2canvas from "html2canvas";
import { loadGoogleFont } from "./utils/fonts";
import { RainBackground } from "./components/RainBackground";
import { MeshBackground } from "./components/MeshBackground";
import { Sidebar } from "./components/Sidebar";
import { aspectRatioOptions, pageBackgroundOptions } from "./constants/options";
import {
  getQuoteTextColor,
  getPageTextColor,
  getQuoteBackgroundColor,
} from "./utils/colors";
import type { TextAlign } from "./types";
import Canvas from "./components/Canvas";

// --- Componente Principal ---

function App() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [quoteFontFamily, setQuoteFontFamily] = useState("Serif");
  const [autorFontFamily, setAutorFontFamily] = useState("Serif");
  const [fontSize, setFontSize] = useState(20);
  const [textAlign, setTextAlign] = useState<TextAlign>("center");
  const [aspectRatio, setAspectRatio] = useState(aspectRatioOptions[0]);
  const [pageBg, setPageBg] = useState(
    "linear-gradient(135deg, #fdf2f8, #f5f3ff)",
  );
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

      const isGradient = quoteBackgroundColor.startsWith("linear-gradient");

      // Tamaño real del elemento en pantalla antes de clonar
      const rect = previewRef.current.getBoundingClientRect();
      const scaleX = aspectRatio.width / rect.width;
      const scaleY = aspectRatio.height / rect.height;

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: isGradient ? null : quoteBackgroundColor,
        logging: false,
        useCORS: true,
        allowTaint: true,
        scale: 1,
        scrollX: 0,
        scrollY: 0,
        onclone: (_clonedDoc, element) => {
          // Forzar el elemento clonado al tamaño exacto de la imagen final
          element.style.position = "fixed";
          element.style.top = "0";
          element.style.left = "0";
          element.style.width = `${aspectRatio.width}px`;
          element.style.height = `${aspectRatio.height}px`;
          element.style.maxWidth = "none";
          element.style.maxHeight = "none";
          element.style.aspectRatio = "auto";
          element.style.border = "none";
          element.style.boxSizing = "border-box";
          element.style.display = "flex";
          element.style.flexDirection = "column";
          element.style.background = quoteBackgroundColor;
          element.style.animation = "none";
          element.style.transform = "none";

          // Escalar padding del contenedor
          const currentPadding =
            parseFloat(getComputedStyle(element).paddingTop) || 48;
          const scaledPadding = Math.round(
            currentPadding * Math.min(scaleX, scaleY),
          );
          element.style.padding = `${scaledPadding}px`;

          // Escalar font-size y line-height de todos los descendientes
          const allChildren = element.querySelectorAll("*");
          allChildren.forEach((child) => {
            const el = child as HTMLElement;
            const computed = getComputedStyle(el);
            const fs = parseFloat(computed.fontSize);
            if (fs) el.style.fontSize = `${fs * Math.min(scaleX, scaleY)}px`;
          });
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
  const quoteBackgroundColor = getQuoteBackgroundColor(pageBg);
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
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-[2px] sm:bg-transparent sm:backdrop-blur-none transition-all duration-300"
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
