import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';
import MockLocalStorage from './helpers/mock/MockLocalStorage';

// const localStoragedoRecipes = {
//   doneRecipes: [
//     {
//       id: '52977',
//       type: 'drink',
//       nationality: 'brazilian',
//       category: 'Categoria',
//       alcoholicOrNot: 'Non Alcoholic',
//       name: 'Sopa',
//       image: 'Link da imagem',
//       doneDate: '2022/01/01',
//       tags: ['muito boa', 'dias frios'],
//     },
//     {
//       id: '52978',
//       type: 'meal',
//       nationality: 'brazilian',
//       category: 'Categoria',
//       alcoholicOrNot: 'Non Alcoholic',
//       name: 'Sopa',
//       image: 'Link da imagem',
//       doneDate: '2022/01/01',
//       tags: ['difícil', 'para fazer com amigos', 'dias quentes'],
//     },
//   ],
// };

const mockLocalStorage1 = () => {
  Object.defineProperty(window, 'localStorage', {
    value: new MockLocalStorage(),
  });
};

describe('All tests from RecipesDetails', () => {
  it('xXx xXx xXx', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals/52977'] });

    const startRecBtn = screen.getByRole('button', {
      name: /start recipes/i,
    });

    expect(startRecBtn).toBeInTheDocument();
  });
});

describe('All tests from RecipesDetails', () => {
  beforeEach(() => {
    mockLocalStorage1();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('xXx xXx xXx', async () => { //                                                   Da pra melhorar?
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals/52977'] });

    const recipePic = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCateg = screen.getByTestId('recipe-category');
    const recipeInstruc = screen.getByTestId('instructions');

    const shareBtn = screen.getByRole('button', {
      name: /compartilhar/i,
    });

    expect(recipePic).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCateg).toBeInTheDocument();
    expect(recipeInstruc).toBeInTheDocument();

    expect(shareBtn).toBeInTheDocument();
  });
});
