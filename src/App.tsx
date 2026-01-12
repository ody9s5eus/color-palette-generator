import { useState, useEffect, useCallback } from 'react';
import { generateRandomHex } from './utils/colorUtils';
import ColorColumn from './components/ColorColumn';

function App() {
  const [colors, setColors] = useState<string[]>(() => 
    Array.from({ length: 5 }, () => generateRandomHex())
  );

  const generatePalette = useCallback(() => {
    setColors(Array.from({ length: 5 }, () => generateRandomHex()));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent scrolling on space
        generatePalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generatePalette]);

  return (
    <main className="flex flex-col sm:flex-row min-h-screen w-full overflow-hidden relative">
      {colors.map((color, index) => (
        <ColorColumn key={`${color}-${index}`} hex={color} />
      ))}
      
      <button 
        onClick={generatePalette}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg shadow-2xl hover:bg-white/30 transition-all active:scale-95 sm:px-6 sm:py-2 sm:text-base sm:bottom-12"
        aria-label="Generate New Palette"
      >
        Generate
      </button>

      <div className="fixed top-4 left-4 pointer-events-none">
        <h1 className="text-white/50 text-sm font-bold uppercase tracking-widest hidden sm:block">
          Press Space to Generate
        </h1>
      </div>
    </main>
  );
}

export default App;