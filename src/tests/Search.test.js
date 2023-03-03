import React from 'react';
import { screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';

describe('All tests from Search', () => {
  it('All tests', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'chicken');
    userEvent.click(screen.getByLabelText('nome'));
    userEvent.click(screen.getByLabelText('ingrediente'));
    userEvent.click(screen.getByTestId('exec-search-btn'));

    await wait(1000);
    const chikenResult = screen.getByRole('img', {
      name: /brown stew chicken/i,
    });
    expect(chikenResult).toBeInTheDocument();
  });
  it('More tests', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'chicken');
    userEvent.click(screen.getByLabelText('primeira letra'));
    userEvent.click(screen.getByTestId('exec-search-btn'));

    jest.spyOn(global, 'alert').mockReturnValue('Your search must have only 1 (one) characterxablau');

    expect(global.alert).toHaveBeenCalled();
  });
  it('More tests', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'ashuaushahihausas');
    userEvent.click(screen.getByLabelText('nome'));
    userEvent.click(screen.getByTestId('exec-search-btn'));

    jest.spyOn(global, 'alert').mockReturnValue('Sorry, we haven\'t found any recipes for these filters.');

    expect(global.alert).toHaveBeenCalled();
  });
});
