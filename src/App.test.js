import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the clock cities', () => {
  render(<App />);

  expect(screen.getByText('L.A.')).toBeInTheDocument();
  expect(screen.getByText('New York')).toBeInTheDocument();
  expect(screen.getByText('Hong Kong')).toBeInTheDocument();
});
