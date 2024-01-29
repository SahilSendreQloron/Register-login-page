import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';

function Navbar() {
    
    
const {isAuth,setIsAuth} = useAuth();
const logout = ()=>{
    setIsAuth(false)
    toast.success("Logged Out !")
}

  return (
    <div className='w-[100%] h-20  bg-slate-400 grid grid-cols-2'>
        <Link to='/' className='m-auto'>
        <p className='text-2xl m-auto hover:text-white'>
            Home
        </p>
        </Link>
        <Link to='/login ' className='m-auto'>
        <p className='text-2xl m-auto hover:text-white' onClick={logout} >
            Logout
        </p>
        </Link>
    </div>
  )
}

export default Navbar