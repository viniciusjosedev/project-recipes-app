import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { wait } from '@testing-library/user-event/dist/utils';
import renderWithRouter from './helpers/renderWithRouter';
import DefaultProvider from '../context/DefaultProvider';
import App from '../App';

describe('Testes da página de perfil', () => {
  it('testa se o email do usuário aparece na tela', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>);
    const userEmail = 'testonildo@TextDecoderStream.com';
    const userPassword = 'StrongP@ssword';

    await wait(2000);

    userEvent.type(screen.getByTestId('email-input'), userEmail);
    userEvent.type(screen.getByTestId('password-input'), userPassword);
    userEvent.click(screen.getByRole('button', {
      name: /enter/i,
    }));
    const btnProfile = await screen.findByTestId('profile-top-btn');
    userEvent.click(btnProfile);
    const titleProfile = await screen.findByRole('heading', {
      name: /profile/i,
    });
    expect(titleProfile).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByText(userEmail)).toBeInTheDocument();

    const btnDoneRecipes = screen.getByRole('button', {
      name: /done recipes/i,
    });
    userEvent.click(btnDoneRecipes);
    const titleDoneRecipes = await screen.findByTestId('page-title');
    expect(titleDoneRecipes).toBeInTheDocument();
    userEvent.click(btnProfile);
    const btnFavoriteRecipes = await screen.findByTestId('profile-favorite-btn');
    userEvent.click(btnFavoriteRecipes);
    const titleFavoriteRecipes = await screen.findByTestId('page-title');
    expect(titleFavoriteRecipes).toBeInTheDocument();
    userEvent.click(btnProfile);
    const btnLogout = await screen.findByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(localStorage.getItem('user')).toEqual(null);
  });
});
