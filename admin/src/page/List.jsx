import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import ListCart from '../components/ListCart'

const List = ({token}) => {
    const [fetchedData, setFetchedData] = useState([]);
    const fetchlist = async () =>{
        try {
            const response = await fetch(backendUrl + "/api/service/list")
            const data = await response.json();
            setFetchedData(data.service);
            console.log(fetchedData)
        } catch (error) {

        }
    }

    useEffect(()=>{
        fetchlist();
    },[console.log(fetchedData)])

    const removeService = async (id) => {
        try {
            const response = await axios.post(backendUrl + "/api/service/remove",{id},{headers:{token}})
            console.log(response.data)
           await fetchlist();
           swal("Service Remove Successfully");
        } catch (error) {
            
        }
    }

  return (
    <>
    <div className="max-w-[1200px] mx-auto p-5 w-full min-h-[100dvh] h-[100%]   ">
        <h1 className='text-2xl font-semibold'>All Services</h1>
        <div className="w-full py-2 px-2  flex flex-wrap gap-5 justify-center">
            {fetchedData[0]?
                fetchedData.map((item)=>  { return <ListCart name={item.name} category={item.category} image={item.image} price={item.price} description={item.description} id={item._id} key={item._id} remove={removeService}/> } ):<p>Loading....</p>
            }
          
        </div>
    </div>
    </>
  )
}

export default List
