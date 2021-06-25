import React, { useMemo } from 'react'
import { Image } from 'react-native'
import { observer, emit, u, usePage, useQuery } from 'startupjs'
import { Row, Card, Span } from '@startupjs/ui'

import './index.styl'

const imageStyle = {
  width: u(26),
  height: u(24),
  resizeMode: 'contain'
}

export default observer(function PokemonList () {
  const [name = ''] = usePage('pokemons/searchByName')
  const [limit = 10] = usePage('pokemons/pagination/limit')
  const [offset = 0] = usePage('pokemons/pagination/offset')
  const [selected = []] = usePage('pokemons/selected')
  const query = useMemo(() => {
    const _query = { name: { $regex: name }, $limit: limit, $skip: offset }
    if (selected.length) _query.type = { $in: selected }
    return _query
  }, [JSON.stringify(selected), limit, name, offset])
  const [pokemons] = useQuery('pokemon', query)
  return pug`
    Row.centerElement(wrap)
      each pok, index in pokemons
        Card.card(
          key=index
          onPress =() => emit('url', '/pokemon/' + pok.id)
          styleName={first:!index} 
        )
          Image(style = imageStyle source = {uri: pok.url})
          Span=pok.number
          Span=pok.name
          Row
            Span(styleName='types'+pok.type[0])=pok.type[0]
            Span(styleName='types first'+pok.type[1])=pok.type[1]
  `
})
