import {
  Download,
  Type,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Monitor,
  Layout,
} from "lucide-react";
import {
  pageBackgroundOptions,
  quoteColorOptions,
  aspectRatioOptions,
} from "../constants/options";
import { FontPicker } from "./FontPicker";
import type { AspectRatioOption, TextAlign } from "../types";
import { getPageTextColor } from "../utils/colors";

export interface SidebarProps {
  menuOpen: boolean;
  pageBg: string;
  setPageBg: (bg: string) => void;
  author: string;
  setAuthor: (author: string) => void;
  quoteFontFamily: string;
  setQuoteFontFamily: (font: string) => void;
  autorFontFamilty: string;
  setAutorFontFamily: (font: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  quoteBackgroundColor: string;
  setQuoteBackgroundColor: (color: string) => void;
  textAlign: TextAlign;
  setTextAlign: (align: TextAlign) => void;
  aspectRatio: AspectRatioOption;
  setAspectRatio: (aspect: AspectRatioOption) => void;
  text: string;
  isDownloading: boolean;
  handleDownload: () => void;
  setShowPreview: (bool: boolean) => void;
}

export const Sidebar = ({
  menuOpen,
  pageBg,
  setPageBg,
  author,
  setAuthor,
  quoteFontFamily,
  setQuoteFontFamily,
  autorFontFamilty,
  setAutorFontFamily,
  fontSize,
  setFontSize,
  quoteBackgroundColor,
  setQuoteBackgroundColor,
  textAlign,
  setTextAlign,
  aspectRatio,
  setAspectRatio,
  text,
  isDownloading,
  handleDownload,
  setShowPreview,
}: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-80 bg-transparent backdrop-blur-md border-r border-slate-100 shadow-[20px_0_50px_-15px_rgba(0,0,0,0.1)] overflow-y-auto transition-all duration-500 z-40 scrollbar-hide ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{
        color: getPageTextColor(pageBg),
      }}
    >
      <div className="p-6 pt-16 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5" />
            <h2 className="text-lg font-medium">Tema de Fondo</h2>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {pageBackgroundOptions.map((color) => (
              <button
                key={`bg-${color.value}`}
                onClick={() => setPageBg(color.value)}
                className={`w-full aspect-square rounded-lg transition-all hover:scale-110 ${
                  pageBg === color.value
                    ? "ring-2 ring-current ring-offset-2"
                    : "ring-1 ring-slate-200"
                }`}
                style={{
                  background: color.value === "rain" ? "#0f172a" : color.value,
                }}
                title={color.name}
              >
                {color.value === "rain" && <span className="text-xs">🌧️</span>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5" />
            <h2 className="text-lg font-medium">Autor</h2>
          </div>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Nombre del autor"
            className="w-full px-4 py-3 bg-slate-50 text-black border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder font-medium"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5" />
            <h2 className="text-lg font-medium">Fuente del Escrito</h2>
          </div>
          <FontPicker value={quoteFontFamily} onChange={setQuoteFontFamily} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5" />
            <h2 className="text-lg font-medium">Fuente del Autor</h2>
          </div>
          <FontPicker value={autorFontFamilty} onChange={setAutorFontFamily} />
        </div>

        <div>
          <label className="text-sm mb-2 block">
            Tamaño de fuente: {fontSize}px
          </label>
          <input
            type="range"
            min="14"
            max="48"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5" />
            <h2 className="text-lg font-medium">Color de Fondo</h2>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {quoteColorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => setQuoteBackgroundColor(color.value)}
                className={`w-full aspect-square rounded-lg transition-all hover:scale-110 ${
                  quoteBackgroundColor === color.value
                    ? "ring-2 ring-current ring-offset-2"
                    : "ring-1 ring-slate-200"
                }`}
                style={{ background: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5" />
            <h2 className="text-lg font-medium">Alineación</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTextAlign("left")}
              className={`flex-1 p-3 rounded-xl transition-all border ${
                textAlign === "left"
                  ? "bg-slate-900 text-white border-transparent shadow-lg"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <AlignLeft
                className={`w-5 h-5 mx-auto ${textAlign === "left" ? "text-white" : "text-black"}`}
              />
            </button>
            <button
              onClick={() => setTextAlign("center")}
              className={`flex-1 p-3 rounded-xl transition-all border ${
                textAlign === "center"
                  ? "bg-slate-900 text-white border-transparent shadow-lg"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <AlignCenter
                className={`w-5 h-5 mx-auto ${textAlign === "center" ? "text-white" : "text-black"}`}
              />
            </button>
            <button
              onClick={() => setTextAlign("right")}
              className={`flex-1 p-3 rounded-xl transition-all border ${
                textAlign === "right"
                  ? "bg-slate-900 text-white border-transparent shadow-lg"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <AlignRight
                className={`w-5 h-5 mx-auto ${textAlign === "right" ? "text-white" : "text-black"}`}
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
                (opt) => opt.value === e.target.value,
              );
              if (selected) setAspectRatio(selected);
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
          disabled={!text.trim()}
          className="w-full bg-sky-500 text-white py-4 px-2 rounded-xl font-bold hover:bg-sky-600 active:scale-[0.98] disabled:bg-sky-100 disabled:text-sky-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
        >
          Previsualización
        </button>

        <button
          onClick={handleDownload}
          disabled={!text.trim() || isDownloading}
          className="w-full bg-indigo-900 text-white py-4 rounded-xl font-bold hover:bg-indigo-950 active:scale-[0.98] disabled:bg-slate-500 disabled disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10"
        >
          <Download className="w-5 h-5" />
          {isDownloading ? "Descargando..." : "Descargar"}
        </button>
      </div>
    </div>
  );
};
