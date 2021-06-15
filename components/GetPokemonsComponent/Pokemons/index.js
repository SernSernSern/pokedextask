import React from 'react'
import { observer, emit, u } from 'startupjs' 
import { Row, Card, Span } from '@startupjs/ui'
import { Image } from 'react-native'

import './index.styl'

export default observer(function Pokemons ({pokemon}) {

  const imageStyle = {
    width: u(24),
    height: u(20),
    resizeMode: 'contain', 
  }

  return pug`
  Row.centerElement(wrap=true)
    each pok, index in pokemon
      Card.card(key=index pushed='s' onPress =() => emit('url', '/pokemon/' + pok.id))
        Image(style = imageStyle source = {uri: pok.url})
        Span=pok.number
        Span=pok.name
        Row
          Span(styleName='types'+pok.type[0])=pok.type[0]
          Span(styleName='types first'+pok.type[1])=pok.type[1]
  `
})
