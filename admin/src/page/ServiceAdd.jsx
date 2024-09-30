import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { backendUrl } from '../App'

const ServiceAdd = ({token}) => {
    const[name,setName] = useState("")
    const[price,setPrice] = useState("")
    const[category,setcategory] = useState("")
    const[description,setDescription] = useState("")
    const[image,setImage] = useState("")
    const[formData, setFormData] = useState({})

    useEffect(() => {
        setFormData({
            name,
            price,
            category,
            description,
            image
        })
    }, [name, price, category, description, image])

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImage(base64);
    };


    const onSubmithandler = async (e) => {

        try {
            e.preventDefault();
            console.log(formData);
            const response = await axios.post(backendUrl + "/api/service/add", formData)
            console.log(response.data);
            if (response.data.success) {
                setName("")
                setPrice("")
                setcategory("")
                setDescription("")
                setImage("")
                swal("Service Added Successfully")
            }

        } catch (error) {

        }
    }
  return (
    <form className='w-full p-5 h-[100dvh]' onSubmit={onSubmithandler}>
        <div className=" max-w-[1200px] mx-auto">
            <h1 className='text-2xl font-semibold border-b-2 pb-3 pl-2'>Add Blog</h1>
            <div className=" flex flex-col gap-5 max-w-96 mt-5">
            <input onChange={(e) => handleFileUpload(e)} type="file" id="image"  required />
                <p className='text-xl'>Name:</p>
            <input type="text" placeholder='Service Name' className= ' bg-white text-xl p-3 border-[1px] border-zinc-500 focus:shadow-xl outline-none' required onChange={(e) => {setName(e.target.value)}} value={name}/>
            <p className='text-xl'>Title:</p>
            <input type="text" placeholder='Title' className='text-xl p-3 bg-white border-[1px] border-zinc-500 focus:shadow-xl outline-none' required onChange={(e) => {setPrice(e.target.value)}} value={price}/>
            <p className='text-xl'>category</p>
             <select  className='border-[1px] border-zinc-400 py-2 px-3  bg-white' onChange={(e) => {setcategory(e.target.value)}} >
             <option>Select Category</option>
             <option value="refrigerator">Refrigerator</option>
             <option value="washing-machine">Washing Machine</option>
             <option value="air-conditioner">Air Conditioner</option>
             <option value="microwave">Microwave</option>
             <option value="dishwasher">Dishwasher</option>
             <option value="oven">Oven</option>
             <option value="dryer">Dryer</option>
             <option value="water-heater">Water Heater</option>
             <option value="vacuum-cleaner">Vacuum Cleaner</option>
             <option value="television">Television</option>

             </select>
             <p className='text-xl'>Description</p>
            <textarea type="text" placeholder='Description' className='text-xl p-3 border-[1px] border-zinc-500 focus:shadow-xl outline-none text-black bg-white' required onChange={(e) => {setDescription(e.target.value)}} value={description} > </textarea>
           <button type='submit' className='bg-black py-2 text-white'>Add Service</button>
           </div>
        </div>
    </form>
  )
}

export default ServiceAdd
