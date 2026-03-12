import { pageBackgroundOptions, quoteColorOptions } from "../constants/options";

export const getQuoteTextColor = (backgroundColor: string): string => {
  const option = quoteColorOptions.find((opt) => opt.value === backgroundColor);
  if (option) {
    return option.isDark ? "#FFFFFF" : "#1F2937";
  }
  // Fallback for custom or unknown colors
  return "#1F2937";
};

export const getPageTextColor = (pageBg: string): string => {
  if (pageBg === "rain") return "#e2e8f0"; // slate-200
  const option = pageBackgroundOptions.find((opt) => opt.value === pageBg);
  if (option) {
    return option.isDark ? "#e2e8f0" : "#1e293b";
  }
  return "#1e293b";
};
