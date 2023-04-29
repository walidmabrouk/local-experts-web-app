import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({user, children}) =>{
   if(!user.isConnected){
     return <Navigate to="/login" replace />; //*  which replaces the current history entry with the new URL
   } 
  //* sinon return children=component 
   return children
}

export default PrivateRouter