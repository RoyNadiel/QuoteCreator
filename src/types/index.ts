export type TextAlign = "left" | "center" | "right";
export type TextVerticalAlign = "top" | "center" | "bottom";

export interface AspectRatioOption {
  name: string;
  value: string;
  width: number;
  height: number;
  fontSize: number;
}

export interface BackgroundOption {
  name: string;
  value: string;
  isDark?: boolean;
  meshColors?: {
    blob1: string;
    blob2: string;
    blob3: string;
    blob4: string;
    base: string;
  };
}
