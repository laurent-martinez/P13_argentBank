import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

/**
 * a component who define private routes depending on the logged status
 * @component
 * @returns {JSX.Element}
 */
const PrivateRoutes = () => {
   const { isAuth } = useSelector((state) => state.login)
   return isAuth ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoutes
