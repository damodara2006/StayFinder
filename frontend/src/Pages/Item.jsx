import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { FaRegHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosApps } from "react-icons/io";
import { MdRoomService } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { useGoogleLogin } from '@react-oauth/google';
// import {ToastContainer, toast} from "react-toastify"
import { MdEmail } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
function Item() {
  const [showmore, setshowmore] = useState(true)
  let BASE_URL = "https://stayfinder-backend-dcdq.onrender.com"
  const [startDate, setStartDate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());

  let location = useLocation()
  let data = location.state.data
  let user = location?.state?.user
  // console.log(user)

  const [search, setSearch] = useState(window.innerWidth >= 600);
  const [sidebar, setsidebar] = useState(false)
  const [login, setlogin] = useState(false)
  const [logindata, setlogindata] = useState()
  let email = useRef("")
  let password = useRef("")

  const [navb, setnavb] = useState(true)

  const [reg, setreg] = useState(false)
  let username = useRef("")
  const [userm, setuser] = useState()
  // const[data,setdata] = useState([])
  const [searchw, setsearchw] = useState(300)
  // let navigate = useNavigate()
  useEffect(() => {
    axios.get(`${BASE_URL}/listing`)
      .then(res => { setdata(res.data) })
  }, [data])
  // console.log(data)
  const [price, setprice] = useState(0)
  let text = data.description
  const [confirm, setconfirm] = useState(false)
  // console.log(text)
  return (
    <div className='min-w-screen flex items-center justify-center flex-col relative'>
      <ToastContainer />
      <nav className="h-[8%] bg-gray-100 min-w-full flex justify-center flex-col fixed z-30 top-0">
        {search && (
          <p className="font-embed absolute left-6 top-6 text-xl text-red-400 font-bold hidden md:block">StayFinder</p>
        )}
        <div className="w-full h-full justify-center flex items-center ">
          <ul className="flex justify-between list-none h-[50%] items-center w-full max-w-[300px] min-w-50 text-[16px] gap-5 transition-all px-4">
            <li className='flex flex-row items-center justify-center text-center gap-2 relative after:border-1 after:w-0 after:bottom-0 after:absolute hover:after:w-full after:transition-all after:opacity-0 hover:after:opacity-100 hover:scale-110 transition-all'><FaHome /> Home</li>
            <li className='flex flex-row items-center justify-center text-center gap-2 relative after:border-1 after:w-0 after:bottom-0 after:absolute hover:after:w-full after:transition-all after:opacity-0 hover:after:opacity-100 hover:scale-110 transition-all'><IoIosApps /> Experience</li>
            <li className='flex flex-row items-center justify-center text-center gap-2 relative after:border-1 after:w-0 after:bottom-0 after:absolute hover:after:w-full after:transition-all after:opacity-0 hover:after:opacity-100 hover:scale-110 transition-all'><MdRoomService /> Services</li>
          </ul>
        </div>
        <div className='absolute top-2 right-6 font-bold'>
          {user ? <p>{user}</p> : <p>Not logined</p>}
        </div>
      </nav>

      <div className='mt-26 ml-1  items-center flex flex-col'>
        <p className='text-2xl font-bold text-left w-[100%] px-10 mt-5'>{data.name}, {data.area}</p>
        <div className='xl:w-[650px] xl:h-[650px] mt-5 w-[240px] h-[240px] md:w-[300px] md:h-[300px] lg:w-[550px] lg:h-[550px] flex items-center '>
          <img className="w-full h-full object-cover rounded-2xl" src={data.image} alt="" />
        </div>

        <div className='w-full h-[500px] relative flex items-center justify-center'>
          <div className='absolute top-0 flex flex-col items-center w-full'>
            <div className='w-[220px] h-[200px] border flex items-center flex-col mt-8 sticky top-0 rounded-2xl shadow-2xl z-40 bg-white'>
              <p className='text-center mt-5 font-bold'>Single room price : <span className='font-light'>₹{data.price}</span></p>
              <span className='flex text-center items-center justify-center mt-2'>
                <button className='border text-2xl px-2 rounded-full hover:scale-105 transition-all' onClick={() => {
                  if (price <= 0) return;
                  setprice((prev) => prev - 1);
                }}>-</button>
                <p className='px-5 border py-1 ml-2 mr-2 rounded-sm cursor-auto'>{price}</p>
                <button className='border text-2xl px-1 rounded-full hover:scale-105 transition-all' onClick={() => {
                  setprice((prev) => prev + 1);
                }}>+</button>
              </span>
              <p className='mt-3 font-medium'>2 Nights Total : ₹<span className='font-bold'>{price * data.price}</span></p>
              <button className='bg-gradient-to-r from-violet-600 to-violet-400 px-4 rounded-sm text-white mt-3 py-1 cursor-pointer hover:scale-110 transition-all' onClick={() => {
                setconfirm(!confirm);
              }}>Book now</button>

              {confirm && (
                <button className='bg-gradient-to-r from-violet-600 to-violet-400 px-4 rounded-sm text-white mt-4 py-1 cursor-pointer hover:scale-110 transition-all' onClick={() => {
                  axios.post(`${BASE_URL}/book`, {
                    user: user,
                    roomid: data._id,
                    price: (price * data.price),
                    startdate: startDate,
                    enddate: enddate
                  }).then(res => {
                    if (res.data.user && res.data.price) {
                      toast.success("Booked");
                      setconfirm(false);
                    } else {
                      toast.error(res.data);
                    }
                  });
                }}>Confirm</button>
              )}
            </div>

            <hr className="bg-black text-sm w-full mt-8" />

            <div className='mt-10 gap-3 flex flex-col items-center justify-center w-full ml-28 sm:ml-20 text-2xl'>
              <div className='flex items-center justify-center w-full font-bebas mr-10'>
                <p className='text-center'><span className='mr-20'>Starting date :</span><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></p>
              </div>
              <div className='font-bebas'>
                <p><span className='mr-6 md:ml-10 xl:mr-27 md:mr-20'>Ending date :</span><DatePicker className='ml-0 sm:ml-0 md:ml-10 lg:ml-0 xl:ml-0 md:mr-10' selected={enddate} onChange={(date) => setEnddate(date)} /></p>
              </div>
            </div>

            <hr className="bg-black text-sm w-full mt-8" />

            <div className='flex flex-col items-center justify-center relative px-5'>
              <p className='font-bold text-2xl mt-3 absolute top-0 left-0'>Description</p>
              <p className='text-justify mt-13'>
                {showmore ? text.substring(0, 200) + "..." : text}
              </p>
              <button onClick={() => setshowmore(!showmore)} className='border px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400 transition-all mb-52 mt-7 w-fit'>
                {showmore ? 'Show More' : 'Show Less'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className='fixed bottom-0 w-full h-20 bg-gray-500 z-50 text-gray-400 text-center flex items-center justify-center px-2'>
        <p>Developed by <span className='font-bold'>PDP</span> <a href="mailto:damodara2006@gmail.com">damodara2006@gmail.com</a></p>
      </footer>
    </div>

  )
}

export default Item
