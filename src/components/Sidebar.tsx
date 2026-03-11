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
import { colorOptions, aspectRatioOptions } from "../constants/options";
import { FontPicker } from "./FontPicker";
import type { AspectRatioOption, TextAlign } from "../types";

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
      className={`fixed top-0 left-0 h-screen w-80 bg-white shadow-lg overflow-y-auto transition-all duration-300 z-40 ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6 pt-16 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-medium text-slate-800">
              Tema de Fondo
            </h2>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={() => setPageBg("rain")}
              className={`w-full aspect-square rounded-lg transition-all hover:scale-110 flex items-center justify-center bg-slate-900 border border-slate-700 ${
                pageBg === "rain"
                  ? "ring-2 ring-slate-800 ring-offset-2"
                  : "ring-1 ring-slate-200"
              }`}
              title="Lluvia"
            >
              <span className="text-lg">🌧️</span>
            </button>
            {colorOptions.slice(0, 9).map((color) => (
              <button
                key={`bg-${color.value}`}
                onClick={() => setPageBg(color.value)}
                className={`w-full aspect-square rounded-lg transition-all hover:scale-110 ${
                  pageBg === color.value
                    ? "ring-2 ring-slate-800 ring-offset-2"
                    : "ring-1 ring-slate-200"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-medium text-slate-800">Autor</h2>
          </div>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Nombre del autor"
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-medium text-slate-800">
              Fuente del Escrito
            </h2>
          </div>
          <FontPicker value={quoteFontFamily} onChange={setQuoteFontFamily} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-medium text-slate-800">
              Fuente del Autor
            </h2>
          </div>
          <FontPicker value={autorFontFamilty} onChange={setAutorFontFamily} />
        </div>

        <div>
          <label className="text-sm text-slate-600 mb-2 block">
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
            <Palette className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-medium text-slate-800">
              Color de Fondo
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => setQuoteBackgroundColor(color.value)}
                className={`w-full aspect-square rounded-lg transition-all hover:scale-110 ${
                  quoteBackgroundColor === color.value
                    ? "ring-2 ring-slate-800 ring-offset-2"
                    : "ring-1 ring-slate-200"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-medium text-slate-800">Alineación</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTextAlign("left")}
              className={`flex-1 p-3 rounded-lg transition-all border-2 ${
                textAlign === "left"
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-800 border-slate-200 hover:border-slate-400"
              }`}
            >
              <AlignLeft className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => setTextAlign("center")}
              className={`flex-1 p-3 rounded-lg transition-all border-2 ${
                textAlign === "center"
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-800 border-slate-200 hover:border-slate-400"
              }`}
            >
              <AlignCenter className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => setTextAlign("right")}
              className={`flex-1 p-3 rounded-lg transition-all border-2 ${
                textAlign === "right"
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-800 border-slate-200 hover:border-slate-400"
              }`}
            >
              <AlignRight className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Layout className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-medium text-slate-800">Formato</h2>
          </div>
          <select
            value={aspectRatio.value}
            onChange={(e) => {
              const selected = aspectRatioOptions.find(
                (opt) => opt.value === e.target.value,
              );
              if (selected) setAspectRatio(selected);
            }}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all cursor-pointer bg-white"
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
          className="w-full bg-sky-500 text-white py-4 px-2 rounded-lg font-medium hover:bg-sky-700 disabled:bg-sky-200 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          Previsualización
        </button>

        <button
          onClick={handleDownload}
          disabled={!text.trim() || isDownloading}
          className="w-full bg-slate-800 text-white py-4 rounded-lg font-medium hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Download className="w-5 h-5" />
          {isDownloading ? "Descargando..." : "Descargar"}
        </button>
      </div>
    </div>
  );
};
