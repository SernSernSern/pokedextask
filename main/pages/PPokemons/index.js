import React from 'react'
import { Text, ScrollView, ImageBackground } from 'react-native'
import { observer } from 'startupjs'
import { Content, Div, Layout } from '@startupjs/ui'
import { GetPokemonsComponent } from 'components'
import './index.styl'

export default observer(function PPokemons () {
  return pug`
    ScrollView.root
        Div.main
          GetPokemonsComponent
  `
})
