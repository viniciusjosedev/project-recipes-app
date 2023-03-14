import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';

describe('All tests from Header', () => {
  it('', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.click(screen.getByText(/ingredient/i));
    userEvent.type(screen.getByRole('textbox'), 'burger');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });

  it('', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/drinks'] });

    await wait(3000);

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.click(screen.getByText(/ingredient/i));
    userEvent.type(screen.getByRole('textbox'), 'burger');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });

  it('All tests', async () => {
    const { history } = renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('page-title').textContent).toEqual('Meals');
    userEvent.click(screen.getByTestId('profile-top-btn'));
    history.push('/meals');
    await waitFor(() => {
      userEvent.click(screen.getByTestId('search-top-btn'));
    }, { timeout: 5000 });

    history.push('/favorite-recipes');
    await wait(2000);
    expect(screen.getByText(/favorite recipes/i)).toBeInTheDocument();

    history.push('/profile');
    await wait(2000);
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  }, 30000);

  it('', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.click(screen.getByText(/first letter/i));
    userEvent.type(screen.getByRole('textbox'), 'tomato');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  }, 30000);

  it('', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.click(screen.getByText(/first letter/i));
    userEvent.type(screen.getByRole('textbox'), 't');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });

  it('', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.click(screen.getByText(/ingredient/i));
    userEvent.type(screen.getByRole('textbox'), 'tomato');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });

  it('', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.click(screen.getByText(/name/i));
    userEvent.type(screen.getByRole('textbox'), 'burger');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });
});
