import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer"
import { Document, Page, PDFDownloadLink, Text, View } from '@react-pdf/renderer'
import Bill from '../components/Bill'



const Home = () => {
  const [partner,setPartner] = useState([])
  const [selectedId, setSelectedId] = useState(false)
  const [inprogress, setInprogress] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [completed, setCompleted] = useState(false)

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
    const fetchPartner = async () => {
      const response = await axios.get(backendUrl + "/api/partner/listuser")
      setPartner(response.data.users)
    }
    fetchPartner()
    fetchlist()
  },[])

  console.log(fetchedData)
  return (
    <>
 
    <h1 className='max-w-[1200px] mx-auto p-5 font-black text-2xl text-[#2b2e3d] relative '>INDIA SERVICE 24 <span className='font-semibold text-zinc-400 absolute bottom-0 left-5 bg-transparent text-[14px] '>Your Trusted partner for 24/7 Appliance Care!</span> </h1>
    <section className="w-full  bg-white max-w-[1200px] mx-auto p-5 flex  flex-wrap gap-3 justify-between ">

      
    <div className={`${selectedId ? "view" : "max-[540px]:w-44 max-[540px]:h-24 max-[410px]:w-36"} w-60 h-32 bg-blue-100 rounded-xl p-5 relative cursor-pointer  `} onClick={() => setSelectedId(true)}>
      {selectedId ? (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedId(false);
          }} 
          className="absolute top-3 right-5 text-white hover:text-blue-200 transition-colors duration-200"
        >
          <i className="ri-close-line text-2xl bg-transparent text-blue-500"></i>
        </button>
      ) : (
        <i className="ri-file-add-line bg-transparent text-xl absolute top-3 right-5 text-blue-600"></i>
      )}
      <div className="flex flex-col items-start bg-transparent">
        <h1 className='text-5xl bg-transparent font-extrabold text-blue-600 max-[540px]:text-4xl '>
          {fetchedData.filter(item => item.partnerAssigned.includes("not assigned")).length}+
        </h1>
        <p className='bg-transparent py-2 text-blue-600 font-semibold whitespace-nowrap max-[540px]:text-[13px] max-[540px]:py-0 max-[410px]:text-[11px] flex items-center'>
          New Booked 
          <i className="ri-arrow-right-s-line bg-transparent ml-1 animate-bounce"></i>
        </p>
      </div>{selectedId?<div className="w-full h-[85%] px-3 py-7 flex flex-wrap gap-2 bg-transparent overflow-y-scroll z-10 scroll" >
          {fetchedData.filter((items)=>items.partnerAssigned.includes("not assigned")).map((item)=>{ return <details className="w-80  " key={item._id}>
        <summary className='bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-all duration-300 list-none cursor-pointer'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
              <span className='text-blue-600 font-bold capitalize'>{item.servicename}</span>
              <span className='text-sm text-gray-600'>{item.name}</span>
            </div>
            <div className='flex flex-col items-end'>
              <span className='text-xs text-gray-400'>12:45pm - 02/10/2024</span>
              <span className='text-sm text-gray-500'>{item.city}, {item.state}</span>
            </div>
          </div>
          <div className='mt-2 flex justify-between items-center'>
            <span className='text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full'>New</span>
            <button 
              className='text-blue-500 hover:text-blue-700 transition-colors duration-200'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const detailsElement = e.target.closest('details');
                if (detailsElement) {
                  detailsElement.open = true;
                }
              }}
            >
              <i className="ri-user-add-line"></i> Assign Partner
            </button>
          </div>
        </summary>
        <div 
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              const detailsElement = e.currentTarget.closest('details');
              if (detailsElement) {
                detailsElement.open = false;
              }
            }
          }}
        >
          <div className='relative w-96 max-w-[90%] p-6 rounded-3xl bg-gradient-to-br from-blue-100 to-white shadow-2xl flex flex-col gap-3 transform hover:scale-105 transition-all duration-300' onClick={(e) => e.stopPropagation()}>
            <button 
              className='absolute top-3 right-3 text-blue-500 hover:text-blue-700 transition-colors duration-200' 
              onClick={(e) => {
                e.stopPropagation();
                const detailsElement = e.target.closest('details');
                if (detailsElement) {
                  detailsElement.open = false;
                }
              }}
            >
              <i className="ri-close-circle-line text-2xl"></i>
            </button>
            <h1 className='text-2xl text-blue-600 font-extrabold mb-2 border-b-2 border-blue-300 pb-2'>{item.name}</h1>
            <h2 className='font-semibold text-lg text-blue-500'>{item.servicename}</h2>
            <div className='bg-white rounded-lg p-3 shadow-inner'>
              <p className='flex items-center'><i className="ri-map-pin-line mr-2 text-blue-500"></i><span className='font-semibold text-gray-700'>City:</span> <span className='ml-2 text-gray-600'>{item.city}</span></p>
              <p className='flex items-center mt-1'><i className="ri-building-line mr-2 text-blue-500"></i><span className='font-semibold text-gray-700'>State:</span> <span className='ml-2 text-gray-600'>{item.state}</span></p>
              <p className='flex items-center mt-1'><i className="ri-home-4-line mr-2 text-blue-500"></i><span className='font-semibold text-gray-700'>Address:</span> <span className='ml-2 text-gray-600'>{item.address}</span></p>
              <p className='flex items-center mt-1'><i className="ri-phone-line mr-2 text-blue-500"></i><span className='font-semibold text-gray-700'>Number:</span> <span className='ml-2 text-gray-600'>{item.number}</span></p>
            </div>
            <select name="cars" id="cars" className='border-2 border-blue-300 py-2 px-3 rounded-lg bg-white focus:outline-none focus:border-blue-500 transition-colors duration-200' onChange={(e)=>handlePartner(e,item._id)}>
              <option value="">Select Partner</option>
              {
                partner.filter((items)=>items.service.includes(item.servicename)).map((itemss)=>{
                  return <option value={itemss._id+","+itemss.email} key={itemss._id}>{itemss.name} {itemss.email}</option> 
                })
              }
            </select>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center' onClick={handleSubmit}>
              <i className="ri-user-add-line mr-2"></i>Assign
            </button>
          </div>
        </div>
        </details>} )}
      </div>:null}
      </div>



    <div className={`${inprogress?"view":"max-[540px]:w-44 max-[540px]:h-24 max-[410px]:w-36"} w-60  h-32 bg-yellow-100 rounded-xl p-5 relative cursor-pointer `} onClick={()=>setInprogress(true)}>
      {inprogress ? (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setInprogress(false);
          }} 
          className="absolute top-3 right-5 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <i className="ri-close-line text-2xl bg-transparent text-yellow-500"></i>
        </button>
      ) : (
        <i className="ri-tools-line bg-transparent text-xl absolute top-3 right-5 text-yellow-600"></i>
      )}
        <h1 className='text-5xl bg-transparent font-extrabold text-yellow-500 max-[540px]:text-4xl' >{fetchedData.filter(item => item.partnerAssigned === "assigned").filter((items)=>items.status.includes("inprogress")).length}+ </h1>
        <p className='bg-transparent py-2 text-yellow-600 font-semibold whitespace-nowrap max-[540px]:text-[13px] max-[540px]:py-0 max-[410px]:text-[11px]'>Inprogress services  <i className="ri-arrow-right-s-line bg-transparent"></i></p>
        {inprogress?<div className="w-full h-[85%] px-3 py-7 flex flex-wrap gap-2 bg-transparent overflow-y-scroll z-10 scroll" >
          {fetchedData.filter((items)=>items.partnerAssigned === "assigned").filter((items)=>items.status.includes("inprogress")).map((item)=>{ return <details className="w-80  " key={item._id}>
        <summary className='bg-white list-none rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='font-bold text-lg text-blue-600 capitalize'>{item.servicename}</h3>
              <p className='text-sm text-gray-600 mt-1'>{item.name}</p>
            </div>
            <div className='text-right'>
              <p className='text-sm font-medium text-gray-700'>{item.city}, {item.state}</p>
              <p className='text-xs text-gray-500 mt-1'>12:45pm - 02/10/2024</p>
            </div>
          </div>
          <div className='mt-3 flex justify-between items-center'>
            <span className='bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full'>In Progress</span>
            <button className='text-blue-500 hover:text-blue-700 transition-colors duration-200'>
              <i className="ri-arrow-right-s-line text-lg"></i>
            </button>
          </div>
        </summary>
        <div 
          className='fixed inset-0 flex items-center justify-center bg-black  bg-opacity-30 backdrop-blur-sm z-50'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              const detailsElement = e.currentTarget.closest('details');
              if (detailsElement) {
                detailsElement.open = false;
              }
            }
          }}
        >
          <div className='relative w-96 max-[430px]:w-[95%] p-6 rounded-3xl bg-white shadow-2xl flex flex-col gap-3 transform rotate-1 hover:rotate-0 transition-all duration-300' onClick={(e) => e.stopPropagation()}>
            <button 
              className='absolute top-3 right-3 text-orange-500 hover:text-red-600 transition-colors duration-200' 
              onClick={(e) => {
                e.stopPropagation();
                const detailsElement = e.target.closest('details');
                if (detailsElement) {
                  detailsElement.open = false;
                }
              }}
            >
              <i className="ri-close-circle-line text-2xl"></i>
            </button>
            <h1 className='text-2xl text-orange-600 font-extrabold mb-2 border-b-2 border-orange-300 pb-2'>{item.name}</h1>
            <h2 className='font-bold text-xl text-yellow-600  capitalize'>{item.servicename}</h2>
            <h2 className='font-bold text-xl text-yellow-600  capitalize'>{item.servicedetail}</h2>
            {
                    partner.filter((items)=>items._id.includes(item.partnerId)).map((itemss)=>{
                      return <p><span className='font-semibold text-orange-700'>Partner:</span> <span className='text-orange-600'>{itemss.name}</span></p>
                    })
                  }
            <div className='bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-xl'>
              <p className='mb-2'><span className='font-semibold text-orange-700'>City:</span> <span className='text-orange-600'>{item.city}</span></p>
              <p className='mb-2'><span className='font-semibold text-orange-700'>State:</span> <span className='text-orange-600'>{item.state}</span></p>
              <p className='mb-2'><span className='font-semibold text-orange-700'>Address:</span> <span className='text-orange-600'>{item.address}</span></p>
              <p><span className='font-semibold text-orange-700'>Number:</span> <span className='text-orange-600'>{item.number}</span></p>
             
            </div>
          </div>
        </div>
        </details>} )}
      </div>:null}
      </div>

   
   
   
   
    <div className={`${cancel?"view":"max-[540px]:w-44 max-[540px]:h-24 max-[410px]:w-36"} w-60  h-32 bg-red-100 rounded-xl p-5 relative cursor-pointer `} onClick={()=>setCancel(true)}>
      {cancel ? (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setCancel(false);
          }} 
          className="absolute top-3 right-5 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <i className="ri-close-line text-3xl bg-transparent text-red-500"></i>
        </button>
      ) : (
        <i className="ri-close-circle-line text-xl absolute top-3 right-5 text-red-400"></i>
      )}
        <h1 className='text-5xl bg-transparent font-extrabold text-red-500 max-[540px]:text-4xl' >{fetchedData.filter((items)=>items.status.includes("cancelled")).length}+ </h1>
        <p className='bg-transparent py-2 text-red-600 font-semibold whitespace-nowrap max-[540px]:text-[13px] max-[540px]:py-0 max-[410px]:text-[11px]'>Cancelled services  <i className="ri-arrow-right-s-line bg-transparent"></i></p>
        {cancel?<div className="w-full h-[85%] px-3 py-7 flex flex-wrap gap-2 bg-transparent overflow-y-scroll z-10 scroll" >
          {fetchedData.filter((items)=>items.status.includes("cancelled")).map((item)=>{ return <details className="w-80  " key={item._id}>
        <summary className='bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 list-none'>
          <div className='flex justify-between items-center mb-2 capitalize'>
            <span className='text-lg font-bold text-red-600'>{item.servicename}</span>
            <span className='bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full'>
              Cancelled
            </span>
          </div>
          <div className='text-gray-700 mb-2'>{item.name}</div>
          <div className='flex justify-between text-sm text-gray-500'>
            <span><i className="ri-map-pin-line mr-1"></i>{item.city}, {item.state}</span>
            <span><i className="ri-time-line mr-1"></i>12:45pm - 02/10/2024</span>
          </div>
          <div className='mt-2 text-red-500 text-sm'>
            <i className="ri-error-warning-line mr-1"></i>Click for more details
          </div>
        </summary>
        <div 
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              const detailsElement = e.currentTarget.closest('details');
              if (detailsElement) {
                detailsElement.open = false;
              }
            }
          }}
        >
          <div className='relative w-80 p-6 rounded-xl bg-white shadow-lg flex flex-col gap-3' onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500 rounded-t-xl"></div>
            <button 
              className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200' 
              onClick={(e) => {
                e.stopPropagation();
                const detailsElement = e.target.closest('details');
                if (detailsElement) {
                  detailsElement.open = false;
                }
              }}
            >
              <i className="ri-close-circle-line text-2xl"></i>
            </button>
            <div className="flex items-center mb-2">
              <i className="ri-error-warning-line text-3xl text-red-500 mr-3"></i>
              <h1 className='text-xl text-red-500 font-bold'>Cancelled Service</h1>
            </div>
            <h2 className='font-semibold text-lg text-gray-700'>{item.servicename}</h2>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-red-700 font-medium">{item.name}</p>
              <p className="text-sm text-gray-600"><i className="ri-map-pin-line mr-1"></i>{item.city}, {item.state}</p>
              <p className="text-sm text-gray-600"><i className="ri-home-3-line mr-1"></i>{item.address}</p>
              <p className="text-sm text-gray-600"><i className="ri-phone-line mr-1"></i>{item.number}</p>
            </div>
            <div className="mt-2 border-t pt-3">
              <p className="text-sm text-gray-500">Reason for cancellation:</p>
              <p className="text-red-600 italic">Service unavailable in the area</p>
            </div>
            <button className='mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200'>
              Acknowledge Cancellation
            </button>
          </div>
        </div>
        </details>} )}
      </div>:null}
      </div>









    <div className={`${completed?"view":"max-[540px]:w-44 max-[540px]:h-24 max-[410px]:w-36"} w-60  h-32 bg-green-100 rounded-xl p-5 relative cursor-pointer `} onClick={()=>setCompleted(true)}>
      {completed ? (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setCompleted(false);
          }} 
          className="absolute top-3 right-5 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <i className="ri-close-line text-3xl bg-transparent text-green-500"></i>
        </button>
      ) : (
        <i className="ri-check-double-line text-xl absolute top-3 right-5 text-green-400"></i>
      )}
        <h1 className='text-5xl bg-transparent font-extrabold text-green-500 max-[540px]:text-4xl' >{fetchedData.filter((items)=>items.status.includes("completed")).length}+ </h1>
        <p className='bg-transparent py-2 text-green-600 font-semibold whitespace-nowrap max-[540px]:text-[13px] max-[540px]:py-0 max-[410px]:text-[11px]'>Completed services  <i className="ri-arrow-right-s-line bg-transparent"></i></p>
        {completed?<div className="w-full h-[85%] px-3 py-7 flex flex-wrap gap-2 bg-transparent overflow-y-scroll z-10 scroll" >
          {fetchedData.filter((items)=>items.status.includes("completed")).map((item)=>{ return <details className="w-80  " key={item._id}>
        <summary className='bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow duration-300 list-none'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
              <span className='text-green-600 font-bold capitalize'>{item.servicename}</span>
              <span className='text-sm text-gray-600 capitalize'>{item.name}</span>
            </div>
            <div className='flex flex-col items-end'>
              <span className='text-xs text-gray-400'>12:45pm - 02/10/2024</span>
              <span className='text-sm text-gray-500 capitalize'>{item.city}, {item.state}</span>
            </div>
          </div>
          <div className='mt-2 flex justify-between items-center'>
            <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full'>Completed</span>
            <i className="ri-check-double-line text-green-500"></i>
          </div>
        </summary>
        <div 
          className='fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              const detailsElement = e.currentTarget.closest('details');
              if (detailsElement) {
                detailsElement.open = false;
              }
            }
          }}
        >
          <div className='relative w-96 p-6 rounded-2xl bg-gradient-to-br from-white to-green-50 shadow-lg flex flex-col gap-3 max-[420px]:w-[95%]' onClick={(e) => e.stopPropagation()}>
            <button 
              className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors duration-200 z-10' 
              onClick={(e) => {
                e.stopPropagation();
                const detailsElement = e.target.closest('details');
                if (detailsElement) {
                  detailsElement.open = false;
                }
              }}
            >
              <i className="ri-close-circle-fill text-2xl"></i>
            </button>
            <div className="bg-green-500 text-white p-4 rounded-t-xl -mx-6 -mt-6 mb-4 flex justify-between items-center ">
              <div>
                <h1 className='text-2xl font-bold'>{item.name}</h1>
                <h2 className='text-lg text-green-100 capitalize'>{item.servicename}</h2>
              </div>
              <div className="bg-white text-green-500 px-3 py-1 rounded-full text-sm font-semibold">
                Completed
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow">
                <p className='text-sm text-gray-500'>City</p>
                <p className='font-semibold capitalize'>{item.city}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow">
                <p className='text-sm text-gray-500'>State</p>
                <p className='font-semibold capitalize'>{item.state}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow col-span-2">
                <p className='text-sm text-gray-500'>Address</p>
                <p className='font-semibold capitalize'>{item.address}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow col-span-2">
                <p className='text-sm text-gray-500'>Number</p>
                <p className='font-semibold'>{item.number}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow mt-2">
              <h3 className="font-semibold text-lg mb-2">Partner Details</h3>
              {
                partner.filter((items)=>items._id === item.partnerId).map((itemss)=>{
                  return <div key={itemss._id}>
                    <p><span className="font-semibold">Name:</span> {itemss.name}</p>
                    <p><span className="font-semibold">Email:</span> {itemss.email}</p>
                  </div> 
                })
              }
            </div>
            <button 
              className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 mt-4 flex items-center justify-center'
              onClick={() => {
                import('jspdf').then((jsPDF) => {
                  const { default: JsPDF } = jsPDF;
                  const doc = new JsPDF();
                  
                  // Set custom fonts
                  doc.setFont("helvetica", "bold");
                  
                  // Background
                  doc.setFillColor(240, 248, 255); // Light blue background
                  doc.rect(0, 0, 210, 297, 'F');
                  
                  // Header
                  doc.setFillColor(34, 139, 34); // Forest green
                  doc.roundedRect(0, 0, 210, 50, 5, 5, 'F');
                  doc.setTextColor(255, 255, 255);
                  doc.setFontSize(40);
                  doc.text("PREMIUM INVOICE", 105, 35, null, null, 'center');
                  
                  // Decorative elements
                  doc.setDrawColor(255, 215, 0); // Gold
                  doc.setLineWidth(2);
                  doc.line(10, 55, 200, 55);
                  doc.line(10, 240, 200, 240);
                  
                  // Customer Details
                  doc.setTextColor(34, 139, 34);
                  doc.setFontSize(20);
                  doc.text("Customer Details", 20, 75);
                  doc.setTextColor(0, 0, 0);
                  doc.setFontSize(12);
                  doc.roundedRect(15, 80, 90, 60, 3, 3, 'S');
                  doc.text(`Name: ${item.name}`, 20, 90);
                  doc.text(`Service: ${item.servicename}`, 20, 100);
                  doc.text(`Address: ${item.address}`, 20, 110);
                  doc.text(`City: ${item.city}, State: ${item.state}`, 20, 120);
                  doc.text(`Number: ${item.number}`, 20, 130);
                  
                  // Partner Details
                  const partnerDetails = partner.filter((items) => items._id === item.partnerId)[0];
                  if (partnerDetails) {
                    doc.setTextColor(34, 139, 34);
                    doc.setFontSize(20);
                    doc.text("Partner Details", 120, 75);
                    doc.setTextColor(0, 0, 0);
                    doc.setFontSize(12);
                    doc.roundedRect(115, 80, 80, 40, 3, 3, 'S');
                    doc.text(`Name: ${partnerDetails.name}`, 120, 90);
                    doc.text(`Email: ${partnerDetails.email}`, 120, 100);
                  }
                  
                  // Service Details
                  doc.setTextColor(34, 139, 34);
                  doc.setFontSize(20);
                  doc.text("Service Details", 20, 155);
                  doc.setTextColor(0, 0, 0);
                  doc.setFontSize(12);
                  doc.roundedRect(15, 160, 180, 30, 3, 3, 'S');
                  doc.text(`Service: ${item.servicename}`, 20, 170);
                  doc.text("Status: Completed", 20, 180);
                  
                  // Signature
                  doc.setTextColor(34, 139, 34);
                  doc.setFontSize(16);
                  doc.text("Authorized Signature:", 120, 210);
                  doc.setFontSize(12);
                  doc.text("Authorized Signature:", 130, 180);
                  doc.setFont("helvetica", "italic");
                  doc.setFontSize(16);
                  doc.text("Rupesh", 130, 190);
                  
                  // Footer
                  doc.setFillColor(34, 197, 94);
                  doc.rect(0, 280, 210, 20, 'F');
                  doc.setTextColor(255, 255, 255);
                  doc.setFontSize(10);
                  doc.text("Thank you for your business!", 105, 290, null, null, 'center');
                  
                  doc.save(`invoice_${item._id}.pdf`);
                });
              }}
            >
              <i className="ri-download-2-line mr-2"></i>
              Download Invoice
            </button>
          </div>
        </div>
        </details>} )}
      </div>:null}
      </div>












<PDFDownloadLink document={<Bill/>}>download</PDFDownloadLink>




   
    </section>
    <h1 className='max-w-[1200px] mx-auto p-5 font-black text-2xl text-[#2b2e3d] relative border-b-2 pb-7'>Our Partners <span className='font-semibold text-zinc-400 absolute top-10 left-6 bg-transparent text-[14px] '>Professional in Services</span> </h1>

    <section className='w-full  max-w-[1200px] mx-auto p-5 flex flex-wrap gap-2 justify-between'>
      {partner.map((item)=> (<>
       <div className="w-full max-w-md mx-auto bg-white border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl mb-4" key={item._id}>
          <div className="px-4 py-3 border-b border-gray-200 flex items-center space-x-3 cursor-pointer hover:bg-gradient-to-r from-blue-50 to-indigo-50 transition-colors duration-200" onClick={() => document.getElementById(`modal-${item._id}`).classList.remove('hidden')}>
            <div className="flex-shrink-0">
              <img src={item.photo} className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold"/>
               
            </div>
            <div className="flex-1 min-w-0">
              <p className=" font-medium text-gray-900 truncate">{item.name}</p>
              <p className="text-xs text-gray-500 truncate capitalize">{item.service[0]}</p>
            </div>
            <div className="flex-shrink-0 flex items-center space-x-2">
              <button 
                className="text-blue-500 hover:text-blue-700 transition-colors duration-200 transform hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `tel:${item.phone}`;
                }}
              >
                <i className="ri-phone-fill text-lg bg-blue-100 p-2 rounded-full"></i>
              </button>
              <button 
                className="text-green-500 hover:text-green-700 transition-colors duration-200 transform hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://wa.me/${item.phone}`, '_blank');
                }}
              >
                <i className="ri-whatsapp-fill text-lg bg-green-100 p-2 rounded-full"></i>
              </button>
            </div>
          </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden backdrop-blur-sm" id={`modal-${item._id}`}>
        <div className="bg-white p-6 rounded-3xl max-w-md w-full m-4 shadow-2xl transform transition-all duration-300 scale-100 opacity-100" id={`modal-content-${item._id}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-800">{item.name}</h2>
            <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200" onClick={() => {
              document.getElementById(`modal-${item._id}`).classList.add('hidden');
            }}>
              <i className="ri-close-circle-line text-3xl"></i>
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-indigo-50 p-3 rounded-lg">
              <i className="ri-mail-line text-2xl text-indigo-600"></i>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-indigo-700 font-medium">{item.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
              <i className="ri-phone-line text-2xl text-blue-600"></i>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a href={`tel:${item.phone}`} className="text-blue-700 font-medium hover:underline">{item.phone || 'N/A'}</a>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg">
              <i className="ri-map-pin-line text-2xl text-purple-600"></i>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-purple-700 font-medium">{item.address || 'N/A'}</p>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Services</p>
              <div className="flex flex-wrap gap-2">
                {item.service.map((service, index) => (
                  <span key={index} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-medium capitalize">{service}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between">
          <img src={item.addharback} alt="" className='w-[45%] rounded-xl' />
          <img src={item.addharfront} alt=""  className='w-[45%] rounded-xl' />
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <button onClick={() => window.location.href = `tel:${item.phone}`} className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <i className="ri-phone-fill mr-2"></i> Call
            </button>
            <button onClick={() => window.open(`https://wa.me/${item.phone}`, '_blank')} className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
              <i className="ri-whatsapp-fill mr-2"></i> WhatsApp
            </button>
          </div>
        </div>
      </div>
</> 
      ))}
    </section>


    </>
  )
}


export default Home
