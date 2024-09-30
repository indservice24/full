import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import {Tabs,TabsContent,TabsList,TabsTrigger,} from "../components/ui/tabs"
import jsPDF from 'jspdf';




const Order = () => {

  const pdfRef = useRef();
 
 
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Get the bill HTML
    const billElement = document.getElementById('bill');
    
    // Use the HTML content of the bill
    doc.html(billElement, {
      callback: function (doc) {
        doc.save('bill.pdf'); // Save the PDF
      },
      x: 10,
      y: 10,
    });
  };





  const [fetchedData, setFetchedData] = useState([]);
  const fetchlist = async () =>{
      try {
        const response = await axios.get(backendUrl + "/api/order/list")
        setFetchedData(response.data.order)
        console.log(fetchedData);
      } catch (error) {
        console.error("An error occurred:", error);
      }
  }


  const [partnerData,setPartnerData] = useState([]);

  const partnerDetails = async () =>{
      try {
        const response = await axios.get(backendUrl + "/api/partner/listuser")
        setPartnerData(response.data.users)
        console.log(partnerData);
        handlePartner();
      } catch (error) {

      }
  }

  const [selectedData,setSelectedData] = useState({
    partnerId:"",
    partnerEmail:"",
    orderId:""
  })
  const handlePartner = (e,orderId)=>{

    const selectedValue = e.target.value;
    
    // Assuming values are comma-separated (or any delimiter)
    const [value1, value2] = selectedValue.split(',');

    setSelectedData({
      partnerId: value1.trim(),
      partnerEmail: value2.trim(),
      orderId:orderId
    });
    
    console.log(selectedData);
  }

  const handleSubmit = async ()=>{
    try {
      const response = await axios.post(backendUrl + "/api/order/assign",selectedData)
      console.log(response);
    } catch (error) {
      
    }
  }

  useEffect(()=>{
      fetchlist();
      partnerDetails();
  },[console.log(fetchedData,partnerData)])
  return (
    <>
    <div className="max-w-[1200px] mx-auto p-5 bg-white h-[100%] min-h-[100dvh]">
    <Tabs defaultValue="account" className="w-[400px]" className='w-full'>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="neworder">New Order</TabsTrigger>
        <TabsTrigger value="assigned">Assigned</TabsTrigger>
        <TabsTrigger value="order">Completed</TabsTrigger>
        <TabsTrigger value="service">Service</TabsTrigger>
      </TabsList>
      <TabsContent value="neworder" className='w-full'>

      <h1 className='text-2xl text-black'>New Service</h1>
        <div className="w-full p-5 max-[400px]:p-0 flex flex-col">
            <div className="w-full flex gap-3 flex-wrap ">{fetchedData.filter((items)=>items.partnerAssigned.includes("not assigned")).map((item)=>{
              return  <div className="flex flex-col p-5 min-w-80 max-w-80 gap-3 border-[1px] border-zinc-300 rounded-lg" key={item._id}>
                <h1 className='text-xl text-black font-bold'>{item.name}</h1>
                <h2 className=' font-semibold text-lg text-zinc-700'>{item.servicename}</h2>
                <p> <span className='font-semibold text-black'>City -</span> {item.city}</p>
                <p> <span className='font-semibold text-black'>State -</span> {item.state}</p>
                <p> <span className='font-semibold text-black'>Address -</span> {item.address}</p>
                <p> <span className='font-semibold text-black'>Number -</span> {item.number}</p>
                <p>Date - {item.createdAt}</p>
                <select name="cars" id="cars" className='border-[1px] border-zinc-400 py-2 px-3 ' onChange={(e)=>handlePartner(e,item._id)}>
                  <option value="">Select Partner</option>
                  {
                    partnerData.filter((items)=>items.service.includes(item.servicename)).map((itemss)=>{
                      return <option value={itemss._id+","+itemss.email} key={itemss._id}>{itemss.name} {itemss.email}</option> 
                    })
                  }
             </select>
             <button className='bg-blue-500 text-white px-3 py-2 rounded-lg' onClick={handleSubmit}>Assign</button>


             
                </div>
            })
              }
              
            </div>
        </div>


       </TabsContent>
      <TabsContent value="assigned">
      <h1 className='text-2xl text-black'> Assigned Service</h1>
        <div className="w-full p-5 max-[400px]:p-0 flex flex-col">
            <div className="w-full flex gap-3 flex-wrap ">{fetchedData.filter((items)=>items.partnerAssigned.includes("assigned")).map((item)=>{
              return  <div className="flex flex-col p-5 min-w-80 max-w-80 gap-1 border-[1px] border-zinc-300 rounded-lg" id='bill' key={item._id} ref={pdfRef}  >
                <h1 className='text-xl text-black font-bold'>{item.name}</h1>
                <h2 className=' font-semibold text-lg text-zinc-700'>{item.servicename}</h2>
                <p> <span className='font-semibold text-black'>City -</span> {item.city}</p>
                <p> <span className='font-semibold text-black'>State -</span> {item.state}</p>
                <p> <span className='font-semibold text-black'>Address -</span> {item.address}</p>
                <p> <span className='font-semibold text-black'>Number -</span> {item.number}</p>
                <p>Date -{item.date}</p>
                {
                    partnerData.filter((items)=>items._id.includes(item.partnerId)).map((itemss)=>{
                      return <div value={itemss._id+","+itemss.email} key={itemss._id}>
                        <p>Partner Name - {itemss.name}</p>
                        <p>Partner Email - {itemss.email}</p>
                      </div> 
                    })
                  }
                  <button className='bg-blue-500 text-white px-3 py-2 rounded-lg' onClick={generatePDF}>Generate PDF</button>
                </div>
            })
              }
              
            </div>
        </div>
      </TabsContent>
      <TabsContent value="order">
      <h1 className='text-2xl text-black'> Completed Service</h1>
        <div className="w-full p-5 max-[400px]:p-0 flex flex-col">
            <div className="w-full flex gap-3 flex-wrap ">{fetchedData.filter((items)=>items.status.includes("completed")).map((item)=>{
              return  <div className="flex flex-col p-5 min-w-80 max-w-80 gap-1 border-[1px] border-zinc-300 rounded-lg"  key={item._id}  >
                <h1 className='text-xl text-black font-bold'>{item.name}</h1>
                <h2 className=' font-semibold text-lg text-zinc-700'>{item.servicename}</h2>
                <p> <span className='font-semibold text-black'>City -</span> {item.city}</p>
                <p> <span className='font-semibold text-black'>State -</span> {item.state}</p>
                <p> <span className='font-semibold text-black'>Address -</span> {item.address}</p>
                <p> <span className='font-semibold text-black'>Number -</span> {item.number}</p>
                <p>Date -{item.date}</p>
                {
                    partnerData.filter((items)=>items._id.includes(item.partnerId)).map((itemss)=>{
                      return <div value={itemss._id+","+itemss.email} key={itemss._id}>
                        <p>Partner Name - {itemss.name}</p>
                        <p>Partner Email - {itemss.email}</p>
                      </div> 
                    })
                  }
                </div>
            })
              }
              
            </div>
        </div>
      </TabsContent>
      <TabsContent value="service">
      <h1 className='text-2xl text-black'>Service</h1>
      </TabsContent>
    </Tabs>
       
    </div>
    </>
  )
}

export default Order
