import React from 'react'
import { observer, usePage, useQuery } from 'startupjs'
import { Pagination, Content, Row, Select } from '@startupjs/ui'

import './index.styl'

const option = [10, 15, 20]

export default observer(function PokemonList () {
  const [count] = useQuery('pokemon', { $count: 'count' })
  const [limit = 10, $limit] = usePage('pokemons/pagination/limit')
  const [offset = 0, $offset] = usePage('pokemons/pagination/offset')

  return pug`
    Content.main
      Row(align='center')
        Pagination(
          align='center'
          page=offset
          count=count
          limit=limit
          onChangePage=val => $offset.set( val)
        )
        Select.selection(
          value=limit
          onChange=value => $limit.set( value)
          options=option
          showEmptyValue=false
        )
  `
})
