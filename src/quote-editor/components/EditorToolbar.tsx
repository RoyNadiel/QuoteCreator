import { useEffect, useState } from 'react';
import { Bold, Italic, Underline, Highlighter } from 'lucide-react';

interface EditorToolbarProps {
  pageTextColor: string;
  quoteBackgroundColor: string;
  editorRef: React.RefObject<HTMLDivElement | null>;
}

export function EditorToolbar({
  pageTextColor,
  quoteBackgroundColor,
  editorRef,
}: EditorToolbarProps) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const hoverBackgroundClass =
    pageTextColor === '#FFFFFF'
      ? 'hover:bg-[#FFFFFF20]'
      : 'hover:bg-[#FFFFFF20]';
  useEffect(() => {
    const syncCaretStyles = () => {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount || !editorRef.current) return;

      // Only sync if selection is collapsed (a caret) and focus is inside the active editor
      if (
        selection.isCollapsed &&
        editorRef.current.contains(selection.anchorNode)
      ) {
        if (document.queryCommandState('bold') !== isBold) {
          document.execCommand('bold');
        }
        if (document.queryCommandState('italic') !== isItalic) {
          document.execCommand('italic');
        }
        if (document.queryCommandState('underline') !== isUnderline) {
          document.execCommand('underline');
        }
      }
    };

    document.addEventListener('selectionchange', syncCaretStyles);
    document.addEventListener('keyup', syncCaretStyles);
    document.addEventListener('mouseup', syncCaretStyles);

    return () => {
      document.removeEventListener('selectionchange', syncCaretStyles);
      document.removeEventListener('keyup', syncCaretStyles);
      document.removeEventListener('mouseup', syncCaretStyles);
    };
  }, [isBold, isItalic, isUnderline, editorRef]);

  const toggleStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (editorRef.current) {
      editorRef.current.focus();
    }

    if (style === 'bold') {
      const nextVal = !isBold;
      setIsBold(nextVal);
      if (document.queryCommandState('bold') !== nextVal) {
        document.execCommand('bold');
      }
    } else if (style === 'italic') {
      const nextVal = !isItalic;
      setIsItalic(nextVal);
      if (document.queryCommandState('italic') !== nextVal) {
        document.execCommand('italic');
      }
    } else if (style === 'underline') {
      const nextVal = !isUnderline;
      setIsUnderline(nextVal);
      if (document.queryCommandState('underline') !== nextVal) {
        document.execCommand('underline');
      }
    }
  };

  const applyColor = (color: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand('foreColor', false, color);
  };

  return (
    <div
      className="flex items-center px-3 py-1 rounded-xl shadow-sm backdrop-blur-sm gap-1.5 z-60"
      style={{
        background: quoteBackgroundColor,
        color: pageTextColor,
      }}
      onMouseDown={(e) => {
        // Prevent losing focus from contentEditable
        e.preventDefault();
      }}
    >
      <button
        onClick={() => toggleStyle('bold')}
        className={`p-2 rounded-lg transition-colors cursor-pointer ${
          isBold ? `bg-sky-300 shadow-sm` : hoverBackgroundClass
        }`}
        title="Negrita"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => toggleStyle('italic')}
        className={`p-2 rounded-lg transition-colors cursor-pointer ${
          isItalic ? `bg-sky-300 shadow-sm` : hoverBackgroundClass
        }`}
        title="Cursiva"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => toggleStyle('underline')}
        className={`p-2 rounded-lg transition-colors cursor-pointer ${
          isUnderline ? `bg-sky-300 shadow-sm` : hoverBackgroundClass
        }`}
        title="Subrayado"
      >
        <Underline className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-slate-700 mx-1" />

      <div
        className={`relative flex items-center justify-center p-2 ${hoverBackgroundClass} rounded-lg transition-colors overflow-hidden cursor-pointer`}
        title="Color del texto"
      >
        <Highlighter className={`w-4 h-4 ${pageTextColor}`} />
        <input
          type="color"
          onChange={(e) => applyColor(e.target.value)}
          className="absolute inset-0 opacity-0 w-[150%] h-[150%] cursor-pointer"
          style={{ top: '-25%', left: '-25%' }}
        />
      </div>
    </div>
  );
}
