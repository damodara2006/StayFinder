import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
function Admin() {
  let BASE_URL = "http://localhost:8080"
    let [filename, setfilename] = useState()
    const[cost, setcost] = useState(0)
    const[hotel, sethotel] = useState()
    const[area, setarea] = useState()
    const[des,setdes] = useState()
    const[image, setimage] = useState()
    const[booking, setbooking] = useState(false)
    const[list, setlist] = useState(false)
    const[data,setdata] = useState([])
    // console.log(filename)
    const handlesubmit = ()=>{
      let loading = toast.loading("Processing")
    const inp = document.getElementById("input-file")
        let data = inp.files[0]
        let formdata = new FormData()
        formdata.append("file", data)
        formdata.append("name",hotel)
        formdata.append("area",area)
        formdata.append("price",cost)
        formdata.append("description", des)

        axios.post(`${BASE_URL}/upload`, formdata,{withCredentials:true, headers:{
          "Content-Type": "multipart/form-data"
        }})
        .then(res=>{
          if(res.data.image){
            toast.update(loading,{render: "Success",
              type: "success",
              isLoading: false,
              autoClose: 1000,
              closeButton: true,})
              setimage(res.data.image)
              setarea("")
              setcost("")
              setdes("")
              sethotel("")
          }
        })

        
    }
    useEffect(()=>{
      console.log("working")
      axios.get(`${BASE_URL}/getbooking`)
      .then(res=>{
        setdata(res.data)
      })
    },[data.length])
    console.log(data)
  return (
    <div className='flex items-center w-screen h-screen flex-col gap-3 bg-gray-400 justify-center'>
      <ToastContainer/>
      <button onClick={()=>setbooking(!booking)} className=' rounded-lg bg-gray-200 hover:bg-gray-600 hover:text-white -0 transition-all p-3 z-50 '>New Hotel</button>
     {
      booking ? <div className='flex flex-col gap-3 w-[50%]'>
      <input type="file" className='hidden mt-3' id='input-file'  />
  {image ? <div className='w-[400px] h-[400px]'> <img src={image} alt='Picture' className='w-full h-full object-cover '/> </div> : "" }
  <label htmlFor="input-file" className='border px-2 py-1 h-fit rounded-sm mt-3 hover:bg-blue-200 transition-all '> Choose file </label> <p>{filename}</p>
  <input type="text" className='border h-10 pl-2 ' placeholder='Enter the name of hotel' value={hotel} onChange={e=>sethotel(e.target.value)} />
  <input type="text" className="border h-10 pl-2" placeholder='Enter area name' value={area} onChange={e=>setarea(e.target.value)} />
  <input type="text" className='border h-10 pl-2' placeholder='Enter the cost per room' value={cost} onChange={(e)=>setcost(e.target.value)}/>
  <input type="text"placeholder='Enter the description' className='border h-10 pl-2' value={des} onChange={e=>setdes(e.target.value)}/>
  <button className='border p-4  rounded-lg' onClick={handlesubmit}>Submit</button>
    </div> : ""
     }
           <button onClick={()=>setlist(!list)} className=' rounded-lg bg-gray-200 hover:bg-gray-600 hover:text-white -0 transition-all p-3 z-50'>View Booking</button>
           {/* <img src="https://res.cloudinary.com/dmbiqpg0z/image/upload/v1750013607/ooxwxhenf7bylaxj5tz7.avif" alt="" /> */}
         {list ?  <div>
            {
              <ul className='flex flex-col items-center justify-center gap-3 rounded-2xl'>
                {
                  
                  data.map((item, key)=>(
                    <li key={key} className=' flex flex-row gap-3 rounded-2xl overflow-hidden items-center active:scale-110 bg-white hover:scale-110 transition-all text-[10px] flex-wrap justify-center mx-5'>
                     <p className='ml-3 font-bold'>{item.user}</p>
                     <p>&#8377;<span className='font-bold'>{item.price}</span></p>
                     <p>{Intl.DateTimeFormat('en-IN',{
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                     }).format(new Date(item.end))}</p>
                     <p>{Intl.DateTimeFormat('en-IN',{
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                     }).format(new Date(item.start))}</p>
                     <div className='w-[100px] h-[100px]'>
                      <img src={item?.room} className='w-full h-full object-cover' alt="" />
                     </div>
                    </li>
                  ))
                }
              </ul>
            }
           </div> :""}
    </div>
  )
}

export default Admin
