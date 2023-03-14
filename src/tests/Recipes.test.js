import { screen, waitFor } from '@testing-library/react';
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
    userEvent.click(screen.getByText(/name/i));
    userEvent.click(screen.getByTestId(exercBtn));

    await wait(1000);
    const atualUrl = history.location.pathname;

    expect(atualUrl).toBe('/meals/52977');
  });

  it('Testa os botões do componente Recipes', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });
    await wait(1500);
    const beefButton = screen.getByRole('button', {
      name: /beef/i,
    });

    const breakfastButton = screen.getByRole('button', {
      name: /breakfast/i,
    });

    const chickenButton = screen.getByRole('button', {
      name: /chicken/i,
    });

    const dessertButton = screen.getByRole('button', {
      name: /dessert/i,
    });

    const goatButton = screen.getByRole('button', {
      name: /goat/i,
    });
    const allButton = screen.getByTestId('All-category-filter');

    userEvent.click(beefButton);

    await wait(1000);
    const beefNmustardPie = screen.getByText(/beef and mustard pie/i);

    expect(beefButton).toBeInTheDocument();
    expect(breakfastButton).toBeInTheDocument();
    expect(chickenButton).toBeInTheDocument();
    expect(dessertButton).toBeInTheDocument();
    expect(goatButton).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
    expect(beefNmustardPie).toBeInTheDocument();
  });

  it('', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] }); renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    await waitFor(() => {
      userEvent.click(screen.getByTestId('Beef-category-filter'));
      userEvent.click(screen.getByTestId('Beef-category-filter'));
    }, { timeout: 5000 });
  }, 30000);

  it('', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] }); renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    await waitFor(() => {
      userEvent.click(screen.getByTestId('Goat-category-filter'));
      userEvent.click(screen.getByTestId('Goat-category-filter'));
    }, { timeout: 5000 });
  }, 30000);
});
