import { DecorativeSidebars } from "./DecorativeSidebars";
import { AuthorFooter } from "./AuthorFooter";
import { X } from "lucide-react";
import type { AspectRatioOption } from "../types";

interface CanvasProps {
  text: string;
  setText: (text: string) => void;
  author: string;
  quoteFontFamily: string;
  autorFontFamily: string;
  fontSize: number;
  textAlign: string;
  aspectRatio: AspectRatioOption;
  pageTextColor: string;
  quoteBackgroundColor: string;
  formattedTime: string;
  showPreview: boolean;
  previewRef?: React.Ref<HTMLDivElement>;
  setShowPreview: (showPreview: boolean) => void;
  quoteTextColor: string;
  isDownloading: boolean;
}

// --- Subcomponente unificado para la Tarjeta de Cita ---
const QuoteCard = ({
  id,
  innerRef,
  isEditor,
  text,
  setText,
  author,
  quoteFontFamily,
  autorFontFamily,
  fontSize,
  textAlign,
  aspectRatio,
  quoteBackgroundColor,
  quoteTextColor,
  formattedTime,
  borderColor,
  isCapture = false,
}: any) => {
  return (
    <div
      id={id}
      ref={innerRef}
      className={`relative flex flex-col items-center border-2 z-50 p-12 rounded-xl transition-all duration-300 ${isCapture ? "" : "shadow-2xl"}`}
      style={{
        borderColor,
        backgroundColor: quoteBackgroundColor,
        color: quoteTextColor,
        aspectRatio: aspectRatio.value,
        height: isCapture ? undefined : "80vh",
        maxHeight: isCapture ? undefined : "80vh",
        maxWidth: "90vw",
        boxShadow: isCapture ? "0 25px 50px -12px rgba(0, 0, 0, 0.4)" : undefined,
      }}
    >
      {isEditor ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comienza a escribir..."
          className="w-full flex-1 border-none outline-none resize-none leading-relaxed bg-transparent placeholder:text-slate-500/80 z-20 transition-colors duration-300 scrollbar-hide"
          style={{
            fontFamily: quoteFontFamily,
            fontSize: `${fontSize}px`,
            textAlign: textAlign as any,
          }}
        />
      ) : (
        <div
          className="w-full flex-1 whitespace-pre-wrap wrap-break-words leading-relaxed overflow-hidden"
          style={{
            fontFamily: quoteFontFamily,
            fontSize: `${fontSize}px`,
            textAlign: textAlign as any,
          }}
        >
          {text}
        </div>
      )}

      <AuthorFooter
        author={author}
        autorFontFamily={autorFontFamily}
        fontSize={fontSize}
        timeString={formattedTime}
        color={quoteTextColor}
        borderColor={borderColor}
      />
    </div>
  );
};

function Canvas({
  text,
  setText,
  author,
  quoteFontFamily,
  autorFontFamily,
  fontSize,
  textAlign,
  aspectRatio,
  pageTextColor,
  quoteBackgroundColor,
  formattedTime,
  showPreview,
  previewRef,
  setShowPreview,
  quoteTextColor,
  isDownloading,
}: CanvasProps) {
  const commonProps = {
    text,
    setText,
    author,
    quoteFontFamily,
    autorFontFamily,
    fontSize,
    textAlign,
    aspectRatio,
    quoteBackgroundColor,
    quoteTextColor,
    formattedTime,
    borderColor: `${pageTextColor}1a`,
  };

  return (
    <>
      <div className="flex-1 flex items-center justify-center z-10 relative">
        <DecorativeSidebars
          textLength={text.length}
          aspectRatioName={aspectRatio.name.split(" ")[0]}
          color={pageTextColor}
        />
        <h2
          className="absolute top-1/2 -translate-y-1/2 -left-1/2 -translate-x-1/2 text-2xl font-extralight tracking-[0.5em] uppercase  px-12 py-4 transition-all duration-700 select-none"
          style={{ color: `${pageTextColor}4a` }}
        >
          Quote's
        </h2>

        <h2
          className="absolute top-1/2 -translate-y-1/2 -right-1/2 translate-x-1/2 text-2xl font-extralight tracking-[0.5em] uppercase  px-12 py-4 transition-all duration-700 select-none"
          style={{ color: `${pageTextColor}4a` }}
        >
          Creator
        </h2>

        {/* EDITOR PRINCIPAL */}
        <QuoteCard {...commonProps} isEditor={true} />
      </div>

      {showPreview && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center animate-fadeIn z-50 p-6"
          onClick={() => setShowPreview(false)}
        >
          {/* CONTENEDOR DE CAPTURA (con padding para la sombra) */}
          <div
            ref={previewRef}
            className={`p-16 transition-transform duration-300 ${showPreview ? "animate-scaleIn" : "animate-scaleOut"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <QuoteCard
              {...commonProps}
              id="download-capture"
              isEditor={false}
              isCapture={true}
            />

            {!isDownloading && (
              <button
                name="xmark"
                className="absolute top-0 right-4 p-2 text-white/40 hover:text-white transition-opacity"
                onClick={() => setShowPreview(false)}
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Canvas;
