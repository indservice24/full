import React from 'react'
import { backendUrl } from '../App';
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const Issue = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const fetchlist = async () =>{
        try {
          const response = await axios.get(backendUrl + "/api/contact/list")
          setFetchedData(response.data.contact)
          console.log(fetchedData);
        } catch (error) {
  
        }
    }
  
    useEffect(()=>{
        fetchlist();
    },[console.log(fetchedData)])

  return (
    <div className='bg-white min-h-[100vh] h-[100%] p-5 text-black'>
            <div className="max-w-[1200px] mx-auto">
                <h1 className='text-2xl font-semibold mb-5'>Customer Issues</h1>
                <div className="w-full ">
                    {
                        fetchedData.map((item) => {return <details className='list-none border-[1px] border-zinc-300 my-2'>
                            <summary className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg cursor-pointer">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl text-indigo-600">Q.</span>
                                    <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
                                </div>
                                <span className="text-indigo-600">
                                    <i className="ri-arrow-down-s-line text-2xl transition-transform duration-300 transform group-open:rotate-180"></i>
                                </span>
                            </summary>
                            <div className="p-4 bg-white rounded-b-lg shadow-inner space-y-4">
                                <div className="flex items-center space-x-3">
                                    <img src={`https://ui-avatars.com/api/?name=${item.name}&background=random`} alt={item.name} className="w-12 h-12 rounded-full" />
                                    <div>
                                        <h4 className="font-semibold text-lg text-indigo-700">{item.name}</h4>
                                        <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="bg-indigo-50 p-3 rounded-lg">
                                    <h5 className="font-semibold text-indigo-800 mb-2">Subject:</h5>
                                    <p className="text-gray-700">{item.subject}</p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-indigo-800 mb-2">Message:</h5>
                                    <p className="text-gray-700 whitespace-pre-wrap">{item.message}</p>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300">
                                        <i className="ri-mail-send-line mr-2"></i>Reply
                                    </button>
                                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300">
                                        <i className="ri-archive-line mr-2"></i>Archive
                                    </button>
                                </div>
                            </div>
                        </details>})
                    }
                        
                </div>
            </div>
    </div>

  )
}

export default Issue