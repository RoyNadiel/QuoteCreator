export type TextAlign = "left" | "center" | "right";

export interface AspectRatioOption {
  name: string;
  value: string;
  width: number;
  height: number;
}

export interface BackgroundOption {
  name: string;
  value: string;
  isDark?: boolean;
}
