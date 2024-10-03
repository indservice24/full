import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({setToken}) => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className=" right-0 z-50 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-extrabold text-indigo-600">Admin Panel</div>
          <button
            className="lg:hidden focus:outline-none text-indigo-600"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <div className={`${isOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center lg:space-x-6 absolute lg:relative top-full left-0 right-0 lg:top-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none p-4 lg:p-0 mt-2 lg:mt-0 transition-all duration-300 ease-in-out transform lg:translate-y-0 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <NavLink to="/add" className="py-2 px-4 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-full transition-colors duration-200">Add items</NavLink>
            <NavLink to="/list" className="py-2 px-4 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-full transition-colors duration-200">List</NavLink>
            <NavLink to="/order" className="py-2 px-4 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-full transition-colors duration-200">Order</NavLink>
            <NavLink to="/issue" className="py-2 px-4 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-full transition-colors duration-200">Issue</NavLink>
            <button className="py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors duration-200" onClick={() => setToken(" ")}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
