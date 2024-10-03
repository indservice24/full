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
    <form className='w-full p-5 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100' onSubmit={onSubmithandler}>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-indigo-600 text-white py-4 px-6">
                <h1 className='text-3xl font-bold'>Add New Blog</h1>
            </div>
            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Blog Name</label>
                            <input 
                                type="text" 
                                id="name"
                                placeholder='Enter blog name' 
                                className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' 
                                required 
                                onChange={(e) => setName(e.target.value)} 
                                value={name}
                            />
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input 
                                type="text" 
                                id="title"
                                placeholder='Enter blog title' 
                                className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' 
                                required 
                                onChange={(e) => setPrice(e.target.value)} 
                                value={price}
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select 
                                id="category"
                                className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' 
                                onChange={(e) => setcategory(e.target.value)}
                            >
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
                        </div>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea 
                                id="description"
                                placeholder='Enter blog description' 
                                className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' 
                                rows="4"
                                required 
                                onChange={(e) => setDescription(e.target.value)} 
                                value={description}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                            <input 
                                type="file" 
                                id="image"  
                                className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                                onChange={(e) => handleFileUpload(e)}
                                required 
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button 
                        type='submit' 
                        className='px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out'
                    >
                        Add Blog
                    </button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default ServiceAdd
