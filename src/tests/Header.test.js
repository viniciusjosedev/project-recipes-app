import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';

describe('All tests from Header', () => {
  it('All tests', async () => {
    const { history } = renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('page-title').textContent).toEqual('Meals');
    userEvent.click(screen.getByTestId('profile-top-btn'));
    history.push('/meals');
    await waitFor(() => {
      userEvent.click(screen.getByTestId('search-top-btn'));
    }, { timeout: 5000 });
  }, 30000);

  it('More tests', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'tomato');
  }, 30000);
});
