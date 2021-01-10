import { render } from '@testing-library/react';
import React from 'react';
import { screen } from '@testing-library/dom';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

test('title and labels', () => {
  render(<App />);
  const title = screen.getByText('Simple Theme Editor');
  expect(title).toBeInTheDocument();

  const labelGeneral = screen.getByText('GENERAL COLORS');
  expect(labelGeneral).toBeInTheDocument();

  const labelGlobal = screen.getByText('GLOBAL SIZES');
  expect(labelGlobal).toBeInTheDocument();

  const labelTextfield = screen.getByText('TEXT FIELD');
  expect(labelTextfield).toBeInTheDocument();

  const labelButtons = screen.getByText('BUTTONS');
  expect(labelButtons).toBeInTheDocument();
});
