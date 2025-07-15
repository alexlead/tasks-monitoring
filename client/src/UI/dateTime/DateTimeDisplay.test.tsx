import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import DateTimeDisplay from './DateTimeDisplay';

describe('DateTimeDisplay', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-07-15T12:34:56'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders current date and time', () => {
    render(<DateTimeDisplay />);
    expect(screen.getByText(/07\/15\/2024/i)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('12:34:56'))).toBeInTheDocument();
  });

  it('updates time every second', () => {
    render(<DateTimeDisplay />);
    expect(screen.getByText((content) => content.includes('12:34:56'))).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText((content) => content.includes('12:34:57'))).toBeInTheDocument();
  });
});