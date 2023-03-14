import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';

describe('All tests from Header', () => {
  const SEARCH_TOP_BTN = 'search-top-btn';
  const EXEC_SEARCH_BTN = 'exec-search-btn';
  it('', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    await wait(4000);

    userEvent.click(screen.getByRole('button', {
      name: /beef/i,
    }));

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByText(/ingredient/i));
    userEvent.type(screen.getByRole('textbox'), 'burger');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
  });

  it('', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/drinks'] });

    await wait(3000);

    screen.getByRole('button', {
      name: /ordinary drink/i,
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByText(/ingredient/i));
    userEvent.type(screen.getByRole('textbox'), 'burger');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
  });

  it('All tests', async () => {
    const { history } = renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('page-title').textContent).toEqual('Meals');
    userEvent.click(screen.getByTestId('profile-top-btn'));
    history.push('/meals');
    await waitFor(() => {
      userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
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

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByText(/first letter/i));
    userEvent.type(screen.getByRole('textbox'), 'tomato');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
  }, 30000);

  it('', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByText(/first letter/i));
    userEvent.type(screen.getByRole('textbox'), 't');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
  });

  it('', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByText(/ingredient/i));
    userEvent.type(screen.getByRole('textbox'), 'tomato');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
  });

  it('', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByText(/name/i));
    userEvent.type(screen.getByRole('textbox'), 'burger');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
  });
});
