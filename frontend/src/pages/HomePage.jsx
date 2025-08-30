import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

function HomePage() {
  return (
    <div className='flex lg:flex-row flex-col lg:justify-between '>
       <div className='lg:w-[15vw] '>
            <Sidebar/>
       </div>
       <div className='lg:w-[85vw]'>
            <Outlet/>
       </div>
    </div>
  )
}

export default HomePage
