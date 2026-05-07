import {
  Download,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Monitor,
  Layout,
  PaletteIcon,
  CloudHail,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyEnd,
} from 'lucide-react';
import {
  pageBackgroundOptions,
  aspectRatioOptions,
} from '../constants/options';
import { FontPicker } from '../../design-assets/components/FontPicker';
import type { AspectRatioOption, QuotePage } from '../types';
import { getContrastColor } from '../utils/colors';

export interface SidebarProps {
  menuOpen: boolean;
  pageBg: string;
  setPageBg: (bg: string) => void;
  currentPage: QuotePage;
  updatePage: (updates: Partial<QuotePage>) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  aspectRatio: AspectRatioOption;
  setAspectRatio: (aspect: AspectRatioOption) => void;
  isDownloading: boolean;
  handleDownload: () => void;
  handleDownloadAll: () => void;
  totalPages: number;
  setShowPreview: (bool: boolean) => void;
  isOverflowing: boolean;
}

export const Sidebar = ({
  menuOpen,
  pageBg,
  setPageBg,
  currentPage,
  updatePage,
  fontSize,
  setFontSize,
  aspectRatio,
  setAspectRatio,
  isDownloading,
  handleDownload,
  handleDownloadAll,
  totalPages,
  setShowPreview,
  isOverflowing,
}: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-full max-w-2xs md:max-w-81 bg-transparent backdrop-blur-md border-r border-slate-100/30 shadow-2xs overflow-y-auto transition-all duration-500 z-50 scrollbar-hide ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{
        color: getContrastColor(pageBg, 'ui'),
      }}
    >
      <div className="p-4 sm:p-6 pt-16 sm:pt-16 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5" />
            <h2 className="text-lg font-medium">Tema de Fondo</h2>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {pageBackgroundOptions.map((color) => {
              const isMesh = !!color.meshColors;
              return (
                <button
                  key={`bg-${color.value}`}
                  onClick={() => setPageBg(color.value)}
                  className={`w-full aspect-square rounded-lg transition-all hover:scale-110 flex items-center justify-center ${
                    pageBg === color.value
                      ? 'ring-2 ring-current ring-offset-2'
                      : 'ring-1 ring-slate-200'
                  }`}
                  style={{
                    background:
                      color.value === 'rain' || isMesh
                        ? color.meshColors?.base || '#0f172a'
                        : color.value,
                  }}
                  title={color.name}
                >
                  {color.value === 'rain' && (
                    <span className="text-xs">
                      <CloudHail className="w-4 h-4" />
                    </span>
                  )}
                  {isMesh && (
                    <span className="text-xs">
                      <PaletteIcon className="w-4 h-4 text-gray-300" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5" />
            <h2 className="text-lg font-medium">Autor</h2>
          </div>
          <input
            type="text"
            value={currentPage.author}
            onChange={(e) => updatePage({ author: e.target.value })}
            placeholder="Nombre del autor"
            className="w-full px-4 py-3 bg-slate-50 text-black border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder font-medium mb-3"
          />
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-500/10 transition-colors w-max">
            <input
              type="checkbox"
              checked={currentPage.showDate}
              onChange={(e) => updatePage({ showDate: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500 bg-slate-50"
            />
            <span className="text-sm font-medium">Mostrar fecha de captura</span>
          </label>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5" />
            <h2 className="text-lg font-medium">Fuente del Escrito</h2>
          </div>
          <FontPicker
            value={currentPage.quoteFontFamily}
            onChange={(quoteFontFamily) => updatePage({ quoteFontFamily })}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5" />
            <h2 className="text-lg font-medium">Fuente del Autor</h2>
          </div>
          <FontPicker
            value={currentPage.autorFontFamily}
            onChange={(autorFontFamily) => updatePage({ autorFontFamily })}
            disabled={!currentPage.author.trim()}
          />
        </div>

        <div className="mb-8">
          <label className=" flex items-center gap-x-2 text-lg font-medium mb-2">
            <Type className="w-5 h-5" />
            Tamaño de fuente: {fontSize}px
          </label>
          <input
            type="range"
            min="10"
            max="48"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5" />
            <h2 className="text-lg font-medium">Alineación</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => updatePage({ textHorizontalAlign: 'left' })}
              className={`flex-1 p-3 rounded-xl transition-all border ${
                currentPage.textHorizontalAlign === 'left'
                  ? 'bg-slate-900 text-white border-transparent shadow-lg'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <AlignLeft
                className={`w-5 h-5 mx-auto ${currentPage.textHorizontalAlign === 'left' ? 'text-white' : 'text-black'}`}
              />
            </button>
            <button
              onClick={() => updatePage({ textHorizontalAlign: 'center' })}
              className={`flex-1 p-3 rounded-xl transition-all border ${
                currentPage.textHorizontalAlign === 'center'
                  ? 'bg-slate-900 text-white border-transparent shadow-lg'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <AlignCenter
                className={`w-5 h-5 mx-auto ${currentPage.textHorizontalAlign === 'center' ? 'text-white' : 'text-black'}`}
              />
            </button>
            <button
              onClick={() => updatePage({ textHorizontalAlign: 'right' })}
              className={`flex-1 p-3 rounded-xl transition-all border ${
                currentPage.textHorizontalAlign === 'right'
                  ? 'bg-slate-900 text-white border-transparent shadow-lg'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <AlignRight
                className={`w-5 h-5 mx-auto ${currentPage.textHorizontalAlign === 'right' ? 'text-white' : 'text-black'}`}
              />
            </button>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <Layout className="h-5 w-5" />
            <h2 className="text-lg font-medium">Alineación Vertical</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => updatePage({ textVerticalAlign: 'top' })}
              className={`flex-1 rounded-xl border p-3 transition-all ${
                currentPage.textVerticalAlign === 'top'
                  ? 'border-transparent bg-slate-900 text-white shadow-lg'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <AlignVerticalJustifyStart
                className={`mx-auto h-5 w-5 ${currentPage.textVerticalAlign === 'top' ? 'text-white' : 'text-black'}`}
              />
            </button>
            <button
              onClick={() => updatePage({ textVerticalAlign: 'center' })}
              className={`flex-1 rounded-xl border p-3 transition-all ${
                currentPage.textVerticalAlign === 'center'
                  ? 'border-transparent bg-slate-900 text-white shadow-lg'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <AlignVerticalJustifyCenter
                className={`mx-auto h-5 w-5 ${currentPage.textVerticalAlign === 'center' ? 'text-white' : 'text-black'}`}
              />
            </button>
            <button
              onClick={() => updatePage({ textVerticalAlign: 'bottom' })}
              className={`flex-1 rounded-xl border p-3 transition-all ${
                currentPage.textVerticalAlign === 'bottom'
                  ? 'border-transparent bg-slate-900 text-white shadow-lg'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <AlignVerticalJustifyEnd
                className={`mx-auto h-5 w-5 ${currentPage.textVerticalAlign === 'bottom' ? 'text-white' : 'text-black'}`}
              />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Layout className="w-5 h-5" />
            <h2 className="text-lg font-medium">Formato</h2>
          </div>
          <select
            value={aspectRatio.value}
            onChange={(e) => {
              const selected = aspectRatioOptions.find(
                (opt) => opt.value === e.target.value
              );
              if (selected) {
                setAspectRatio(selected);
                setFontSize(selected.fontSize || 20);
              }
            }}
            className="w-full px-4 py-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all cursor-pointer font-medium appearance-none"
          >
            {aspectRatioOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name} - {option.width}x{option.height}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowPreview(true)}
          disabled={!currentPage.text.trim() || isOverflowing}
          className="w-full bg-sky-500 text-white py-4 px-2 rounded-xl font-bold hover:bg-sky-600 active:scale-[0.98] disabled:bg-sky-100 disabled:text-sky-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-bellota"
        >
          {isOverflowing ? 'Espacio insuficiente' : 'Previsualización'}
        </button>

        <button
          onClick={handleDownload}
          disabled={!currentPage.text.trim() || isDownloading || isOverflowing}
          className="w-full py-4 rounded-xl active:scale-[0.98] disabled:bg-slate-500 disabled cursor-pointer disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 text-white font-bellota"
          title="Descargar solo esta página"
        >
          <Download className="w-5 h-5" />
          Descargar Actual
        </button>

        {totalPages > 1 && (
          <button
            onClick={handleDownloadAll}
            disabled={isDownloading || isOverflowing}
            className="w-full py-3 mt-1 rounded-xl active:scale-[0.98] disabled:bg-slate-500/50 disabled cursor-pointer disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 border-2 border-orange-400 text-orange-400 hover:bg-orange-50 font-bellota"
            title="Descargar todas las páginas como archivo ZIP"
          >
            <Download className="w-4 h-4" />
            Descargar Todo (ZIP)
          </button>
        )}
      </div>
    </div>
  );
};
