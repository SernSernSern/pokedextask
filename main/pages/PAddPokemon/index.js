import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'startupjs'
import { Content } from '@startupjs/ui'
import { AddPokemonComponent } from 'components'
import './index.styl'

export default observer(function PAddPokemon () {
  return pug`
    ScrollView.root
      Content
        AddPokemonComponent
  `
})
