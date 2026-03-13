import { useState, useMemo, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { popularGoogleFonts, loadGoogleFont } from "../utils/fonts";
import { fontOptions } from "../constants/options";

interface FontPickerProps {
  label?: string;
  value: string;
  onChange: (font: string) => void;
  disabled?: boolean;
}

export const FontPicker = ({
  label,
  value,
  onChange,
  disabled,
}: FontPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Combinamos las fuentes locales con las de Google
  const allFonts = useMemo(() => {
    const localFonts = fontOptions.map((f) => ({
      name: f.name,
      value: f.value,
      isGoogle: false,
    }));
    const googleFonts = popularGoogleFonts.map((f) => ({
      name: f,
      value: f,
      isGoogle: true,
    }));

    // Evitar duplicados si alguna fuente local está en la lista de Google
    const filteredGoogle = googleFonts.filter(
      (gf) => !localFonts.some((lf) => lf.name === gf.name),
    );

    return [...localFonts, ...filteredGoogle];
  }, []);

  const filteredFonts = useMemo(() => {
    if (!search) return allFonts;
    return allFonts.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [allFonts, search]);

  const currentFontName = useMemo(() => {
    return allFonts.find((f) => f.value === value)?.name || value;
  }, [allFonts, value]);

  const handleSelect = (font: {
    name: string;
    value: string;
    isGoogle: boolean;
  }) => {
    if (font.isGoogle) {
      loadGoogleFont(font.value);
    }
    onChange(font.value);
    setSearch("");
  };

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = () => setIsOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <label className="text-sm font-medium text-slate-600 mb-2 block">
        {label}
      </label>

      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 border border-slate-200 rounded-xl transition-all text-left ${
          disabled
            ? "bg-slate-100 cursor-not-allowed opacity-60"
            : "bg-slate-50 hover:border-slate-300 focus:ring-2 focus:ring-slate-200 focus:bg-white"
        }`}
      >
        <span
          className="truncate text-slate-700 font-medium"
          style={{ fontFamily: value }}
        >
          {currentFontName}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] overflow-hidden transition-all">
          <div className="p-3 border-b border-slate-50 flex items-center gap-2 bg-slate-50/50">
            <Search className="w-4 h-4 text-slate-400 ml-1" />
            <input
              type="text"
              placeholder="Buscar fuente de google..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 font-medium"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredFonts.length > 0 ? (
              filteredFonts.map((font) => (
                <button
                  key={font.value}
                  onClick={() => handleSelect(font)}
                  className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 transition-colors text-left text-slate-700"
                >
                  <span
                    className="font-medium"
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </span>
                  {value === font.value && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-slate-400">
                No se encontraron fuentes
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
