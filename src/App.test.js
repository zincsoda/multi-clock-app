import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the clock cities', () => {
  render(<App />);

  expect(screen.getByText('L.A.')).toBeInTheDocument();
  expect(screen.getByText('New York')).toBeInTheDocument();
  expect(screen.getByText('Hong Kong')).toBeInTheDocument();
});

test('lists Hong Kong second', () => {
  render(<App />);

  const cityHeadings = screen.getAllByRole('heading', { level: 2 });
  expect(cityHeadings[0]).toHaveTextContent('L.A.');
  expect(cityHeadings[1]).toHaveTextContent('Hong Kong');
});

test('shell landmark uses stylesheet container class', () => {
  render(<App />);

  const main = screen.getByRole('main', { name: /world clocks/i });
  expect(main).toHaveClass('app-container');
});

test('lists cities in fixed order', () => {
  render(<App />);

  const cityHeadings = screen.getAllByRole('heading', { level: 2 });
  expect(cityHeadings.map((el) => el.textContent)).toEqual([
    'L.A.',
    'Hong Kong',
    'New York',
    'Dublin',
    'Jakarta',
    'Tokyo',
  ]);
});
