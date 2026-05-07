interface AuthorFooterProps {
  author: string;
  autorFontFamily: string;
  fontSize: number;
  timeString: string;
  color: string;
  borderColor: string;
  showDate: boolean;
}

export const AuthorFooter = ({
  author,
  autorFontFamily,
  fontSize,
  timeString,
  color,
  borderColor,
  showDate,
}: AuthorFooterProps) => {
  if (!author) return null;

  return (
    <div
      className="w-full mt-auto border-t flex justify-between gap-x-6 items-center opacity-80 z-20 transition-colors duration-300"
      style={{ borderColor, color, paddingTop: '0.8rem' }}
    >
      {showDate ? (
        <div className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60">
          {timeString}
        </div>
      ) : (
        <div />
      )}
      <p
        className="italic text-right"
        style={{
          fontFamily: autorFontFamily,
          fontSize: `${Math.max(fontSize * 0.8, 10)}px`,
        }}
      >
        — {author}
      </p>
    </div>
  );
};
