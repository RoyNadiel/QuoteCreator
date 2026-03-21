import { DecorativeSidebars } from './DecorativeSidebars';
import { AuthorFooter } from './AuthorFooter';
import { X, AlertCircle } from 'lucide-react';
import type {
  AspectRatioOption,
  TextHorizontalAlign,
  TextVerticalAlign,
} from '../types';
import { useRef, useEffect, useMemo } from 'react';

interface CanvasProps {
  text: string;
  setText: (text: string) => void;
  author: string;
  quoteFontFamily: string;
  autorFontFamily: string;
  fontSize: number;
  textHorizontalAlign: TextHorizontalAlign;
  textVerticalAlign: TextVerticalAlign;
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
  textHorizontalAlign,
  textVerticalAlign,
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
  const lienzoRef = useRef<HTMLDivElement>(null);

  const verticalJustify = useMemo(() => {
    switch (textVerticalAlign) {
      case 'top':
        return 'justify-start';
      case 'center':
        return 'justify-center';
      case 'bottom':
        return 'justify-end';
      default:
        return 'justify-start';
    }
  }, [textVerticalAlign]);

  // Auto-ajusta altura del textarea y comprueba desbordamiento contra el div contenedor
  useEffect(() => {
    const checkHeightAndOverflow = () => {
      const textarea = textareaRef.current;
      const lienzo = lienzoRef.current;

      if (textarea && lienzo) {
        // 1. Resetear a "auto" para que scrollHeight refleje el contenido real
        textarea.style.height = 'auto';
        const contentHeight = textarea.scrollHeight;
        // 2. Aplicar esa altura al textarea (crece con el contenido)
        textarea.style.height = `${contentHeight}px`;

        // 3. Comparar contra el div lienzoRef (el límite real del lienzo)
        const hasOverflow = contentHeight >= lienzo.clientHeight;
        console.log('Scroll-Height: ', textarea.scrollHeight);
        console.log('Content-Height: ', contentHeight);

        setIsOverflowing(hasOverflow);
      }
    };

    setTimeout(() => {
      checkHeightAndOverflow();
    }, 300);
    // Pequeño retardo para asegurar que la fuente se haya aplicado
    const timer = setTimeout(checkHeightAndOverflow, 100);
    window.addEventListener('resize', checkHeightAndOverflow);
    return () => {
      window.removeEventListener('resize', checkHeightAndOverflow);
      clearTimeout(timer);
    };
  }, [
    text,
    fontSize,
    textHorizontalAlign,
    textVerticalAlign,
    aspectRatio,
    setIsOverflowing,
  ]);

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
      const mirror = document.createElement('div');
      const style = window.getComputedStyle(textarea);

      // Copy relevant styles
      mirror.style.position = 'absolute';
      mirror.style.visibility = 'hidden';
      mirror.style.height = 'auto';
      mirror.style.width = `${textarea.clientWidth}px`;
      mirror.style.fontFamily = style.fontFamily;
      mirror.style.fontSize = style.fontSize;
      mirror.style.lineHeight = style.lineHeight;
      mirror.style.padding = style.padding;
      mirror.style.border = style.border;
      mirror.style.boxSizing = style.boxSizing;
      mirror.style.whiteSpace = 'pre-wrap';
      mirror.style.wordBreak = 'break-word';
      mirror.innerText = newValue;

      document.body.appendChild(mirror);
      const limitHeight =
        lienzoRef.current?.clientHeight || textarea.clientHeight;
      const willOverflow = mirror.scrollHeight > limitHeight;
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
          aspectRatioName={aspectRatio.name.split(' ')[0]}
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

        <section
          className="flex flex-col items-center border-2 z-50 shadow-2xl transition-all duration-200 relative group"
          style={{
            borderColor: `${pageTextColor}1a`,
            aspectRatio: aspectRatio.value,
            height: '80vh',
            maxHeight: '80vh',
            maxWidth: '90vw',
            padding: '2rem',
          }}
        >
          <div className="absolute -top-8 opacity-50 left-1/2 -translate-x-1/2 text-xs uppercase font-mono tracking-widest z-60">
            {Intl.DateTimeFormat('es-VE', {
              timeStyle: 'long',
            }).format(new Date())}
          </div>
          <div
            ref={lienzoRef}
            className={`flex w-full flex-1 flex-col ${verticalJustify} overflow-hidden`}
          >
            <textarea
              ref={textareaRef}
              name="Quote"
              autoFocus
              value={text}
              onChange={handleTextChange}
              placeholder="Comienza a escribir..."
              className={`scrollbar-hide z-20 flex w-full resize-none flex-col bg-transparent leading-relaxed transition-colors duration-300 outline-none placeholder:text-slate-500/80 ${
                isOverflowing ? 'text-red-500' : ''
              }`}
              style={{
                fontFamily: quoteFontFamily,
                fontSize: `${fontSize}px`,
                textAlign: textHorizontalAlign,
                color: isOverflowing ? '#ef4444' : pageTextColor,
              }}
            />
          </div>
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
        </section>
      </div>

      {/* ── PREVIEW / CAPTURA ── */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center animate-fadeIn z-50"
          onClick={() => setShowPreview(false)}
        >
          <div
            id="download-capture"
            onClick={(e) => e.stopPropagation()}
            className="relative border flex flex-col items-center"
            ref={previewRef}
            style={{
              aspectRatio: aspectRatio.value,
              background: quoteBackgroundColor,
              color: quoteTextColor,
              borderColor: `${pageTextColor}1a`,
              height: '80vh',
              maxHeight: '80vh',
              maxWidth: '90vw',
              padding: '2rem',
            }}
          >
            {!isDownloading && (
              <button
                name="xmark"
                className="absolute top-2 right-2 cursor-pointer p-2 text-current opacity-40 hover:opacity-100 transition-opacity"
                onClick={() => setShowPreview(false)}
              >
                <X className="w-6 h-6" />
              </button>
            )}
            <div
              className={`wrap-break-words flex w-full flex-1 flex-col whitespace-pre-wrap ${verticalJustify}`}
            >
              <div
                className="w-full leading-relaxed"
                style={{
                  fontFamily: quoteFontFamily,
                  fontSize: `${fontSize}px`,
                  textAlign: textHorizontalAlign,
                }}
              >
                {text}
              </div>
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
