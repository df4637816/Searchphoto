import React from 'react'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Homepage from './pages/Homepage'
import About from './pages/About'
import {Route,Routes} from 'react-router-dom'
import "./styles/style.css"
const App = () => {
  return (
    <div className='App'>
        <Nav/>
        <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path="*" element={<div className='NotFound'>404 Not Found</div>}></Route>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App