import React from 'react';
import { screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';

describe('', () => {
  it('', async () => {
    const { history } = renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    await wait(3000);
    userEvent.click(screen.getByText(/big mac/i));
    await wait(2000);

    userEvent.click(screen.getByTestId('start-recipe-btn'));

    await wait(2000);
    userEvent.click(screen.getByTestId('favorite-btn'));

    for (let i = 0; i < 14; i += 1) {
      userEvent.click(screen.getByTestId(`${i}-ingredient-step`));
    }
    userEvent.click(screen.getByTestId('finish-recipe-btn'));

    await wait(4000);

    history.push('favorite-recipes');
    await wait(2000);
    userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));

    userEvent.click(screen.getByRole('button', {
      name: /all/i,
    }));

    userEvent.click(screen.getByRole('button', {
      name: /meals/i,
    }));

    userEvent.click(screen.getByRole('button', {
      name: /drinks/i,
    }));
  }, 30000);
});
