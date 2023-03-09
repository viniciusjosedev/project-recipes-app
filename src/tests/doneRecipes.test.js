import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';

const allBtn = 'filter-by-all-btn';
const byMealBtn = 'filter-by-meal-btn';
const byDrinkBtn = 'filter-by-drink-btn';

describe('All tests from DoneRecipes', () => {
  it('Testa todos os botões presentes na página', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/done-recipes'] });

    userEvent.click(screen.getByTestId(allBtn));
    userEvent.click(screen.getByTestId(byMealBtn));
    userEvent.click(screen.getByTestId(byDrinkBtn));
  });
});
