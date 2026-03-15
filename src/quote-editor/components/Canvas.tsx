import { DecorativeSidebars } from "./DecorativeSidebars";
import { AuthorFooter } from "./AuthorFooter";
import { X, AlertCircle } from "lucide-react";
import type { AspectRatioOption } from "../types";
import { useRef, useEffect } from "react";

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
  isOverflowing: boolean;
  setIsOverflowing: (overflow: boolean) => void;
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
  isOverflowing,
  setIsOverflowing,
}: CanvasProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check for overflow whenever text, font size, or aspect ratio changes
  useEffect(() => {
    const checkOverflow = () => {
      if (textareaRef.current) {
        const hasOverflow =
          textareaRef.current.scrollHeight > textareaRef.current.clientHeight;
        setIsOverflowing(hasOverflow);

        // If it was already overflowing and the user added text, we might want to revert?
        // But if they are deleting, it should be fine.
        // For now, let's just use it to show a warning.
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    // Use a small timeout to ensure DOM has updated if fonts are still loading
    const timer = setTimeout(checkOverflow, 100);
    return () => {
      window.removeEventListener("resize", checkOverflow);
      clearTimeout(timer);
    };
  }, [text, fontSize, aspectRatio]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const textarea = textareaRef.current;

    if (!textarea) {
      setText(newValue);
      return;
    }

    const isAdding = newValue.length > text.length;

    if (isAdding) {
      // Create a hidden mirror element to test the height
      const mirror = document.createElement("div");
      const style = window.getComputedStyle(textarea);

      // Copy relevant styles
      mirror.style.position = "absolute";
      mirror.style.visibility = "hidden";
      mirror.style.height = "auto";
      mirror.style.width = `${textarea.clientWidth}px`;
      mirror.style.fontFamily = style.fontFamily;
      mirror.style.fontSize = style.fontSize;
      mirror.style.lineHeight = style.lineHeight;
      mirror.style.padding = style.padding;
      mirror.style.border = style.border;
      mirror.style.boxSizing = style.boxSizing;
      mirror.style.whiteSpace = "pre-wrap";
      mirror.style.wordBreak = "break-word";
      mirror.innerText = newValue;

      document.body.appendChild(mirror);
      const willOverflow = mirror.scrollHeight > textarea.clientHeight;
      document.body.removeChild(mirror);

      if (willOverflow) {
        setIsOverflowing(true);
        return;
      }
    }

    setText(newValue);
    setIsOverflowing(false);
  };

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
          className="absolute top-1/2 -translate-y-1/2 -left-[40%] md:-left-1/2 -translate-x-1/2 text-lg sm:text-xl md:text-2xl font-extralight tracking-[0.3em] sm:tracking-[0.5em] uppercase px-4 sm:px-8 md:px-12 py-2 md:py-4 transition-all duration-700 select-none hidden sm:block"
          style={{ color: `${pageTextColor}4a` }}
        >
          Quote's
        </h2>
        <h2
          className="absolute top-1/2 -translate-y-1/2 -right-[40%] md:-right-1/2 translate-x-1/2 text-lg sm:text-xl md:text-2xl font-extralight tracking-[0.3em] sm:tracking-[0.5em] uppercase px-4 sm:px-8 md:px-12 py-2 md:py-4 transition-all duration-700 select-none hidden sm:block"
          style={{ color: `${pageTextColor}4a` }}
        >
          Creator
        </h2>

        <div
          className="flex flex-col items-center border-2 z-50 p-6 sm:p-8 md:p-12 shadow-2xl transition-all duration-300 relative group"
          style={{
            borderColor: `${pageTextColor}1a`,
            aspectRatio: aspectRatio.value,
            height: "80vh",
            maxHeight: "80vh",
            maxWidth: "90vw",
          }}
        >
          <textarea
            ref={textareaRef}
            name="Quote"
            value={text}
            onChange={handleTextChange}
            placeholder="Comienza a escribir..."
            className={`w-full flex-1 border-none outline-none resize-none leading-relaxed bg-transparent placeholder:text-slate-500/80 z-20 transition-colors duration-300 scrollbar-hide ${
              isOverflowing ? "text-red-500" : ""
            }`}
            style={{
              fontFamily: quoteFontFamily,
              fontSize: `${fontSize}px`,
              textAlign: textAlign as any,
              color: isOverflowing ? "#ef4444" : pageTextColor,
            }}
          />
          {isOverflowing && (
            <div className="absolute top-2 right-2 flex items-center gap-1.5 text-red-500 bg-red-500/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-red-500/20 text-[10px] font-semibold animate-pulse z-30 uppercase tracking-wider">
              <AlertCircle className="w-3 h-3" />
              <span>Límite de Espacio</span>
            </div>
          )}
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
            className="relative border animate-scaleIn flex flex-col items-center p-6 sm:p-8 md:p-12"
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
