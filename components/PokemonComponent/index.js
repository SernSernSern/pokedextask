import React from 'react'
import { observer, useDoc, emit, useLocal } from 'startupjs'
import { Image } from 'react-native'
import { Span, Content, Button, Card, H3, Row } from '@startupjs/ui'
import { faArrowLeft, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import './index.styl'

export default observer(function PokemonComponent () {
  const [id] = useLocal('$render.params.id')
  const [pokemon, $pokemon] = useDoc('pokemon', id)

  const remove = () => {
    $pokemon.del()
    emit('url', '/')
  }

  const back = () => {
    emit('url', '/')
  }

  const edit = () => {
    emit('url', '/add/' + id)
  }

  return pug`
    Card
      Row(align='between')
        Button(
          icon = faArrowLeft
          onPress=() => back()
        )
        Row
          H3=pokemon.name
          H3.title=pokemon.number
        Button(
          icon = faEdit
          onPress=() => edit()
        )
      Content
        Row(align='center')
          Image.image(source={uri: pokemon.url} resizeMode='contain')
        Span.aboutPokemon=pokemon.about
        Row.pokemonTypes(align='between')
          Span(styleName='types'+pokemon.type[0])=pokemon.type[0]
          Span(styleName='types first'+pokemon.type[1])=pokemon.type[1]
        Card.typesDescription
          Row(wrap)
            each item, index in pokemon.ability
              Card(key=index pushed='s')
                Span=item
        Row(align='center')
          Button.button(
          size='s'
          onPress= () => remove()
          icon=faTrash
          )
  `
})
