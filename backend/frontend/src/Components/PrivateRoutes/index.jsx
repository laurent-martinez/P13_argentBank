import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
   const { isAuth } = useSelector((state) => state.login)
   return isAuth ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoutes
