import { render, screen } from '@testing-library/react';
import App from './App';
import mockaudioContext from './mock-audio-context.js';

jest.mock('howler');

beforeEach(() => {
  window.AudioContext = mockaudioContext;
});

test('renders tonal clock heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/tonal clock/i);
  expect(headingElement).toBeInTheDocument();
});
