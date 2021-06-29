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
  const [queryParams, $queryParams] = usePage('pokemons.queryParam')
  if (!queryParams) {
    $queryParams.set('name', { $regex: '' })
    $queryParams.set('$limit', 10)
    $queryParams.set('$skip', 0)
    $queryParams.set('type', [])
  }
  const query = useMemo(() => {
    const _query = $queryParams.getCopy()
    if ($queryParams.get('type')) {
      if ($queryParams.get('type').length > 0) {
        _query.type = { $in: $queryParams.getCopy('type') }
      } else {
        $queryParams.del('type')
      }
    }
    return _query
  }, [JSON.stringify(queryParams)])
  const [pokemons] = useQuery('pokemon', query)
  return pug`
    Row.centerElement(wrap)
      each pok, index in pokemons
        Card.card(
          key=pok.id
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
