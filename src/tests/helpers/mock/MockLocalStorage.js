export default class MockLocalStorage {
  constructor() {
    this.store = {
      doneRecipes: [
        {
          id: '52977',
          type: 'drink',
          nationality: 'brazilian',
          category: 'Categoria',
          alcoholicOrNot: 'Non Alcoholic',
          name: 'Sopa',
          image: 'Link da imagem',
          doneDate: '2022/01/01',
          tags: ['muito boa', 'dias frios'],
        },
        {
          id: '52978',
          type: 'meal',
          nationality: 'brazilian',
          category: 'Categoria',
          alcoholicOrNot: 'Non Alcoholic',
          name: 'Sopa',
          image: 'Link da imagem',
          doneDate: '2022/01/01',
          tags: ['difícil', 'para fazer com amigos', 'dias quentes'],
        },
      ],
      favoriteRecipes: [],
    };
  }

  clear = () => {
    this.store = {};
  };

  getItem(key) {
    return JSON.stringify(this.store[key]) || null;
  }

  setItem = (key, value) => {
    this.store[key] = JSON.parse(value);
  };

  removeItem = (key) => {
    delete this.store[key];
  };
}
