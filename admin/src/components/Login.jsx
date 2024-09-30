import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'

const Login = ({setToken}) => {
     const[email,setEmail] = useState('')
     const[password,setPassword] = useState('')
     const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/adminlogin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            }

        } catch (error) {
            alert(error)
        }
     }
  return (
        <form action="" className=' absolute top-[50%] translate-x-[-50%] translate-y-[-50%] left-[50%] flex flex-col w-[350px] mx-auto p-5 justify-center items-center  bg-white shadow-2xl border-2 gap-2 rounded-xl' onSubmit={onSubmitHandler}>
            <h1 className='font-bold tracking-wide text-xl'>Admin Login</h1>
            <input type="text"  placeholder='Email.' required className=' text-xl py-2 px-5 text-black w-full bg-white border-[1px] border-zinc-200 rounded-lg outline-none ' onChange={(e) => {setEmail(e.target.value)}} value={email}/>
            <input type="password" onChange={(e) => {setPassword(e.target.value)}} value={password} placeholder='Password' required className=' text-xl py-2 px-5 w-full bg-white border-[1px] border-zinc-200 rounded-lg outline-none text-black'/>
            <button type='submit' className='text-xl text-white bg-zinc-800 w-full py-2 mt-3'> Login</button>
        </form>
  )
}

export default Login
