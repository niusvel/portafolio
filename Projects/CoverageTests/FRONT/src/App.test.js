import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './App';

test('renders select and button', () => {
  render(<Home />);

  const selectElement = screen.getByTestId('select');
  const buttonElement = screen.getByTestId('btn');

  expect(selectElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('handles select change and button click', () => {
  render(<Home />);

  const selectElement = screen.getByTestId('select');
  const buttonElement = screen.getByTestId('btn');

  fireEvent.change(selectElement, { target: { value: 'option2' } });
  fireEvent.click(buttonElement);
});
