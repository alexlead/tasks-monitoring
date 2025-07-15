import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


jest.mock('./views/MainPageView', () => () => <div data-testid="main-page">Main Page</div>);

describe('App', () => {
  it('renders MainPageView on any route', () => {
    render(<App />);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});