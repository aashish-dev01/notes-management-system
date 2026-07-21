import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import Swal from 'sweetalert2';
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {

  const { user, logoutUser } = useAuth();
  const {darkMode,toggleTheme} = useTheme();

  const navigate = useNavigate();

  const handleLogout = async () => {

     const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "You will Logout.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#dc2626",
                    cancelButtonColor: "#6b7280",
                    confirmButtonText: "Logout",
                    cancelButtonText: "Cancel",
                });

     if (!result.isConfirmed) return;

    
   try{
      await logoutUser();
     navigate("/");

   } catch(error){
    console.log(error);
    

   }
    

  };

  return (
    <>
      <nav className="bg-slate-50 shadow-md ">
        <div className="max-w-8xl mx-auto px-4 py-4 flex justify-between items-center sticky top-0 z-50">

          <Link
            to="/"
            className="text-2xl font-bold text-violet-600"
          >
            My App
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <p className="text-gray-700 capitalize ">
                Hi, {user.name}
              </p>

             

              <Link
              className="bg-violet-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-600 transition duration-300 cursor-pointer"

              to="/profile"
              >
                 Profile    
              </Link>

              <Link
              className="bg-violet-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-600 transition duration-300 cursor-pointer"

              to="/Dashboard"
              >
                 Dashboard    
              </Link>

               <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition duration-300 cursor-pointer"
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className=" bg-violet-600 text-white px-4 py-2  rounded-lg hover:bg-violet-700 transition duration-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition duration-300"
              >
                Register
              </Link>
            </div>
          )}

        </div>
      </nav>
    </>

  );
}

export default Navbar;