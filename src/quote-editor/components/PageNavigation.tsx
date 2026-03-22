import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import type { QuotePage } from '../types';

interface PageNavigationProps {
  pages: QuotePage[];
  currentPageIndex: number;
  onPageChange: (index: number) => void;
  onAddPage: () => void;
  onDeletePage: (index: number) => void;
  pageTextColor: string;
}

export const PageNavigation = ({
  pages,
  currentPageIndex,
  onPageChange,
  onAddPage,
  onDeletePage,
  pageTextColor,
}: PageNavigationProps) => {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 bg-black/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl transition-colors duration-300"
      style={{ color: pageTextColor }}
    >
      <button
        onClick={() => onPageChange(currentPageIndex - 1)}
        disabled={currentPageIndex === 0}
        className="p-2 rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        title="Página anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 px-2">
        {pages.map((page, index) => (
          <button
            key={page.id}
            onClick={() => onPageChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentPageIndex
                ? 'w-6 bg-current opacity-100'
                : 'bg-current opacity-40 hover:opacity-70'
            }`}
            title={`Página ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPageIndex + 1)}
        disabled={currentPageIndex === pages.length - 1}
        className="p-2 rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        title="Página siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="w-px h-6 bg-current opacity-20 mx-1" />

      <button
        onClick={onAddPage}
        disabled={pages.length >= 10}
        className="p-2 justify-center cursor-pointer flex gap-1 rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all font-medium text-sm items-center"
        title={pages.length >= 10 ? "Límite de 10 páginas alcanzado" : "Añadir nueva página"}
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:block">Nueva</span>
      </button>

      {pages.length > 1 && (
        <button
          onClick={() => onDeletePage(currentPageIndex)}
          className="p-2 rounded-xl hover:bg-red-500/20 cursor-pointer text-current hover:text-red-400 transition-all ml-1"
          title="Eliminar página actual"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
