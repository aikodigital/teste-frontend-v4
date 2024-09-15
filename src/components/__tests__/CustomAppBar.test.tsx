/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomAppBar from '../CustomAppBar';

// Mock the MUI components
jest.mock('@mui/material', () => ({
  AppBar: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <header data-testid="app-bar" {...props}>
      {children}
    </header>
  ),
  Toolbar: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="toolbar" {...props}>
      {children}
    </div>
  ),
  Typography: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="typography" {...props}>
      {children}
    </div>
  ),
  IconButton: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <button data-testid="icon-button" {...props}>
      {children}
    </button>
  ),
  styled: (component: any) => component,
}));

// Mock the AccountCircle icon
jest.mock('@mui/icons-material/AccountCircle', () => () => (
  <div data-testid="account-circle-icon" />
));

// Mock the image import
jest.mock('../../assets/geoEquipLogo.png', () => 'mocked-image-path');

describe('CustomAppBar', () => {
  it('renders the user name', () => {
    render(<CustomAppBar userName="John Doe" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders the GeoEquip title', () => {
    render(<CustomAppBar userName="John Doe" />);
    expect(screen.getByText('GeoEquip')).toBeInTheDocument();
  });

  it('renders the logo', () => {
    render(<CustomAppBar userName="John Doe" />);
    const logo = screen.getByAltText('GeoEquip Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'mocked-image-path');
  });

  it('renders the app bar structure', () => {
    render(<CustomAppBar userName="John Doe" />);
    expect(screen.getByTestId('app-bar')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
    expect(screen.getByTestId('icon-button')).toBeInTheDocument();
  });
});
