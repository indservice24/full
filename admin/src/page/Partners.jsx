import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App';
import axios from 'axios';

const Partners = () => {
  const [homeAppliances,setHomeAppliances] = useState([
    'ac',
    'fridge',
    'Washing Machine',
    'Dishwasher',
    'Microwave Oven',
    'Air Conditioner',
    'Television',
    'Vacuum Cleaner',
    'Water Heater',
    'Toaster',
    'Coffee Maker',
    'Blender',
    'Electric Kettle',
    'Food Processor',
    'Rice Cooker',
    'Air Fryer',
    'Electric Fan',
    'Iron',
    'Hair Dryer',
    'Electric Stove',
    'Ceiling Fan'
  ]);

  const [partner,setPartner] = useState([])

  useEffect(()=>{
    const fetchPartner = async () => {
      const response = await axios.get(backendUrl + "/api/partner/listuser")
      setPartner(response.data.users)
    }
    fetchPartner()
  },[])
  console.log(partner)
  const [selectedPartner, setSelectedPartner] = useState([]);
    const handlePartnerClick = (item) => {
     const filterPartner = partner.filter(partner => 
       partner.service && partner.service.includes(item)
     );
     setSelectedPartner(filterPartner)
    }

  console.log(selectedPartner);

  const handleAllPartner = () => {
    setSelectedPartner(partner)
  }

  return (
   <>
   <section className='w-full h-screen bg-white'>
    <h1 className='text-2xl text-zinc-600 font-black max-w-[1200px] mx-auto px-5 py-3 border-b-2'>All Partner</h1>
    <div className="flex flex-row overflow-y-scroll gap-1 my-2 p-2 max-w-[1200px] mx-auto scrollbar">
    <span className='text-[17px] text-nowrap font-semibold bg-[#f9fafb] border-[1px] px-4 pb-[2px] border-zinc-400 rounded-full text-[#4f545f] cursor-pointer'  onClick={handleAllPartner} >All</span>
        {homeAppliances.map((item,ind)=> {
            return   <span className='text-[17px] text-nowrap font-semibold bg-[#f9fafb] border-[1px] px-4 pb-[2px] border-zinc-400 rounded-full text-[#4f545f] cursor-pointer' key={ind} onClick={()=>handlePartnerClick(item)} >{item}</span>
        })}
            
            </div>
            <div className="">
    <section className='w-full  bg-white p-5 flex flex-wrap max-w-[1200px] mx-auto justify-between '>
          {  selectedPartner.length > 0 ? selectedPartner.map((item,ind)=>{ 
            return  <details className=" min-w-80  bg-white border-2 rounded-2xl   gap-2 my-2 p-3 flex flex-row items-center list-none cursor-pointer " key={ind}>
                <summary className='list-none text-xl font-semibold '>{item.name}</summary>

                <div> <p className='text-sm text-zinc-600'>{item.email}</p> 
                 <p className='text-sm text-zinc-600 font-semibold'>+91 {item.phone}</p> 
                <p className='text-sm text-zinc-600 font-semibold'> {item.address}</p> 
                <div className=''>
                     <img src={item.addharfront} alt={item.name} className='w-80  object-cover my-2 shadow-xl rounded-lg' />
                     <img src={item.addharback} alt={item.name} className='w-80 object-cover my-2 shadow-xl rounded-lg' />
                     <img src={item.photo} alt={item.name} className='w-80 rounded-lg shadow-xl  object-cover my-2' />
                
                 </div></div>
            </details>
        }): <h1>No Partner Found</h1>}
    </section></div>
   </section>
   </>
  )
}

export default Partners