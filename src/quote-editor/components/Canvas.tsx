import { DecorativeSidebars } from './DecorativeSidebars';
import { AuthorFooter } from './AuthorFooter';
import { X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AspectRatioOption, QuotePage } from '../types';
import { useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { FloatingToolbar } from './FloatingToolbar';

interface CanvasProps {
  currentPage: QuotePage;
  updatePage: (updates: Partial<QuotePage>) => void;
  fontSize: number;
  direction: number;
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
  currentPage,
  updatePage,
  fontSize,
  direction,
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
  const editorRef = useRef<HTMLDivElement>(null);
  const lienzoRef = useRef<HTMLDivElement>(null);
  const lastHtml = useRef(currentPage.text);

  const depthVariants = {
    enter: (direction: number) => ({
      scale: direction > 0 ? 0.95 : 1.05,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      scale: 1,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      scale: direction < 0 ? 0.95 : 1.05,
      opacity: 0,
    }),
  };

  const verticalJustify = useMemo(() => {
    switch (currentPage.textVerticalAlign) {
      case 'top':
        return 'justify-start';
      case 'center':
        return 'justify-center';
      case 'bottom':
        return 'justify-end';
      default:
        return 'justify-start';
    }
  }, [currentPage.textVerticalAlign]);

  const checkHeightAndOverflow = () => {
    const editor = editorRef.current;
    const lienzo = lienzoRef.current;

    if (editor && lienzo) {
      const contentHeight = editor.scrollHeight;
      const hasOverflow = contentHeight > lienzo.clientHeight;
      setIsOverflowing(hasOverflow);
      return hasOverflow;
    }
    return false;
  };

  useLayoutEffect(() => {
    checkHeightAndOverflow();

    const timer1 = setTimeout(checkHeightAndOverflow, 100);
    const timer2 = setTimeout(checkHeightAndOverflow, 300);

    window.addEventListener('resize', checkHeightAndOverflow);
    return () => {
      window.removeEventListener('resize', checkHeightAndOverflow);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [
    currentPage.text,
    fontSize,
    currentPage.textHorizontalAlign,
    currentPage.textVerticalAlign,
    currentPage.quoteFontFamily,
    aspectRatio,
    setIsOverflowing,
  ]);

  // Sincronizar contenido si cambia externamente o se cambia de página
  useEffect(() => {
    if (editorRef.current && currentPage.text !== lastHtml.current) {
      editorRef.current.innerHTML = currentPage.text;
      lastHtml.current = currentPage.text;
    }
  }, [currentPage.text]);

  const handleTextChange = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const newValue = editor.innerHTML;

    // Check overflow
    checkHeightAndOverflow();

    if (newValue !== lastHtml.current) {
      lastHtml.current = newValue;
      updatePage({ text: newValue });
    }
  };

  return (
    <>
      {/* ── LIENZO EDITOR ── */}
      <div className="flex-1 flex items-center justify-center z-10 relative">
        <DecorativeSidebars
          textLength={currentPage.text.length}
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

        <AnimatePresence mode="wait" custom={direction}>
          <motion.section
            key={currentPage.id}
            custom={direction}
            variants={depthVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              scale: { type: 'tween', ease: 'easeInOut', duration: 0.2 },
              opacity: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
            }}
            className="flex flex-col items-center z-50 shadow-[0_0_5px_rgba(127,127,127)] transition-all duration-200 relative group"
            style={{
              borderColor: `${pageTextColor}1a`,
              aspectRatio: aspectRatio.value,
              height: '80vh',
              maxHeight: '80vh',
              maxWidth: '90vw',
              padding: '2rem',
            }}
          >
            <div
              className="absolute hidden md:block -top-8 opacity-50 left-1/2 -translate-x-1/2 text-xs uppercase font-mono tracking-widest z-60"
              style={{ color: pageTextColor }}
            >
              {Intl.DateTimeFormat('es-VE', {
                timeStyle: 'long',
              }).format(new Date())}
            </div>
            <div
              ref={lienzoRef}
              className={`flex w-full flex-1 flex-col ${verticalJustify} overflow-hidden relative`}
            >
              <FloatingToolbar containerRef={lienzoRef} />
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleTextChange}
                onBlur={handleTextChange}
                data-placeholder="Comienza a escribir..."
                className={`scrollbar-hide overflow-hidden z-20 flex w-full resize-none flex-col bg-transparent leading-relaxed transition-colors duration-300 outline-none ${
                  isOverflowing ? 'text-red-500' : ''
                }`}
                style={{
                  fontFamily: currentPage.quoteFontFamily,
                  fontSize: `${fontSize}px`,
                  textAlign: currentPage.textHorizontalAlign,
                  color: isOverflowing ? '#ef4444' : pageTextColor,
                  minHeight: `${fontSize * 1.5}px`,
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
              author={currentPage.author}
              autorFontFamily={currentPage.autorFontFamily}
              fontSize={fontSize}
              timeString={formattedTime}
              color={pageTextColor}
              borderColor={`${pageTextColor}1a`}
            />
          </motion.section>
        </AnimatePresence>
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
                  fontFamily: currentPage.quoteFontFamily,
                  fontSize: `${fontSize}px`,
                  textAlign: currentPage.textHorizontalAlign,
                }}
                dangerouslySetInnerHTML={{ __html: currentPage.text }}
              />
            </div>
            <AuthorFooter
              author={currentPage.author}
              autorFontFamily={currentPage.autorFontFamily}
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
