import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import html2canvas from "html2canvas";
import { loadGoogleFont } from "./utils/fonts";

import { RainBackground } from "./components/RainBackground";
import { Sidebar } from "./components/Sidebar";
import { aspectRatioOptions } from "./constants/options";
import { getTextColor, getPageTextColor } from "./utils/colors";
import type { TextAlign } from "./types";

function App() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [quoteBackgroundColor, setQuoteBackgroundColor] = useState("#FFF9F0");
  const [quoteFontFamily, setQuoteFontFamily] = useState("serif");
  const [autorFontFamily, setAutorFontFamily] = useState("serif");
  const [fontSize, setFontSize] = useState(24);
  const [textAlign, setTextAlign] = useState<TextAlign>("center");
  const [aspectRatio, setAspectRatio] = useState(aspectRatioOptions[0]);
  const [pageBg, setPageBg] = useState("rain");
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
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

      if (!contentRef.current) {
        console.error("contentRef.current (Elemento de captura) es null");
        return;
      }

      console.log("Capturando con html2canvas...");
      const canvas = await html2canvas(contentRef.current, {
        backgroundColor: quoteBackgroundColor,
        scale: 4, // Mayor resolución para mejor calidad
        logging: true,
        useCORS: true,
        onclone: (clonedDoc) => {
          // Obtener el elemento clonado y remover las restricciones de tamaño
          // para que siempre se renderice en su tamaño real completo
          const element = clonedDoc.getElementById("download-capture");
          if (element) {
            element.style.maxWidth = "none";
            element.style.maxHeight = "none";
            // Asegurar que el elemento tenga el ancho/alto completo configurado
            element.style.width = `${aspectRatio.width}px`;
            element.style.height = `${aspectRatio.height}px`;
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowPreview(false);
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: pageBg === "rain" ? "#0f172a" : pageBg,
      }}
    >
      {pageBg === "rain" && <RainBackground />}

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
      />

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-4xl flex flex-col items-center">
          <textarea
            name="Quote"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comienza a escribir..."
            className="w-full h-[60vh] px-6 py-8 border-none outline-none resize-none leading-relaxed bg-transparent placeholder:text-slate-500/60 z-20 transition-colors duration-300"
            style={{
              fontFamily: quoteFontFamily,
              fontSize: `${fontSize}px`,
              textAlign: textAlign as any,
              color: getPageTextColor(pageBg),
            }}
          />

          {author && (
            <div
              className="w-full max-w-[80%] pt-4 border-t opacity-80 z-20 transition-colors duration-300 mb-20"
              style={{
                borderColor: getPageTextColor(pageBg),
                color: getPageTextColor(pageBg),
              }}
            >
              <p
                className="italic ml-[80%]"
                style={{
                  fontFamily: autorFontFamily,
                  fontSize: `${Math.max(fontSize * 0.8, 14)}px`,
                  textAlign: textAlign as any,
                }}
              >
                — {author}
              </p>
            </div>
          )}

          {showPreview && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn p-4">
              <div
                id="download-capture"
                ref={contentRef}
                className="p-12 rounded-xl shadow-2xl animate-scaleIn flex flex-col justify-center"
                style={{
                  backgroundColor: quoteBackgroundColor,
                  color: getTextColor(quoteBackgroundColor),
                  width: `${aspectRatio.width}px`,
                  height: `${aspectRatio.height}px`,
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                }}
              >
                <div
                  className="w-full whitespace-pre-wrap wrap-break-words leading-relaxed"
                  style={{
                    fontFamily: quoteFontFamily,
                    fontSize: `${fontSize}px`,
                    textAlign: textAlign as any,
                  }}
                >
                  {text}
                </div>
                {author && (
                  <div
                    className="mt-8 w-full pt-4 border-t"
                    style={{ borderColor: getTextColor(quoteBackgroundColor) }}
                  >
                    <p
                      className="italic ml-[80%]"
                      style={{
                        fontFamily: autorFontFamily,
                        fontSize: `${Math.max(fontSize * 0.9, 12)}px`,
                        textAlign: textAlign as any,
                      }}
                    >
                      — {author}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
