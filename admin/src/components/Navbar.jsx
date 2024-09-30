import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({setToken}) => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="border-b-2 text-black p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Admin Panel</div>
          <button
            className="lg:hidden focus:outline-none"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
           <div className={` ${isOpen ? 'block' : 'hidden'} z-30 max-[1024px]:absolute lg:flex mt-4 lg:mt-0 max-[1024px]:bg-white max-[1024px]:p-5 max-[1024px]:border-2 max-[1024px]:top-12 max-[1024px]:right-10`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-4">
            <li><NavLink to="/add" className="block py-2 hover:text-gray-300">Add items</NavLink></li>
            <li><NavLink to="/list" className="block py-2 hover:text-gray-300">List</NavLink></li>
            <li><NavLink to="/order" className="block py-2 hover:text-gray-300">Order</NavLink></li>
            <li><NavLink to="/issue" className="block py-2 hover:text-gray-300">Issue</NavLink></li>
            <li><button className="block py-2 hover:text-gray-300" onClick={()=>setToken(" ")}>Logout</button></li>
          </ul>
        </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
