import React, { useState, useEffect, useMemo } from 'react'
import { observer, useQuery, useValue, useLocal, useDoc, emit } from 'startupjs'
import { Div, Button, Input } from '@startupjs/ui'

import './index.styl'

const OPTIONS = ['Bug', 'Dragon', 'Fairy', 'Fire', 'Ghost', 'Ground',
  'Normal', 'Psychic', 'Steel', 'Dark', 'Electric', 'Fighting', 'Flying',
  'Grass', 'Ice', 'Poison', 'Rock', 'Water'
]

export default observer(function AddPokemonComponent () {
  const [errors, $errors] = useValue({})
  const [name, setName] = useState('')
  const [id] = useLocal('$render.params.id')
  const [pokemonEdit, $pokemonEdit] = useDoc('pokemon', id)
  const [about, setAbout] = useState('')
  const [url, setUrl] = useState('')
  const [value, $value] = useValue([])
  const [pokemon, $pokemon] = useQuery('pokemon', {})
  const [firstType, setFirstType] = useState()
  const [secondType, setSecondType] = useState()
  const [disab, setDisab] = useState(true)
  const [option, setOption] = useState([])

  const query = useMemo(() => {
    return { name: name }
  }, [name])

  const [pokemonNames] = useQuery('pokemon', query)

  const add = async () => {
    if (!name || !value || !url || !firstType || pokemonNames.length > 0) {
      !name && $errors.set('name', 'Require name')
      !value && $errors.set('ability', 'Require ability')
      !url && $errors.set('url', 'Require url picture')
      !value && $errors.set('ability', 'Require ability')
      !firstType && $errors.set('type', 'You need at least one type of Pokémon')
      pokemonNames.length > 0 && $errors.set('name', 'This Pokemon already exists')
    } else {
      await $pokemon.add({
        number: pokemon.length + 1,
        name: name,
        about: about,
        ability: value,
        type: [firstType, secondType],
        url: url
      })
      setName('')
      setAbout('')
      setUrl('')
      setFirstType('')
      setSecondType('')
    }
  }

  useEffect(() => {
    if (id) {
      setDisab(false)
      setName(pokemonEdit.name)
      setAbout(pokemonEdit.about)
      setUrl(pokemonEdit.url)
      setFirstType(pokemonEdit.type[0])
      setOption(OPTIONS.filter(function (e) { return e !== firstType }))
      setSecondType(pokemonEdit.type[1])
      pokemonEdit.ability.forEach(element => {
        $value.push(element)
      })
    }
  }, [JSON.stringify(pokemonEdit)])

  const change = (some) => {
    if (!some) {
      setFirstType('')
      setSecondType('')
      setDisab(true)
    } else {
      setDisab(false)
      setOption(OPTIONS.filter(function (e) { return e !== some }))
      setFirstType(some)
    }
  }
  const edit = () => {
    if (!name || !value || !url || !firstType || (pokemonNames.length > 0 && pokemonEdit.name !== pokemonNames[0].name)) {
      !name && $errors.set('name', 'Require name')
      pokemonNames.length > 0 && $errors.set('name', 'This Pokemon already exists')
    } else {
      $pokemonEdit.set({
        number: pokemonEdit.number,
        name: name,
        about: about,
        ability: value,
        type: [firstType, secondType],
        url: url
      })
      emit('url', '/')
    }
  }

  return pug`
    Div
      Input(
        type='text'
        error=errors.name
        label='Name pokemon'
        value=name
        onChangeText=val => {
          setName(val) 
          $errors.set('name', '')
        }
      )
      Input.inputMargin(
        type='select'
        error=errors.type
        label='Choose type'
        value=firstType
        onChange= value => {
          change(value)
          $errors.set('type', '')
        }
        options=OPTIONS
      )
      Input.inputMargin(
        type='select'
        label='Choose type'
        value=secondType
        onChange=setSecondType
        options=option
        disabled=disab
      )
      Input.inputMargin(
        type='array'
        error = errors.ability
        value=value
        $value=$value
        label='Ability'
        items={
          input: 'text'
        }
      )
      Input.inputMargin(
        type='text'
        value=about
        onChangeText=setAbout
        label='About pokemon'
      )
      Input.inputMargin(
        type='text'
        error=errors.url
        value=url
        onChangeText= val => {
          setUrl(val)
          $errors.set('url', '')
        }
        label='Picture url'
      )
      Button.inputMargin(
        onPress= id ? edit : add
      )=id?'Edit':'Add'
  `
})
