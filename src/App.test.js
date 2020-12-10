import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { debug } = render(<App />);
  const linkElement = screen.getByText(/Simple Theme Editor/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement = screen.getByText(/General Colors/i);
  expect(linkElement).toBeInTheDocument();

  debug();
});
