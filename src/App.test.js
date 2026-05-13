import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the clock cities', () => {
  render(<App />);

  expect(screen.getByText('L.A.')).toBeInTheDocument();
  expect(screen.getByText('New York')).toBeInTheDocument();
  expect(screen.getByText('Hong Kong')).toBeInTheDocument();
});

test('lists Hong Kong last', () => {
  render(<App />);

  const cityHeadings = screen.getAllByRole('heading', { level: 2 });
  expect(cityHeadings[cityHeadings.length - 1]).toHaveTextContent('Hong Kong');
});

test('lists cities in fixed order', () => {
  render(<App />);

  const cityHeadings = screen.getAllByRole('heading', { level: 2 });
  expect(cityHeadings.map((el) => el.textContent)).toEqual([
    'L.A.',
    'New York',
    'Dublin',
    'Jakarta',
    'Tokyo',
    'Hong Kong',
  ]);
});
