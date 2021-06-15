import React, { useState, useEffect } from 'react'
import { observer, useQuery, emit, useLocal, u } from 'startupjs'
import { Div, Span, TextInput, Button, Collapse, Pagination, Checkbox, Row, Select, Content} from '@startupjs/ui'
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Image } from 'react-native'
import Pokemons from './Pokemons'

import './index.styl'
export default observer(function GetPokemonsComponent () {
  const [pokemon, $pokemon] = useQuery('pokemon', {})
  const [name, $name] = useState('')
  const [local] = useLocal('$render.params.name')
  const [quer] = useLocal('$render.query.type')
  const [user, $user] = useState([])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])
  const [page, $page] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, $postsPerPage] = useState(10)
 
  const checkboxes = ['Bug', 'Dragon', 'Fairy', 'Fire', 'Ghost', 'Ground',
    'Normal', 'Psychic', 'Steel', 'Dark', 'Electric', 'Fighting', 'Flying',
    'Grass', 'Ice', 'Poison', 'Rock', 'Water'
  ]
  const option = [10, 15, 20]

  const search = async () => {
    if(!name) {
      emit('url', '/')
    }else{
      emit('url', '/pokemon/search/'+name)
    }
  }
  function onChange (value, id) {
    if (value){
      setSelected(prevState => [...prevState, id])
    } else {
      setSelected(prevState => prevState.filter(item => item !== id))
    }
  }

  const searchByAbility = () => {
    if(selected.length > 0){
      emit('url', '/pokemon/?type='+ selected)
    }else{
      emit('url', '/')
    }
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = (indexOfLastPost - postsPerPage)
  let currentPosts = pokemon.slice(indexOfFirstPost, indexOfLastPost)
  let pages = Math.ceil(pokemon.length/postsPerPage)
  
  if(local){
    const so = pokemon.filter(e => { return e.name.toLowerCase().indexOf(local.toLowerCase()) != -1 })
    currentPosts = so.slice(indexOfFirstPost, indexOfLastPost)
    pages = Math.ceil(so.length/postsPerPage)
  }
  if(quer){
    const so = quer.split(',')
    const filt = pokemon.filter(e => compareArrays(e.type, so))
    currentPosts = filt.slice(indexOfFirstPost, indexOfLastPost)
    pages = Math.ceil(filt.length/postsPerPage)
  }
  const onPug = (val) =>{
    setCurrentPage(val+1)
  }

  function compareArrays(first, second){
    return first.some((e)=> second.includes(e)) && second.every((e)=> first.includes(e))
  }
  const setLeftValue = () => {
    $name('')
  }

  return pug`
    Div
      Content
        Collapse(
          open=open
          onChange=() => setOpen(!open)
        )
          Collapse.Header Type pokemon
          Collapse.Content
            Row(wrap=true)
              each item, index in checkboxes
                Div(key=index pushed='m' styleName= item)
                  Checkbox(
                    label=item
                    value=selected.includes(item)
                    onChange=value => onChange(value, item)
                  )
            Row.marginElement(align='right')      
              Button.searchButton(onPress = searchByAbility icon=faSearch)
        Row
          TextInput.input(
          secondaryIcon=faTimesCircle
          value=name
          onChangeText=$name
          onSecondaryIconPress=() => setLeftValue()
          )
          Button.searchButton( onPress=search icon=faSearch)
      Row.marginElement(pushed='s')  
        Select.selection(
          value=postsPerPage
          onChange=$postsPerPage
          options=option
          showEmptyValue=false
        )
      Pokemons(pokemon=currentPosts)
      Content
        Row(align='center')
          Pagination(
            align='center'
            page=currentPage-1
            pages=pages
            onChangePage=val => onPug(val)
          )
  `
})