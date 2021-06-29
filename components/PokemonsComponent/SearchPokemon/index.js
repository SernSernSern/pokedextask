import React from 'react'
import { observer, usePage } from 'startupjs'
import { Div, Content, Row, TextInput, Portal, Multiselect } from '@startupjs/ui'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const checkboxes = ['Bug', 'Dragon', 'Fairy', 'Fire', 'Ghost', 'Ground',
  'Normal', 'Psychic', 'Steel', 'Dark', 'Electric', 'Fighting', 'Flying',
  'Grass', 'Ice', 'Poison', 'Rock', 'Water'
]

export default observer(function SearchPokemon () {
  const [name = { $regex: '' }, $name] = usePage('pokemons.queryParam.name')
  const [type = [], $type] = usePage('pokemons.queryParam.type')

  const textInputProps = {}
  if (name.$regex) {
    textInputProps.secondaryIcon = faTimesCircle
    textInputProps.onSecondaryIconPress = () => $name.set('$regex', '')
  }

  return pug`
    Portal.Provider
      Content
        Row
          TextInput.input(
            placeholder='Search pokemon'
            value=name.$regex
            onChangeText=text => $name.set('$regex', text)
            ...textInputProps
          )
        Div.multySearch
          Multiselect(
            styleName='port'
            value=type
            options=checkboxes
            onChange=value => $type.set(value)
          )
  `
})
