import React from 'react';
import { screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';

describe('All tests from App.jsx', () => {
  it('Testing all rotes', async () => {
    const { history } = renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });
    await wait(5000);
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    await wait(5000);
    userEvent.click(screen.getByTestId('0-card-img'));
    history.push('/done-recipes');
  }, 30000);
});
