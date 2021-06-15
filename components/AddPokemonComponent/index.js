import React, { useState, useMemo } from 'react'
import { Div, TextInput, Button, ArrayInput, Select, Content} from '@startupjs/ui'
import { observer, useQuery, useValue, useLocal, useDoc, emit } from 'startupjs'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './index.styl'
import { useEffect } from 'react/cjs/react.development'

export default observer(function AddPokemonComponent () {
  const [name, $name] = useState('')
  const [id] = useLocal('$render.params.id')
  const [pokemonEdit, $pokemonEdit] = useDoc('pokemon', id)
  const [about, $about] = useState('')
  const [url, $url] = useState('')
  const [value, $value] = useValue()
  const [pokemon, $pokemon] = useQuery('pokemon', {})
  const [type, setType] = useState()
  const [typeTwo, setTypeTwo] = useState()
  const [disab, setDisab] = useState(true)
  const [option, setOption] = useState([])
  const add = async () => {
    if(!name || !value || !url || !type || pokemon.filter(e => e.name === name).length > 0) return
    else{
      await $pokemon.add({
        number: pokemon.length + 1,
        name: name,
        about: about,
        ability: value,
        type: [type, typeTwo],
        url: url
      })
      $name('')
      $about('')
      $url('')
      setType('')
      setTypeTwo('')
    }
  }
  
  useEffect(()=>{
    if(id){
      setDisab(false)
      $name(pokemonEdit.name)
      $about(pokemonEdit.about)
      $url(pokemonEdit.url)
      setType(pokemonEdit.type[0])
      setOption(OPTIONS.filter(function(e){return e != type}))
      setTypeTwo(pokemonEdit.type[1])
      pokemonEdit.ability.forEach(element => {
        $value.push(element)
      });
      
    }
  }, [])

  const OPTIONS = ['Bug', 'Dragon', 'Fairy', 'Fire', 'Ghost', 'Ground',
    'Normal', 'Psychic', 'Steel', 'Dark', 'Electric', 'Fighting', 'Flying',
    'Grass', 'Ice', 'Poison', 'Rock', 'Water'
  ]
  
  const change = (some) => {
    if(!some) {
      setType('')
      setTypeTwo('')
      setDisab(true)
    }else{
      setDisab(false)
      setOption(OPTIONS.filter(function(e){return e != some}))
      setType(some)
    }
  }

  const edit = async() => {
    if(!name || !value || !url || !type || pokemon.filter(e => e.name === name && e.name != pokemonEdit.name).length > 0){ 
      return
    }else{
      await $pokemonEdit.set({
        number:pokemonEdit.number,
        name: name,
        about: about,
        ability: value,
        type: [type, typeTwo],
        url: url
      })
      emit('url', '/')
  }
  }

  return pug`
    Div 
      TextInput(
        label='Name pokemon'
        value=name
        onChangeText=$name
      )
      Select(
        label='Choose type'
        value=type
        onChange= value => change(value)
        options=OPTIONS
      )
      Select(
        label='Choose type'
        value=typeTwo
        onChange=setTypeTwo
        options=option
        disabled=disab
      )
      ArrayInput(
        value=value
        $value=$value
        label='Ability'
        items={
          input: 'text'
        }
      )
      TextInput(
        value=about
        onChangeText=$about
        label='About pokemon'
      )
      TextInput(
        value=url
        onChangeText=$url
        label='Picture url'
      )
      Button(
        onPress= id ? edit : add
        icon=faPlus
      )
  `
})