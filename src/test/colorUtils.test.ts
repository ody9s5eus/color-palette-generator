import { describe, it, expect } from 'vitest';
import { generateRandomHex, getContrastColor } from '../utils/colorUtils';

describe('colorUtils', () => {
  describe('generateRandomHex', () => {
    it('should generate a valid 6-digit hex color starting with #', () => {
      const hex = generateRandomHex();
      expect(hex).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should generate different colors over multiple calls', () => {
      const hex1 = generateRandomHex();
      const hex2 = generateRandomHex();
      expect(hex1).not.toBe(hex2);
    });
  });

  describe('getContrastColor', () => {
    it('should return white for dark colors', () => {
      expect(getContrastColor('#000000')).toBe('#FFFFFF');
      expect(getContrastColor('#333333')).toBe('#FFFFFF');
      expect(getContrastColor('#0000FF')).toBe('#FFFFFF'); // Pure Blue
    });

    it('should return black for light colors', () => {
      expect(getContrastColor('#FFFFFF')).toBe('#000000');
      expect(getContrastColor('#EEEEEE')).toBe('#000000');
      expect(getContrastColor('#FFFF00')).toBe('#000000'); // Pure Yellow
    });
  });
});
