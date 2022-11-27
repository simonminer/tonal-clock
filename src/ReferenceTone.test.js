import { render, screen } from '@testing-library/react';
import ReferenceTone from './ReferenceTone.js';

jest.mock('howler');

test('renders reference tone', () => {
  const {container} = render(<ReferenceTone />);
  const referenceToneElement = screen.getByText(/Reference: C2/i);
  expect(referenceToneElement).toBeInTheDocument();
});
