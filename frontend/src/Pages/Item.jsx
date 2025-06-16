import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { FaRegHeart } from "react-icons/fa";

function Item() {
    let BASE_URL = "http://localhost:8080"
    let location = useLocation()
    let data = location.state.data
    console.log(data)
    const[price, setprice] = useState(0)
  return (
    <div className='w-screen flex items-center justify-center flex-col relative min-h-screen'>
        <div className='w-[850px] h-[650px] mt-5'><img className="w-full h-full object-cover rounded-2xl" src={data.image} alt="" /></div>
        <div className='w-full h-[500px]  relative flex items-center justify-center'>
        <div className='absolute top-0 '>
        <div className='w-[220px] h-[200px] border flex  items-center flex-col mt-5 sticky top-0 rounded-2xl shadow-2xl'>
            <p className='text-center mt-5 font-bold'>Single room price : <span className='font-light'>₹{data.price}</span> </p>
            <span className='flex text-center items-center justify-center mt-2'><button className='border text-2xl px-2 rounded-full hover:scale-105 transition-all' onClick={()=>{
                if(price<=0) return
                setprice((prev)=>prev - 1)
            }}>-</button><p className='px-5 border py-1 ml-2 mr-2 rounded-sm cursor-auto'>{price}</p><button className='border text-2xl px-1 rounded-full hover:scale-105 transition-all ' onClick={()=>{
                setprice((prev)=>prev + 1)
            }}>+</button></span>
            <p className='mt-3'>Total : ₹<span className='font-bold'>{price*data.price}</span></p>
            <button className='bg-gradient-to-r from-violet-600 to-violet-400 px-4 rounded-sm text-white mt-3 py-1 cursor-pointer hover:scale-110 transition-all'>Buy now</button>
        </div>
        </div>
        </div>
        
        


    </div>
  )
}

export default Item
