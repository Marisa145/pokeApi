
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import ProtectedRoutes from './assets/components/ProtectedRoutes'

import Home from './pages/Home'
import Pokedex from './pages/pokedex'
import PokedexInfo from './pages/PokedexInfo'



function App() {

  const trainer = useSelector(state => state.trainer)
  console.log(trainer)

  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home />} />


        <Route element={<ProtectedRoutes />}>
        <Route path='/pokedex' element={<Pokedex />}/>
        <Route path='/pokedex/:id' element={<PokedexInfo />}/>
        </Route>
      </Routes>

    </div>
  )
}

export default App
