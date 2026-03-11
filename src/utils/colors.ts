export const getTextColor = (backgroundColor: string): string => {
  const dark = [
    "#1F2937",
    "#374151",
    "#1E3A5F",
    "#1F3A34",
    "#3D2817",
    "#2D3748",
    "#111111",
  ];
  return dark.includes(backgroundColor) ? "#FFFFFF" : "#1F2937";
};

export const getPageTextColor = (pageBg: string): string => {
  if (pageBg === "rain") return "#e2e8f0"; // slate-200
  const darkBgs = [
    "#1F2937",
    "#374151",
    "#1E3A5F",
    "#1F3A34",
    "#3D2817",
    "#2D3748",
    "#111111",
  ];
  return darkBgs.includes(pageBg) ? "#e2e8f0" : "#1e293b"; // slate-200 vs slate-800
};
