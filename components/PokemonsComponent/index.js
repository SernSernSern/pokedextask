import React from 'react'
import { observer } from 'startupjs'
import { Div } from '@startupjs/ui'
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import SearchPokemon from './SearchPokemon'

import './index.styl'

export default observer(function PokemonsComponent () {
  return pug`
    Div
      SearchPokemon
      PokemonList
      Pagination
  `
})
