import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderMenu from './HeaderMenu';

jest.mock('../../UI/dateTime/DateTimeDisplay', () => () => <div data-testid="date-time-display">DateTime</div>);

describe('HeaderMenu', () => {
  it('renders greeting and DateTimeDisplay', () => {
    render(<HeaderMenu />);
    expect(screen.getByText('Hi, Admin')).toBeInTheDocument();
    expect(screen.getByTestId('date-time-display')).toBeInTheDocument();
  });
  
  it('renders person icon', () => {
      render(<HeaderMenu />);
      expect(document.querySelector('.bi-person-circle')).toBeInTheDocument();
    });
});