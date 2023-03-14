import React from 'react';
import { screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';

describe('All tests from RecipesDetails', () => {
  const PATH = '/meals/53013';

  it('', async () => {
    const START_RECIPE_BTN = 'start-recipe-btn';
    const { history } = renderWithRouter(
      <DefaultProvider><App /></DefaultProvider>,
      { initialEntries: [PATH] },
    );

    await wait(2000);

    userEvent.click(screen.getByTestId(START_RECIPE_BTN));
    userEvent.click(screen.getByTestId('favorite-btn'));
    userEvent.click(screen.getByTestId('favorite-btn'));
    userEvent.click(screen.getByTestId('share-btn'));

    await wait(2000);
    userEvent.click(screen.getByText(/400g of minced beef/i));

    history.push(PATH);
    await wait(2000);
    expect(screen.getByRole('button', {
      name: /continue recipes/i,
    })).toBeInTheDocument();

    userEvent.click(screen.getByTestId(START_RECIPE_BTN));
    await wait(2000);
    userEvent.click(screen.getByTestId('0-ingredient-step'));

    for (let i = 0; i < 14; i += 1) {
      userEvent.click(screen.getByTestId(`${i}-ingredient-step`));
    }

    userEvent.click(screen.getByTestId('finish-recipe-btn'));
    history.push(PATH);
    await wait(2000);
    expect(screen.queryByTestId(START_RECIPE_BTN)).not.toBeInTheDocument();
  }, 30000);
});
