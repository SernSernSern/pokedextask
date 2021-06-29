import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'startupjs'
import { Div } from '@startupjs/ui'
import { PokemonComponent } from 'components'

import './index.styl'

export default observer(function PPokemon () {
  return pug`
    ScrollView
      Div.root
        PokemonComponent
  `
})
