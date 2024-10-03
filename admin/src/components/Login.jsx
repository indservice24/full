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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-20">
                <div className="absolute left-1/4 top-1/4 w-48 h-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute right-1/4 bottom-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute left-1/2 bottom-1/2 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>
            <form onSubmit={onSubmitHandler} className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-96 z-10">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Admin Login</h1>
                <div className="space-y-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Email" 
                            required 
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <i className="ri-mail-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                    <div className="relative">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required 
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <i className="ri-lock-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none transition-all duration-300 rounded-lg"
                >
                    Login
                </button>
                <p className="text-center mt-4 text-sm text-gray-600">Secure login for administrators</p>
            </form>
        </div>
  )
}

export default Login
