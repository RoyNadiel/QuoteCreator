import { useState, useRef, useEffect, useMemo } from "react";
import { Menu, X } from "lucide-react";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
import JSZip from "jszip";
import { loadGoogleFont } from "./design-assets/utils/fonts";
import { RainBackground } from "./design-assets/components/RainBackground";
import { MeshBackground } from "./design-assets/components/MeshBackground";
import { Sidebar } from "./quote-editor/components/Sidebar";
import {
  aspectRatioOptions,
  pageBackgroundOptions,
} from "./quote-editor/constants/options";
import {
  getContrastColor,
  getQuoteBackgroundColor,
} from "./quote-editor/utils/colors";
import type { QuotePage } from "./quote-editor/types";
import Canvas from "./quote-editor/components/Canvas";
import { PageNavigation } from "./quote-editor/components/PageNavigation";

// --- Helper Func ---
const createNewPage = (): QuotePage => ({
  id: uuidv4(),
  text: "",
  author: "",
  quoteFontFamily: "Inconsolata",
  autorFontFamily: "Bellota",
  textHorizontalAlign: "center",
  textVerticalAlign: "top",
});

// --- Componente Principal ---

function App() {
  const [pages, setPages] = useState<QuotePage[]>([createNewPage()]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentPage = useMemo(
    () => pages[currentPageIndex] || pages[0],
    [pages, currentPageIndex],
  );

  const [fontSize, setFontSize] = useState(20);
  const [aspectRatio, setAspectRatio] = useState(aspectRatioOptions[0]);
  const [pageBg, setPageBg] = useState("rain");
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOverflowing, setIsOverflowing] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const pageTextColor = getContrastColor(pageBg, "ui");
  const quoteBackgroundColor = getQuoteBackgroundColor(pageBg);
  const quoteTextColor = getContrastColor(quoteBackgroundColor);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cargar fuentes si son de Google al cambiar
  useEffect(() => {
    loadGoogleFont(currentPage.quoteFontFamily);
  }, [currentPage.quoteFontFamily]);

  useEffect(() => {
    loadGoogleFont(currentPage.autorFontFamily);
  }, [currentPage.autorFontFamily]);

  // Handlers de multipáginas
  const updateCurrentPage = (updates: Partial<QuotePage>) => {
    setPages((prevPages) => {
      const newPages = [...prevPages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        ...updates,
      };
      return newPages;
    });
  };

  const handlePageChange = (newIndex: number) => {
    setDirection(newIndex > currentPageIndex ? 1 : -1);
    setCurrentPageIndex(newIndex);
  };

  const addNewPage = () => {
    if (pages.length >= 10) return;
    setDirection(1);
    setPages((prev) => [...prev, createNewPage()]);
    setCurrentPageIndex(pages.length);
  };

  const deletePage = (index: number) => {
    if (pages.length <= 1) return; // No permitir borrar la última página

    setDirection(-1);
    setPages((prev) => prev.filter((_, i) => i !== index));
    if (currentPageIndex >= index && currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleReorder = (newPages: QuotePage[]) => {
    const currentId = pages[currentPageIndex].id;
    setPages(newPages);
    const newIndex = newPages.findIndex((p) => p.id === currentId);
    if (newIndex !== -1 && newIndex !== currentPageIndex) {
      setCurrentPageIndex(newIndex);
    }
  };

  const handleDownload = async () => {
    if (!currentPage.text.trim()) {
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

      // Usamos offsetWidth/Height para ignorar transformaciones si la animación sigue corriendo.
      const width = previewRef.current.offsetWidth;
      const height = previewRef.current.offsetHeight;
      // Forzamos un scale de 2 o 3 para asegurar alta resolución independientemente del dispositivo
      const scale = 3;

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: isGradient ? null : quoteBackgroundColor,
        logging: false,
        useCORS: true,
        allowTaint: true,
        scale: scale,
        width: width,
        height: height,
        scrollX: 0,
        scrollY: 0,
        imageTimeout: 0, // Esperar indefinidamente a que carguen las imágenes
        onclone: (_clonedDoc, element) => {
          // Mejorar el renderizado de fuentes en el clon
          element.style.setProperty("-webkit-font-smoothing", "antialiased");
          element.style.setProperty("-moz-osx-font-smoothing", "grayscale");
          element.style.textRendering = "optimizeLegibility";

          // Posicionamos el clon en (0,0) sin modificar su altura.
          // Dejar que el CSS (height: 80vh) compute el alto naturalmente
          // evita que el flex layout desplace el AuthorFooter fuera del área capturada.
          // html2canvas usa `height: rect.height` para saber cuánto capturar.
          element.style.position = "fixed";
          element.style.top = "0";
          element.style.left = "0";
          element.style.width = `${width}px`;
          element.style.height = `${height}px`;
          // No sobreescribimos height — el CSS lo maneja igual que en pantalla
          element.style.maxWidth = "none";
          element.style.maxHeight = "none";
          element.style.aspectRatio = "auto";
          element.style.borderColor = "transparent"; // Mantenemos el borde pero invisible para evitar cambios de layout
          element.style.background = quoteBackgroundColor;
          element.style.animation = "none";
          element.style.transform = "none";
        },
      });

      console.log("Canvas creado, generando imagen...");
      const link = document.createElement("a");
      const date = new Date();
      link.download = `Escrito-${currentPage.author || "autor-desconocido"}-${Intl.DateTimeFormat("es-VE", { dateStyle: "medium", timeStyle: "medium" }).format(date)}.png`;
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

  const handleDownloadAll = async () => {
    if (pages.length === 0 || !pages.some((p) => p.text.trim())) {
      console.log("No hay texto para descargar");
      return;
    }

    console.log("Iniciando descarga de todas las páginas...");
    setIsDownloading(true);
    setShowPreview(true);

    try {
      const zip = new JSZip();
      const originalIndex = currentPageIndex;
      const scale = 3;

      for (let i = 0; i < pages.length; i++) {
        if (!pages[i].text.trim()) continue;
        // Change to the current page to render it
        setCurrentPageIndex(i);
        // Wait for React to render the new page content and DOM to update
        await new Promise((resolve) => setTimeout(resolve, 700));

        if (!previewRef.current) continue;

        const width = previewRef.current.offsetWidth;
        const height = previewRef.current.offsetHeight;

        const canvas = await html2canvas(previewRef.current, {
          backgroundColor: quoteBackgroundColor.startsWith("linear-gradient")
            ? null
            : quoteBackgroundColor,
          logging: false,
          useCORS: true,
          allowTaint: true,
          scale: scale,
          width: width,
          height: height,
          scrollX: 0,
          scrollY: 0,
          imageTimeout: 0,
          onclone: (_clonedDoc, element) => {
            element.style.setProperty("-webkit-font-smoothing", "antialiased");
            element.style.setProperty("-moz-osx-font-smoothing", "grayscale");
            element.style.textRendering = "optimizeLegibility";
            element.style.position = "fixed";
            element.style.top = "0";
            element.style.left = "0";
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;
            element.style.maxWidth = "none";
            element.style.maxHeight = "none";
            element.style.aspectRatio = "auto";
            element.style.borderColor = "transparent";
            element.style.background = quoteBackgroundColor;
            element.style.animation = "none";
            element.style.transform = "none";
          },
        });

        // Convert canvas to blob and add to ZIP
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/png"),
        );
        if (blob) {
          const numberStr = (i + 1).toString().padStart(2, "0");
          zip.file(`Escrito-${numberStr}.png`, blob);
        }
      }

      console.log("Generando archivo ZIP...");
      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      const date = new Date();
      link.download = `Escritos-${Intl.DateTimeFormat("es-VE", { dateStyle: "medium" }).format(date)}.zip`;
      link.href = URL.createObjectURL(content);
      link.click();
      URL.revokeObjectURL(link.href);

      // Restore original page
      setCurrentPageIndex(originalIndex);
    } catch (error) {
      console.error("Error al descargar ZIP:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowPreview(false);
      setIsDownloading(false);
    }
  };

  const currentBgOption = pageBackgroundOptions.find(
    (opt) => opt.value === pageBg,
  );
  const isMesh = !!currentBgOption?.meshColors;

  const formattedTime = Intl.DateTimeFormat("es-VE", {
    dateStyle: "medium",
  }).format(currentTime);

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
          pageBg === "rain" || getContrastColor(pageBg, "ui") === "#e2e8f0"
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
        currentPage={currentPage}
        updatePage={updateCurrentPage}
        fontSize={fontSize}
        setFontSize={setFontSize}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        isDownloading={isDownloading}
        handleDownload={handleDownload}
        handleDownloadAll={handleDownloadAll}
        totalPages={pages.length}
        setShowPreview={setShowPreview}
        isOverflowing={isOverflowing}
      />

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-[2px] sm:bg-transparent sm:backdrop-blur-none transition-all duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <Canvas
        currentPage={currentPage}
        updatePage={updateCurrentPage}
        fontSize={fontSize}
        aspectRatio={aspectRatio}
        direction={direction}
        pageTextColor={pageTextColor}
        quoteBackgroundColor={quoteBackgroundColor}
        formattedTime={formattedTime}
        showPreview={showPreview}
        previewRef={previewRef}
        setShowPreview={setShowPreview}
        quoteTextColor={quoteTextColor}
        isDownloading={isDownloading}
        isOverflowing={isOverflowing}
        setIsOverflowing={setIsOverflowing}
      />

      <PageNavigation
        pages={pages}
        currentPageIndex={currentPageIndex}
        onPageChange={handlePageChange}
        onAddPage={addNewPage}
        onDeletePage={deletePage}
        onReorder={handleReorder}
        pageTextColor={pageTextColor}
      />
    </div>
  );
}

export default App;
