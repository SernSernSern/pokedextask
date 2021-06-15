import React from 'react'
import { ScrollView } from 'react-native'
import { observer, useLocal } from 'startupjs'
import { Content, Div } from '@startupjs/ui'
import { GetPokemonComponent } from 'components'

import './index.styl'

export default observer(function PPokemon () {
  return pug`
    ScrollView
      Div.root
        GetPokemonComponent
      
  `
})
