import { DecorativeSidebars } from './DecorativeSidebars';
import { AuthorFooter } from './AuthorFooter';
import { X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import type { AspectRatioOption, QuotePage } from '../types';
import { useMemo } from 'react';
import { CanvasPage } from './CanvasPage';

interface CanvasProps {
  currentPage: QuotePage;
  updatePage: (updates: Partial<QuotePage>) => void;
  fontSize: number;
  direction: number;
  aspectRatio: AspectRatioOption;
  pageTextColor: string;
  quoteBackgroundColor: string;
  quoteTextColor: string;
  formattedTime: string;
  showPreview: boolean;
  previewRef?: React.Ref<HTMLDivElement>;
  setShowPreview: (showPreview: boolean) => void;
  isDownloading: boolean;
  isOverflowing: boolean;
  setIsOverflowing: (overflow: boolean) => void;
}



function Canvas({
  currentPage,
  updatePage,
  fontSize,
  direction,
  aspectRatio,
  pageTextColor,
  quoteBackgroundColor,
  quoteTextColor,
  formattedTime,
  showPreview,
  previewRef,
  setShowPreview,
  isDownloading,
  isOverflowing,
  setIsOverflowing,
}: CanvasProps) {
  const depthVariants = {
    enter: (direction: number) => ({
      scale: direction > 0 ? 0.95 : 1.05,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      scale: 1,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      scale: direction < 0 ? 0.95 : 1.05,
      opacity: 0,
    }),
  };

  const verticalJustify = useMemo(() => {
    switch (currentPage.textVerticalAlign) {
      case 'top':
        return 'justify-start';
      case 'center':
        return 'justify-center';
      case 'bottom':
        return 'justify-end';
      default:
        return 'justify-start';
    }
  }, [currentPage.textVerticalAlign]);

  return (
    <>
      {/* ── LIENZO EDITOR ── */}
      <div className="flex-1 flex items-center justify-center z-10 relative">
        <DecorativeSidebars
          textLength={currentPage.text.length}
          aspectRatioName={aspectRatio.name.split(' ')[0]}
          color={pageTextColor}
        />
        <h2
          className="absolute top-1/2 -translate-y-1/2 -left-[40%] md:-left-1/2 -translate-x-1/2 text-lg sm:text-xl md:text-2xl font-extralight tracking-[0.3em] sm:tracking-[0.5em] uppercase px-4 sm:px-8 md:px-12 py-2 md:py-4 transition-all duration-700 select-none hidden sm:block"
          style={{ color: `${pageTextColor}4a` }}
        >
          Quote's
        </h2>
        <h2
          className="absolute top-1/2 -translate-y-1/2 -right-[40%] md:-right-1/2 translate-x-1/2 text-lg sm:text-xl md:text-2xl font-extralight tracking-[0.3em] sm:tracking-[0.5em] uppercase px-4 sm:px-8 md:px-12 py-2 md:py-4 transition-all duration-700 select-none hidden sm:block"
          style={{ color: `${pageTextColor}4a` }}
        >
          Creator
        </h2>

        <AnimatePresence mode="wait" custom={direction}>
          <CanvasPage
            key={currentPage.id}
            page={currentPage}
            updatePage={updatePage}
            fontSize={fontSize}
            direction={direction}
            aspectRatio={aspectRatio}
            pageTextColor={pageTextColor}
            formattedTime={formattedTime}
            isOverflowing={isOverflowing}
            setIsOverflowing={setIsOverflowing}
            depthVariants={depthVariants}
          />
        </AnimatePresence>
      </div>

      {/* ── PREVIEW / CAPTURA ── */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center animate-fadeIn z-50"
          onClick={() => setShowPreview(false)}
        >
          <div
            id="download-capture"
            onClick={(e) => e.stopPropagation()}
            className="relative border flex flex-col items-center"
            ref={previewRef}
            style={{
              aspectRatio: aspectRatio.value,
              background: quoteBackgroundColor,
              color: quoteTextColor,
              borderColor: `${pageTextColor}1a`,
              height: '80vh',
              maxHeight: '80vh',
              maxWidth: '90vw',
              padding: '2rem',
            }}
          >
            {!isDownloading && (
              <button
                name="xmark"
                className="absolute top-2 right-2 cursor-pointer p-2 text-current opacity-40 hover:opacity-100 transition-opacity"
                onClick={() => setShowPreview(false)}
              >
                <X className="w-6 h-6" />
              </button>
            )}
            <div
              className={`wrap-break-words flex w-full flex-1 flex-col whitespace-pre-wrap ${verticalJustify}`}
            >
              <div
                className="w-full leading-relaxed"
                style={{
                  fontFamily: currentPage.quoteFontFamily,
                  fontSize: `${fontSize}px`,
                  textAlign: currentPage.textHorizontalAlign,
                }}
                dangerouslySetInnerHTML={{ __html: currentPage.text }}
              />
            </div>
            <AuthorFooter
              author={currentPage.author}
              autorFontFamily={currentPage.autorFontFamily}
              fontSize={fontSize}
              timeString={formattedTime}
              color={quoteTextColor}
              borderColor={`${pageTextColor}1a`}
              showDate={currentPage.showDate}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Canvas;
