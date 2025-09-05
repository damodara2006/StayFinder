import React from 'react'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Admin from './Pages/Admin';
import Item from './Pages/Item';
function App() {
  return (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT}>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
  <Route path='/admin' element={<Admin/>}/>
  <Route path="/item" element={<Item/>}/>
   </Routes>
   </BrowserRouter>
  </GoogleOAuthProvider>
  )
}
export default App
