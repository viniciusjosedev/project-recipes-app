import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('All tests from Header', () => {
  it('All tests', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('page-title').textContent).toEqual('Meals');
    useEvent.click(screen.getByTestId('profile-top-btn'));
    history.push('/meals');
    await waitFor(() => {
      userEvent.click(screen.getByTestId('search-top-btn'));
    }, { timeout: 5000 });
  }, 30000);
});
