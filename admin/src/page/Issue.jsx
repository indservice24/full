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
                            <summary className='font-bold text-xl cursor-pointer list-none p-3 border-b-2' >Q.{item.name}</summary>
                            <p className='pl-5 flex flex-col pt-3'>
                                <span className='font-semibold text-black text-[18px]'>{item.name}</span>
                                <span className='font-semibold text-black text-[16px]'>Subject: <span className='text-zinc-500'>{item.subject}</span></span>
                                <span className='font-semibold text-black text-[16px] py-3'>Message: <span className='text-zinc-500 font-normal'>{item.message}</span></span>

                            </p>
                        </details>})
                    }
                        
                </div>
            </div>
    </div>

  )
}

export default Issue