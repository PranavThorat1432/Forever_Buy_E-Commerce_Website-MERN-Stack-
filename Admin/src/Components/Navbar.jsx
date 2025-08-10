import React from 'react'
import { assets } from '../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <NavLink to='/'>
            <img className="w-[120px] sm:w-[150px] cursor-pointer" src={assets.logo} alt="" />
        </NavLink>
        <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer active:bg-black'>Logout</button>
    </div>
  )
}

export default Navbar
