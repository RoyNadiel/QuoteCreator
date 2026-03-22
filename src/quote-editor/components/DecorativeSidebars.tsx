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
      className="absolute flex items-center justify-center gap-x-4 top-1/14 -translate-y-1/2 md:-left-20 md:top-1/2 md:flex md:flex-col md:gap-y-6 md:vertical-text pointer-events-none opacity-50"
      style={{ color }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase font-mono tracking-widest">
          Redacción
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse tracking-widest" />
      </div>
      <div className="text-xs uppercase font-mono">Studio V1</div>
    </div>
    <div
      className="hidden absolute md:justify-center md:items-center md:gap-x-4 md:bottom-1/25 md:-translate-y-1/2 md:flex md:flex-col md:gap-y-6 md:-right-20 md:top-1/2 md:vertical-text pointer-events-none opacity-50"
      style={{ color }}
    >
      <span className="text-xs uppercase font-mono tracking-widest">
        {textLength} Characters
      </span>
      <span className="text-xs uppercase font- tracking-widest">
        {aspectRatioName}
      </span>
    </div>
  </>
);
