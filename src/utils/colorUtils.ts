/**
 * Generates a random 6-digit hex color code.
 * @returns {string} A string like "#RRGGBB"
 */
export const generateRandomHex = (): string => {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
};

/**
 * Determines the best contrast color (Black or White) for a given background hex color.
 * Uses the YIQ luminance formula.
 * @param hexcolor Background color in hex format
 * @returns {string} "#000000" for light backgrounds, "#FFFFFF" for dark backgrounds
 */
export const getContrastColor = (hexcolor: string): string => {
  // Remove # if present
  const r = parseInt(hexcolor.substring(1, 3), 16);
  const g = parseInt(hexcolor.substring(3, 5), 16);
  const b = parseInt(hexcolor.substring(5, 7), 16);
  
  // YIQ formula
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  
  return yiq >= 128 ? '#000000' : '#FFFFFF';
};
