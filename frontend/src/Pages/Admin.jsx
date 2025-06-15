import axios from 'axios'
import React, { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
function Admin() {
  let BASE_URL = "http://localhost:8080"
    let [filename, setfilename] = useState()
    const[cost, setcost] = useState(0)
    const[hotel, sethotel] = useState()
    const[area, setarea] = useState()
    const[des,setdes] = useState()
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
          }
        })

        
    }
  return (
    <div className='flex w-screen h-screen items-center flex-col gap-3 '>
      <ToastContainer/>
      <input type="file" className='hidden mt-3' id='input-file'  />
      <label htmlFor="input-file" className='border px-2 py-1 h-fit rounded-sm mt-3 hover:bg-blue-200 transition-all '> Choose file </label> <p>{filename}</p>
      <input type="text" className='border h-10 pl-2 ' placeholder='Enter the name of hotel' value={hotel} onChange={e=>sethotel(e.target.value)} />
      <input type="text" className="border h-10 pl-2" placeholder='Enter area name' value={area} onChange={e=>setarea(e.target.value)} />
      <input type="text" className='border h-10 pl-2' placeholder='Enter the cost per room' value={cost} onChange={(e)=>setcost(e.target.value)}/>
      <input type="text"placeholder='Enter the description' className='border h-10 pl-2' value={des} onChange={e=>setdes(e.target.value)}/>
      <button className='border p-4 rounded-full' onClick={handlesubmit}>Submit</button>
    </div>
  )
}

export default Admin
