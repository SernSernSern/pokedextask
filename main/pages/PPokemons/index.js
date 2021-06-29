import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'startupjs'
import { Div } from '@startupjs/ui'
import { PokemonsComponent } from 'components'
import './index.styl'

export default observer(function PPokemons () {
  return pug`
    ScrollView.root
      Div.main
        PokemonsComponent
  `
})
