import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders correctly with initial 5 colors', () => {
    render(<App />);
    const hexCodes = screen.getAllByText(/#[0-9A-F]{6}/i);
    expect(hexCodes).toHaveLength(5);
  });

  it('has responsive container classes', () => {
    render(<App />);
    const main = screen.getByRole('main');
    expect(main.className).toContain('flex-col');
    expect(main.className).toContain('sm:flex-row');
  });

  it('updates colors when Generate button is clicked', () => {
    render(<App />);
    const initialHexCodes = screen.getAllByText(/#[0-9A-F]{6}/i).map(el => el.textContent);
    
    const generateBtn = screen.getByRole('button', { name: /generate/i });
    fireEvent.click(generateBtn);
    
    const updatedHexCodes = screen.getAllByText(/#[0-9A-F]{6}/i).map(el => el.textContent);
    expect(initialHexCodes).not.toEqual(updatedHexCodes);
  });

  it('updates colors when spacebar is pressed', () => {
    render(<App />);
    const initialHexCodes = screen.getAllByText(/#[0-9A-F]{6}/i).map(el => el.textContent);
    
    fireEvent.keyDown(window, { code: 'Space' });
    
    const updatedHexCodes = screen.getAllByText(/#[0-9A-F]{6}/i).map(el => el.textContent);
    expect(initialHexCodes).not.toEqual(updatedHexCodes);
  });
});
