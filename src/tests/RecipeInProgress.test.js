import React from 'react';
import { screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';

describe('All tests from RecipeInProgress', () => {
  it('', async () => {
    const { history } = renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    await wait(2000);
    userEvent.click(screen.getByText(/big mac/i));
    await wait(2000);
    userEvent.click(screen.getByTestId('start-recipe-btn'));
    history.push('/drinks/12798/in-progress');
    await wait(2000);
    expect(screen.getByRole('heading', {
      name: /coffee liqueur/i,
    })).toBeInTheDocument();
  }, 30000);
});
