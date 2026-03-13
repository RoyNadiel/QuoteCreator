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
  quoteTextColor: string;
  formattedTime: string;
  showPreview: boolean;
  previewRef?: React.Ref<HTMLDivElement>;
  setShowPreview: (showPreview: boolean) => void;
  isDownloading: boolean;
}

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
  quoteTextColor,
  formattedTime,
  showPreview,
  previewRef,
  setShowPreview,
  isDownloading,
}: CanvasProps) {
  return (
    <>
      {/* ── LIENZO EDITOR ── */}
      <div className="flex-1 flex items-center justify-center z-10 relative">
        <DecorativeSidebars
          textLength={text.length}
          aspectRatioName={aspectRatio.name.split(" ")[0]}
          color={pageTextColor}
        />
        <h2
          className="absolute top-1/2 -translate-y-1/2 -left-1/2 -translate-x-1/2 text-2xl font-extralight tracking-[0.5em] uppercase px-12 py-4 transition-all duration-700 select-none"
          style={{ color: `${pageTextColor}4a` }}
        >
          Quote's
        </h2>
        <h2
          className="absolute top-1/2 -translate-y-1/2 -right-1/2 translate-x-1/2 text-2xl font-extralight tracking-[0.5em] uppercase px-12 py-4 transition-all duration-700 select-none"
          style={{ color: `${pageTextColor}4a` }}
        >
          Creator
        </h2>

        <div
          className="flex flex-col items-center border-2 z-50 p-12 shadow-2xl transition-all duration-300"
          style={{
            borderColor: `${pageTextColor}1a`,
            aspectRatio: aspectRatio.value,
            height: "80vh",
            maxHeight: "80vh",
            maxWidth: "90vw",
          }}
        >
          <textarea
            name="Quote"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comienza a escribir..."
            className="w-full flex-1 border-none outline-none resize-none leading-relaxed bg-transparent placeholder:text-slate-500/80 z-20 transition-colors duration-300 scrollbar-hide"
            style={{
              fontFamily: quoteFontFamily,
              fontSize: `${fontSize}px`,
              textAlign: textAlign as any,
              color: pageTextColor,
            }}
          />
          <AuthorFooter
            author={author}
            autorFontFamily={autorFontFamily}
            fontSize={fontSize}
            timeString={formattedTime}
            color={pageTextColor}
            borderColor={`${pageTextColor}1a`}
          />
        </div>
      </div>

      {/* ── PREVIEW / CAPTURA ── */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center animate-fadeIn z-50 p-6"
          onClick={() => setShowPreview(false)}
        >
          <div
            id="download-capture"
            ref={previewRef}
            onClick={(e) => e.stopPropagation()}
            className="relative border animate-scaleIn flex flex-col items-center p-12"
            style={{
              aspectRatio: aspectRatio.value,
              background: quoteBackgroundColor,
              color: quoteTextColor,
              borderColor: `${pageTextColor}1a`,
              height: "80vh",
              maxHeight: "80vh",
              maxWidth: "90vw",
            }}
          >
            {!isDownloading && (
              <button
                name="xmark"
                className="absolute top-4 right-6 p-2 text-current opacity-40 hover:opacity-100 transition-opacity"
                onClick={() => setShowPreview(false)}
              >
                <X className="w-6 h-6" />
              </button>
            )}
            <div
              className="w-full flex-1 whitespace-pre-wrap wrap-break-words leading-relaxed"
              style={{
                fontFamily: quoteFontFamily,
                fontSize: `${fontSize}px`,
                textAlign: textAlign as any,
              }}
            >
              {text}
            </div>
            <AuthorFooter
              author={author}
              autorFontFamily={autorFontFamily}
              fontSize={fontSize}
              timeString={formattedTime}
              color={quoteTextColor}
              borderColor={`${pageTextColor}1a`}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Canvas;
