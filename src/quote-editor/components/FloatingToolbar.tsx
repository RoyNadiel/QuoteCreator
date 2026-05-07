import { useEffect, useState, useRef } from 'react';
import { Bold, Italic, Underline, Highlighter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingToolbarProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function FloatingToolbar({ containerRef }: FloatingToolbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();

      // Comprobar si hay una selección válida y si el contenedor lo incluye
      if (
        !selection ||
        selection.isCollapsed ||
        !selection.rangeCount ||
        !containerRef.current?.contains(selection.anchorNode)
      ) {
        setIsVisible(false);
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Si el rectángulo es válido
      if (rect.width > 0 && rect.height > 0) {
        setPosition({
          top: rect.bottom + 15, // Posicionar debajo de la selección
          left: rect.left + rect.width / 2, // Centrado respecto a la selección
        });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    // También recalcular en scroll o resize
    window.addEventListener('resize', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('resize', handleSelectionChange);
    };
  }, [containerRef]);

  const applyCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    // Force a small delay to keep focus/selection if needed, though execCommand usually preserves it.
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={toolbarRef}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="fixed z-100 flex items-center bg-slate-800 text-white rounded-lg shadow-xl border border-slate-700"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translateX(-50%)',
          }}
          onMouseDown={(e) => {
            // Evitamos que al hacer clic en la barra se pierda el foco de la selección actual
            e.preventDefault();
          }}
        >
          <div className="flex items-center p-1 space-x-1">
            <button
              onClick={() => applyCommand('bold')}
              className="p-2 hover:bg-slate-700 rounded transition-colors"
              title="Negrita"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => applyCommand('italic')}
              className="p-2 hover:bg-slate-700 rounded transition-colors"
              title="Cursiva"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => applyCommand('underline')}
              className="p-2 hover:bg-slate-700 rounded transition-colors"
              title="Subrayado"
            >
              <Underline className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-slate-600 mx-1" />

            <div
              className="relative flex items-center justify-center p-2 hover:bg-slate-700 rounded transition-colors overflow-hidden"
              title="Color del texto"
            >
              <Highlighter className="w-4 h-4 pointer-events-none" />
              <input
                type="color"
                onChange={(e) => applyCommand('foreColor', e.target.value)}
                className="absolute inset-0 opacity-0 w-[150%] h-[150%] cursor-pointer"
                style={{ top: '-25%', left: '-25%' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
