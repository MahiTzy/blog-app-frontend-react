import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../auth'

const PrivatePages = () => {
   if(!isLoggedIn()){
       return (
           <Navigate to='/' />
       )
   }
    return (
         <div>
              <Outlet />
         </div>
    )
}

export default PrivatePages
