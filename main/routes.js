export default (components = {}) => [
  {
    path: '/add',
    exact: true,
    component: components.PAddPokemon
  },
  {
    path: '/add/:id',
    exact: true,
    component: components.PAddPokemon
  },
  {
    path: '/',
    exact: true,
    component: components.PPokemons
  },
  {
    path: '/pokemon/:id',
    exact: true,
    component: components.PPokemon
  },
  {
    path: '/pokemon/search/:name',
    exact: true,
    component: components.PPokemons
  },
  {
    path: '/pokemon/',
    exact: true,
    component: components.PPokemons
  }
]
