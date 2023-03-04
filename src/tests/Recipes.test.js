import { screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import DefaultProvider from '../context/DefaultProvider';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const exercBtn = 'exec-search-btn';

describe('testing the Recipes functions', () => {
  it('Testa se ao pesquisar por uma receita específica, a página navega até os detalhes dessa receita', async () => {
    const { history } = renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'Corba');
    userEvent.click(screen.getByLabelText('nome'));
    userEvent.click(screen.getByTestId(exercBtn));

    await wait(1000);
    const atualUrl = history.location.pathname;

    expect(atualUrl).toBe('/meals/52977');
  });
});
