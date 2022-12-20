import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../assets/components/Pokedex/Pagination'
import PokeCard from '../assets/components/Pokedex/PokeCard'
import './styles/pokedexTrainer.css'

const Pokedex = () => {
 const { trainer } = useSelector(state => state)

 const [pokemons, setPokemons]=useState()

const [types, setTypes] = useState()

const [typeSelect, setTypeSelect] = useState('All pokemons')

 const navigate = useNavigate()

 useEffect(()=>{
  if(typeSelect !== 'All pokemons'){
 axios.get(typeSelect)
 .then( res =>setPokemons(res.data.pokemon.map(e=>e.pokemon)))
 .catch(err => console.log(err))

  }else{
  const URL='https://pokeapi.co/api/v2/pokemon?offset=0&limit=100'

  axios.get(URL)
  .then( res => setPokemons(res.data.results))
  .catch(err => console.log(err))
  }
 },[typeSelect])

 useEffect(()=>{
  const URL = 'https://pokeapi.co/api/v2/type'
  axios.get(URL)
  .then( res => setTypes(res.data.results))
  .catch(err => console.log(err))
 },[])

 const handleSubmit=e=>{
     e.preventDefault()
     const input = (e.target.search.value.trim().toLowerCase())
     navigate(`/pokedex/${input}`)
 }
const handleChange = e=> {
       setTypeSelect(e.target.value)
       setPage(1)
}
//logica paginacion 
const [page, setPage] = useState(1)
const [pokePerPage, setpokePerPage] = useState(8)
const initialPoke =(page - 1) * pokePerPage
const finalPoke= page * pokePerPage
const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage)
  return (
    <div className='pokedex__body'>
      
      <h2 className='pokedex__tittle'><span className='name_trainer'> Welcome {trainer}, </span> here you can your favorite pokemon.</h2>
      <div className='pokedex__data'>
      <form className='pokedex__form' onSubmit={handleSubmit}>
        <input className='pokedex__input' id='search' type="text" placeholder='Look for a pokemon'/>
        <button className='pokedex__button'>Search</button>
      </form>
      <select className='pokedex__list' onChange={handleChange}>
        <option className='pokedex__option' value='All pokemons' >All Pokemons</option>
        {
          types?.map(type => (
            <option key={type.url}value={type.url}>{type.name}</option>
          ))
        }
      </select>
      </div>
      <Pagination 
      page={page}
      maxPage={maxPage}
      setPage={setPage}/>
      <div className='poke-container'>
        {
          pokemons?.slice(initialPoke,finalPoke).map(pokemon => (
            <PokeCard
           key={pokemon.url}  
            url={pokemon.url}/>
           
            ))
        }
      </div>
    </div>
  )
}

export default Pokedex