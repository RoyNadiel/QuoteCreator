export const DecorativeSidebars = ({
  textLength,
  aspectRatioName,
  color,
}: {
  textLength: number;
  aspectRatioName: string;
  color: string;
}) => (
  <>
    <div
      className="absolute -left-20 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 opacity-50 vertical-text pointer-events-none"
      style={{ color }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase font-mono">Redacción</span>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      </div>
      <span className="text-xs uppercase font-mono">Studio V1</span>
    </div>
    <div
      className="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 opacity-50 vertical-text pointer-events-none"
      style={{ color }}
    >
      <span className="text-xs uppercase font-mono">
        {textLength} Characters
      </span>
      <span className="text-xs uppercase font-mono">{aspectRatioName}</span>
    </div>
  </>
);
