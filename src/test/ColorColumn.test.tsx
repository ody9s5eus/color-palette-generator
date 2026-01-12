import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ColorColumn from '../components/ColorColumn';

describe('ColorColumn', () => {
  const testHex = '#FF0000';

  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it('renders the hex code text', () => {
    render(<ColorColumn hex={testHex} />);
    expect(screen.getByText(testHex)).toBeDefined();
  });

  it('applies the correct background color style', () => {
    render(<ColorColumn hex={testHex} />);
    const column = screen.getByTestId('color-column');
    expect(column.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('copies hex code to clipboard when clicked', async () => {
    render(<ColorColumn hex={testHex} />);
    const column = screen.getByTestId('color-column');
    
    await act(async () => {
      fireEvent.click(column);
    });
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testHex);
  });

  it('shows "Copied!" feedback when clicked', async () => {
    vi.useFakeTimers();
    render(<ColorColumn hex={testHex} />);
    const column = screen.getByTestId('color-column');
    
    await act(async () => {
      fireEvent.click(column);
    });
    
    expect(screen.getByText(/copied/i)).toBeDefined();
    
    // Fast-forward time to check if it disappears
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(screen.queryByText(/copied/i)).toBeNull();
    vi.useRealTimers();
  });
});
