import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

it('renders the app title', async () => {
  render(<App />);
  expect(await screen.findByText(/MFA DEADLINE/i)).toBeInTheDocument();
});
