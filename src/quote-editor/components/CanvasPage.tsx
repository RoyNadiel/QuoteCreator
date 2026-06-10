import { useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { FloatingToolbar } from './FloatingToolbar';
import { EditorToolbar } from './EditorToolbar';
import { AuthorFooter } from './AuthorFooter';
import type { AspectRatioOption, QuotePage } from '../types';

interface CanvasPageProps {
  page: QuotePage;
  updatePage: (updates: Partial<QuotePage>) => void;
  fontSize: number;
  direction: number;
  aspectRatio: AspectRatioOption;
  pageTextColor: string;
  formattedTime: string;
  isOverflowing: boolean;
  setIsOverflowing: (overflow: boolean) => void;
  depthVariants: any;
}

export const CanvasPage = ({
  page,
  updatePage,
  fontSize,
  direction,
  aspectRatio,
  pageTextColor,
  formattedTime,
  isOverflowing,
  setIsOverflowing,
  depthVariants,
}: CanvasPageProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const lienzoRef = useRef<HTMLDivElement>(null);
  const lastHtml = useRef(page.text);

  const verticalJustify = useMemo(() => {
    switch (page.textVerticalAlign) {
      case 'top':
        return 'justify-start';
      case 'center':
        return 'justify-center';
      case 'bottom':
        return 'justify-end';
      default:
        return 'justify-start';
    }
  }, [page.textVerticalAlign]);

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
    page.text,
    fontSize,
    page.textHorizontalAlign,
    page.textVerticalAlign,
    page.quoteFontFamily,
    aspectRatio,
    setIsOverflowing,
  ]);

  // Sincronizar contenido si cambia externamente
  useEffect(() => {
    if (editorRef.current && page.text !== lastHtml.current) {
      editorRef.current.innerHTML = page.text;
      lastHtml.current = page.text;
    }
  }, [page.text]);

  // Inicializar contenido al montar
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = page.text;
      lastHtml.current = page.text;
    }
  }, []);

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
    <motion.section
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
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-60 flex flex-col items-center gap-2">
        <EditorToolbar pageTextColor={pageTextColor} editorRef={editorRef} />
        <div
          className="hidden md:block opacity-50 text-[10px] uppercase font-mono tracking-widest"
          style={{ color: pageTextColor }}
        >
          {Intl.DateTimeFormat('es-VE', {
            timeStyle: 'long',
          }).format(new Date())}
        </div>
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
            fontFamily: page.quoteFontFamily,
            fontSize: `${fontSize}px`,
            textAlign: page.textHorizontalAlign,
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
        author={page.author}
        autorFontFamily={page.autorFontFamily}
        fontSize={fontSize}
        timeString={formattedTime}
        color={pageTextColor}
        borderColor={`${pageTextColor}1a`}
        showDate={page.showDate}
      />
    </motion.section>
  );
};
