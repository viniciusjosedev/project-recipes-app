import React from 'react';
import { screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const exercBtn = 'exec-search-btn';

describe('All tests from Search', () => {
  it('All tests', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'chicken');
    userEvent.click(screen.getByLabelText('nome'));
    userEvent.click(screen.getByLabelText('ingrediente'));
    userEvent.click(screen.getByTestId(exercBtn));

    await wait(3000);
    expect(screen.getByTestId('0-card-img')).toBeInTheDocument();
  });
  it('More tests', async () => {
    jest.spyOn(global, 'alert');
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'chicken');
    userEvent.click(screen.getByLabelText('primeira letra'));
    userEvent.click(screen.getByTestId(exercBtn));

    await wait(3000);

    expect(global.alert).toHaveBeenCalled();
  });
  it('More tests', async () => {
    jest.spyOn(global, 'alert');

    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'ashuaushahihausas');
    userEvent.click(screen.getByLabelText('nome'));
    userEvent.click(screen.getByTestId(exercBtn));

    await wait(3000);

    expect(global.alert).toHaveBeenCalled();
  });
});
