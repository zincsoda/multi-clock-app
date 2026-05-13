import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Clock from './Clock';

const fixedUtc = Date.UTC(2020, 5, 10, 15, 30, 45);

test('shows digital time and date until the reading is toggled', () => {
  render(
    <Clock
      city="Hong Kong"
      timezone="Asia/Hong_Kong"
      now={new Date(fixedUtc)}
    />
  );

  expect(document.querySelector('.clock-analog-svg')).not.toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: /Show analogue clock for Hong Kong/i })
  ).toHaveAttribute('aria-pressed', 'false');
});

test('clicking the digital clock shows an analogue face and toggles back', async () => {
  render(
    <Clock city="Paris" timezone="Europe/Paris" now={new Date(fixedUtc)} />
  );

  const toggle = screen.getByRole('button', {
    name: /Show analogue clock for Paris/i,
  });
  await userEvent.click(toggle);

  expect(document.querySelector('.clock-analog-svg')).toBeInTheDocument();
  expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await userEvent.click(
    screen.getByRole('button', { name: /Show digital time for Paris/i })
  );

  expect(document.querySelector('.clock-analog-svg')).not.toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
});
