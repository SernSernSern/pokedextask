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
  const [name = '', $name] = usePage('pokemons/searchByName')
  const [selected = [], $selected] = usePage('pokemons/selected')

  const textInputProps = {}
  if (name) {
    textInputProps.secondaryIcon = faTimesCircle
    textInputProps.onSecondaryIconPress = () => $name.set('')
  }

  return pug`
    Portal.Provider
      Content
        Row
          TextInput.input(
            value=name
            onChangeText=text => $name.set(text)
            ...textInputProps
          )
        Div.multySearch
          Multiselect(
            styleName='port'
            value=selected
            options=checkboxes
            onChange=value => $selected.set(value)
          )
  `
})
