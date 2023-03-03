import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import DefaultProvider from '../context/DefaultProvider';
import App from '../App';

describe('testing the Footer component', () => {
  it('testa se tem um elemento footer', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/profile'] });

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('testa se tem um botão drinks', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/profile'] });

    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });
  it('testa se tem um botão meals', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/profile'] });

    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
  });
  it('testa se ao clicar no botão drinks ele joga para a rota /drinks', () => {
    const { history } = renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/profile'] });

    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    expect(history.location.pathname).toBe('/drinks');
  });
  it('testa se ao clicar no botão meals ele joga para a rota /meals', () => {
    const { history } = renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/profile'] });

    userEvent.click(screen.getByTestId('meals-bottom-btn'));
    expect(history.location.pathname).toBe('/meals');
  });
});
