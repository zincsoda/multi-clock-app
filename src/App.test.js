import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the clock cities', () => {
  render(<App />);

  expect(screen.getByText('L.A.')).toBeInTheDocument();
  expect(screen.getByText('New York')).toBeInTheDocument();
  expect(screen.getByText('Hong Kong')).toBeInTheDocument();
});

test('lists Hong Kong first', () => {
  render(<App />);

  const cityHeadings = screen.getAllByRole('heading', { level: 2 });
  expect(cityHeadings[0]).toHaveTextContent('Hong Kong');
});
