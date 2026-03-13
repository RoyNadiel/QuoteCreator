interface AuthorFooterProps {
  author: string;
  autorFontFamily: string;
  fontSize: number;
  timeString: string;
  color: string;
  borderColor: string;
}

export const AuthorFooter = ({
  author,
  autorFontFamily,
  fontSize,
  timeString,
  color,
  borderColor,
}: AuthorFooterProps) => {
  if (!author) return null;

  return (
    <div
      className="w-full pt-6 mt-auto border-t flex justify-between items-center opacity-80 z-20 transition-colors duration-300"
      style={{ borderColor, color }}
    >
      <div className="text-xs font-mono tracking-widest opacity-60">
        {timeString}
      </div>
      <p
        className="italic text-right"
        style={{
          fontFamily: autorFontFamily,
          fontSize: `${Math.max(fontSize * 0.8, 14)}px`,
        }}
      >
        — {author}
      </p>
    </div>
  );
};
