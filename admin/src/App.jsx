import react, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Order from './page/Order'
import List from './page/List'
import ServiceAdd from './page/ServiceAdd'
import Login from './components/Login'
import Navbar from './components/Navbar'
import 'remixicon/fonts/remixicon.css'
import swal from 'sweetalert';
import Issue from './page/Issue'
import Partners from './page/Partners'




export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
const[token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):' ');
useEffect(()=>{
    localStorage.setItem('token',token)
},[token])
  return (
    <div className="bg-white w-full">{
        token === " "? <Login setToken={setToken}/>:<>
          <Navbar setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order token={token}/>} />
          <Route path="/list" element={<List token={token}/>} />
          <Route path="/add" element={<ServiceAdd token={token}/>} />
          <Route path="/issue" element={<Issue token={token}/>} />
          <Route path="/partner" element={<Partners token={token}/>} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </>
    }
    </div>
  )
}

export default App
