import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ProtectedRoute = ({children}) => { // here children is components which is wrap in <protectedroute>
  

    const { user, loading } = useAuth();

    if (loading) { // = true

            return <h2>Loading...</h2>;

     };

     if (!user) {

    return <Navigate to="/login" replace />; // if user= false 

}

     return children ; // children is <profile> so we can access profile

  
}

export default ProtectedRoute;