import React, { useEffect, useState, useRef } from 'react'
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosApps } from "react-icons/io";
import { MdRoomService } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { useGoogleLogin } from '@react-oauth/google';
import {ToastContainer, toast} from "react-toastify"
import { MdEmail } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import axios from "axios"
import { FaRegHeart } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
function Home() {
  let BASE_URL = "http://localhost:8080"
    const [search, setSearch] = useState(window.innerWidth >= 600);
    const [sidebar, setsidebar] = useState(false)
    const [login, setlogin] = useState(false)
    const [logindata, setlogindata] = useState()
    let email = useRef("")
    let password = useRef("")
    let username = useRef("")
    const[userm,setuser] = useState()
    const[data,setdata] = useState([])
    const[searchw, setsearchw] = useState(300)
    let navigate = useNavigate()
    useEffect(()=>{
      axios.get(`${BASE_URL}/listing`)
      .then(res=>{setdata(res.data )})
    },[data])

    const[navb, setnavb] = useState(true)

    const[reg, setreg] = useState(false)

    useEffect(()=>{
      axios.get(`${BASE_URL}/finduser`,{withCredentials:true})
      .then(res=>{
        if(res.data){
          setuser(res.data)
        }
      })
    })

    const loging = useGoogleLogin({
      onSuccess: tokenResponse => {
        
          axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers:{
                Authorization: `Bearer ${tokenResponse.access_token}`
              }
            }
        ).then(res=>{setlogindata(res.data)
          // console.log(res)
          axios.post(`${BASE_URL}/login`, {email: res.data.email, source:2, username:res.data.name}, {withCredentials:true})
          .then(ress=>{
            console.log(ress.data)
            if(ress.data.email){
              axios.post(`${BASE_URL}/cookie`,{email:ress.data.email},{withCredentials:true})
              toast.success("Login successfull",{autoClose:2500})
              setlogin(false)
              setsidebar(false)
              // username.current.value 
              setuser(ress.data.email)
            }
            
          })
        }
      
        
      )
        
      }
    });
    // console.log(username.current.value)
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 700) {
          setSearch(false);
          setsidebar(false)
        } else {
          setSearch(true);
        }
      };
  
      window.addEventListener("resize", handleResize);
  
      // Call once to set initial state (optional if already done in useState)
      handleResize();
  
      // Cleanup
    }, []);

  let navarray = ["Home", "Experience", "Services"]
  let searcharray = ["Where", "Check in", "Check out",`Who`,]

  const handleEmailSubmit = ()=>{
    if(reg){
      axios.post(`${BASE_URL}/register`,{email:email.current.value, source:1, password:password.current.value, username:username.current.value},{withCredentials:true})
      .then(res=>{
        if(res.data.email){
          toast.success("Registeration successfull",{autoClose:2500})
          // setsidebar(!sidebar)
          // setlogin(!login)
          setreg(!reg)
          
        }
        else{
          toast.error(res.data,{autoClose:2500})
        }
      })
    }else{
      axios.post(`${BASE_URL}/login`,{email:email.current.value, source:1, password:password.current.value},{withCredentials:true})
      .then(res=>{
        let email = res.data.email
        if(res.data.email){
          toast.success("Login successfull",{autoClose:2500})
          axios.post(`${BASE_URL}/cookie`,{email},{withCredentials:true})
          setsidebar(!sidebar)
          setlogin(!login)
          // console.log(res)
          setuser(res.data.username)
        }
        else{
          toast.error(res.data,{autoClose:2500})
        }
      })
    }
  }

  // console.log(userm)
  return (
    <div className="w-screen h-screen overflow-y-auto relative">
      <ToastContainer/>
      <nav className="h-[17%] bg-gray-100 min-w-full flex justify-center flex-col fixed z-50">
        {search? 
        <p className="font-embed absolute left-6 top-6 text-xl text-red-400 font-bold">StayFinder</p>
        :""
    }
        <div className="w-full h-full justify-center flex items-center">
          <ul className="flex justify-between list-none h-[50%] items-center w-[100%] max-w-[300px] min-w-50 text-[16px] gap-5  transition-all">
           <li className='flex flex-row items-center justify-center text-center gap-2 relative after:border-1 after:w-0 after:bottom-0 after:absolute hover:after:w-full after:transition-all after:opacity-0 hover:after:opacity-100 hover:scale-110 transition-all'> <FaHome /> Home</li>
           <li className='flex flex-row items-center justify-center text-center gap-2 relative after:border-1 after:w-0 after:bottom-0 after:absolute hover:after:w-full after:transition-all after:opacity-0 hover:after:opacity-100 hover:scale-110 transition-all'><IoIosApps />Experience</li>
           <li className='flex flex-row items-center justify-center text-center gap-2 relative after:border-1 after:w-0 after:bottom-0 after:absolute hover:after:w-full after:transition-all after:opacity-0 hover:after:opacity-100 hover:scale-110 transition-all'><span className='text-xl'><MdRoomService /></span>Services</li>
          </ul>
        </div>

        {search ? (
          <div className="w-full h-full justify-center flex items-center mb-3">
            <ul className="flex justify-between list-none h-[80%] w-[90%] max-w-[900px]  bg-white shadow-lg shadow-gray-400 min-w-50 text-sm lg:text-lg md:text-[17px] xl:text-xl transition-all items-center rounded-4xl">
            <div className='flex flex-row w-[100%] h-full text-center '>
            
    
           {navb ?<> <li  className='w-[100%] flex  justify-center rounded-4xl hover:bg-gray-200 active:bg-gray-200 text-[14px] lg:text-[15px] md:text-[15px] xl:text-[15px] transition-all flex-col text-left pl-7 font-bold ' >Where <span className='font-normal text-gray-500'>Search destination</span></li>
            <li  className='w-[100%] flex  justify-center rounded-4xl hover:bg-gray-200 active:bg-gray-200 text-[14px] lg:text-[15px] md:text-[15px] xl:text-[15px] transition-all flex-col text-left pl-7 font-bold ' >Check in <span className='font-normal text-gray-500'>Add dates</span></li>
            <li  className='w-[100%] flex  justify-center rounded-4xl hover:bg-gray-200 active:bg-gray-200 text-[14px] lg:text-[15px] md:text-[15px] xl:text-[15px] transition-all flex-col text-left pl-7 font-bold ' >Check out <span className='font-normal text-gray-500'>Add dates</span></li>
            <li  className='w-[100%] flex  justify-center rounded-4xl hover:bg-gray-200 active:bg-gray-200 text-[14px] lg:text-[15px] md:text-[15px] xl:text-[15px] transition-all flex-col text-left pl-7 font-bold ' >Who <span className='font-normal text-gray-500'>Add guests</span></li> </> : "" }




                       <li className=' bg-rose-400 mr-1 flex items-center justify-center rounded-full h-[90%] text-center mt-1  hover:bg-rose-500 transition-all duration-600 active:bg-gray-200 text-white' style={{width:`${searchw}px`}}><IoSearch onClick={()=>{setsearchw(()=>{
                        if(searchw == 2000){
                          setsearchw(0)
                        }
                        else{
                          setsearchw(2000)
                        }
                       }),setnavb(!navb)
                       setTimeout(()=>(
                         setsearchw(0)
        ),1200) }
                      }  /> </li>

            </div>
            </ul>
          </div>
        ) : <div className='flex h-[100%] items-center justify-center mb-3  '>
            <div className='flex flex-row w-[90%] max-w-[500px] rounded-4xl  bg-white shadow-md shadow-gray-700 outline-0 pl-4'>
            <input type="text" className='w-[85%]  h-16 outline-0 text-lg pl-5 placeholder:text-center placeholder:font-bold placeholder:text-black' placeholder='Start your search' />
            <p className='text-2xl  p-5 rounded-full'><IoSearch /></p>
            </div>
            </div>}

            
      </nav>
      {search? 
      <div className='z-50 relative' >
        <p className='top-5 right-40 text-sm absolute p-2 rounded-full font-bold '>{userm ? userm : ""}</p>
        {userm ? "": <p className=' hidden lg:block xl:block top-5 right-42 text-md absolute p-2'>Become a host</p>}
        <div className=' top-4 right-27 text-3xl absolute p-2 rounded-full bg-gray-300 '>
        <TbWorld />

        </div>
        <div className=' top-4 right-11 text-3xl absolute p-2 rounded-full bg-gray-300 cursor-pointer  ' onClick={()=>setsidebar(!sidebar)}>
        <IoReorderThreeOutline />
        </div>

      </div>
       :""}
       {sidebar  ?<div className='absolute z-50 w-fit bg-white top-16 h-fit px-5 py-2 right-7 rounded-b-xl rounded-[90%/100%]  shadow-xl text-center pt-3 cursor-pointer'onClick={()=>{
        if(login){
          setlogin(false)
        }else{
          setlogin(true)
        }
       }} >
        Login
       </div> : "" }
      {login ?  <div className='w-screen h-screen flex absolute top-0 justify-center items-center border backdrop-blur-sm z-50 ' onClick={()=>{if(login){
          setlogin(false)
        }else{
          setlogin(true)
        }}}>
       <div className='w-[70%] h-[50%] z-50 border top-0 rounded-2xl min-w-[350px] max-w-[500px] relative shadow-2xl bg-white' onClick={(e)=>e.stopPropagation()}>
       <p className='text-sm absolute top-3 left-3 p-2 rounded-full bg-gray-200 hover:scale-125 transition-all' onClick={()=>{
        setlogin(!login)
        // setsidebar(false)
       }}><RxCross1 className="" /></p>
       <div className="flex items-center flex-col justify-evenly w-full h-[60%] py-10">
       {reg? <input className="border w-[80%] h-12 rounded-xl pl-4 cursor-pointer " placeholder='Enter your username' ref={username} onChange={()=>username.current.value}/> : ""}
      
       <input className="border w-[80%] h-12 rounded-xl pl-4 cursor-pointer" placeholder='Enter your email' ref={email} onChange={()=>email.current.value}/>
       <input className="border w-[80%] h-12 rounded-xl pl-4 cursor-pointer" placeholder='Enter your password' ref={password} onChange={()=>password.current.value}/>

       </div>
       <div className="items-center flex justify-center flex-col gap-3">
        <button className="border w-[70%] h-10 rounded-full shadow-md shadow-gray-700 cursor-pointer hover:scale-105 transition-all" onClick={handleEmailSubmit}><p className='flex justify-center items-center gap-3'><MdEmail className='text-xl' /> Continue with Email</p></button>
        <button className="border w-[70%] h-10 rounded-full shadow-md shadow-gray-700 cursor-pointer hover:scale-105 transition-all" onClick={() => loging()}> <p className='flex justify-center items-center gap-3'> <FaGoogle className='text-lg' /> Sign in with Google </p></button>
        <div className='mt-2 flex flex-row'>{!reg ? <p>New User ? Create account </p> : <p>Login ? Click</p>} <span className='text-blue-600 cursor-pointer pl-2 hover:scale-110' onClick={()=>setreg(!reg)}>here</span></div>
        </div>
       </div>
       </div> : ""}

       <div className=' ml-5 absolute top-48'>
        <ul className='flex gap-5 flex-wrap justify-center items-center'>
          {data.map((item, key)=>(
            // console.log(item),
            <li key={key} className='relative ' onClick={()=>{
              navigate("/item",{state:{data:item, user:userm}})
            }}>
              <div className='w-[200px] h-[200px]  mt-10 xl:w-[230px] xl:h-[230px] lg:w-[220px] lg:h-[220px] md:w-[210px] md:h-[210px]'>
              <img src={item.image} alt="" className='w-full h-full object-cover rounded-2xl' /> 
              {item.liked ? <FaRegHeart className='absolute top-15 right-6 text-[23px] hover:scale-125 transition-all text-red-600 active:scale-95 ' onClick={(e)=>{
                e.stopPropagation()
                if(userm){
                  let like = toast.loading("Processing",{style:{width:"200px"}})
                axios.post(`${BASE_URL}/updatelike/${item._id}/${item.liked}`)
                .then(res=>{
                  if(res.data == "Done")
                    toast.update(like,{render:"Unliked", type:"success",isLoading:false , autoClose:700,style:{width:"120px"}})
                  else{
                    toast.update(like,{render:"Failed", type:"error", isLoading:false , autoClose:700,style:{width:"120px"}})
                  }
                })
                }
                else{
                  setlogin(!login)
                }
              }}  /> : <FaRegHeart className='absolute top-15 right-6 text-[23px] hover:scale-125 transition-all text-black active:scale-95 '  onClick={(e)=>{
                e.stopPropagation()
                console.log(userm)
                if(userm)
               {
                let like = toast.loading("Processing",{style:{width:"200px"}})
                axios.post(`${BASE_URL}/updatelike/${item._id}/${item.liked}`)
                .then(res=>{
                  if(res.data == "Done")
                    toast.update(like,{render:"Liked", type:"success",isLoading:false , autoClose:700,style:{width:"120px"}})
                  else{
                    toast.update(like,{render:"Failed", type:"error",isLoading:false , autoClose:700, style:{width:"120px"}})
                  }
                })
               }
               else{
                setlogin(!login)
              }

              }}/>}
              <p className='text-left ml-2 text-sm font-semibold mt-2'>{item.name}, {item.area}, ₹{item.price}</p>
              {/* <p className='text-sm pl-2 text-gray-500'>{item.description}</p> */}
              </div>

            </li>
          ))}
        </ul>
       </div>
       
    </div>
  );
}

export default Home;
