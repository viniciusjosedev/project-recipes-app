import funcNameHeader from '../helpers/nameHeader';

describe('All tests from funcNameHeader', () => {
  it('', () => {
    expect(funcNameHeader('/done-recipes')).toEqual(['Done Recipes', false]);
    expect(funcNameHeader('/favorite-recipes')).toEqual(['Favorite Recipes', false]);
  });
});
