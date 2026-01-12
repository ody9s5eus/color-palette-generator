import { useState, useCallback } from 'react';
import { getContrastColor } from '../utils/colorUtils';

interface ColorColumnProps {
  hex: string;
}

const ColorColumn = ({ hex }: ColorColumnProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const textColor = getContrastColor(hex);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  }, [hex]);

  return (
    <div
      data-testid="color-column"
      className="flex-1 flex flex-col items-center justify-center min-h-[300px] sm:min-h-screen transition-colors duration-300 cursor-pointer group relative"
      style={{ backgroundColor: hex }}
      onClick={handleCopy}
    >
      <h2 
        className="text-2xl font-mono font-bold tracking-wider transition-all duration-200 transform group-hover:scale-110"
        style={{ color: textColor }}
      >
        {isCopied ? 'COPIED!' : hex}
      </h2>
      
      {!isCopied && (
        <span 
          className="absolute bottom-1/4 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-40 transition-opacity"
          style={{ color: textColor }}
        >
          Click to Copy
        </span>
      )}
    </div>
  );
};

export default ColorColumn;