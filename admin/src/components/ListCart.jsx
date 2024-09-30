import React from 'react'
import { backendUrl } from '../App'

const ListCart = ({name,price,description,id,remove,image,category}) => {
  return (
    <div className="w-80  bg-white border-2 shadow-lg rounded-xl p-3 relative">
        {/* <div className={`w-full h-32 bg-purple-300 rounded-xl bg-[url('http://localhost:4000/images/')]`}></div>
         */}
         <img src={image} alt="" className='rounded-lg shadow-2xl' />
        <h1 className='text-xl font-semibold text-zinc-700'>{name}</h1>
        <h1 className='text-xl font-semibold'>{category}</h1>
        <h1 className='text-xl font-semibold'>{price}</h1>
        <p className='text-zinc-500'>{description}</p>
        <i className="ri-delete-bin-6-line absolute text-xl bg-transparent bottom-5 right-5 cursor-pointer" onClick={()=> remove(id)}></i>
    </div>
  )
}

export default ListCart