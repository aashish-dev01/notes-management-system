import React from 'react'
import { Link,  } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Navbar = () => {

  const { user, } = useAuth();

  return (
    <>
      <nav className="bg-violet-100 shadow-xl w-full m-1">
        <div className="max-w-7xl mx-auto px-2 py-2 flex justify-between items-center sticky top-0 z-50 md:px-4 md:py-4">

          <Link
            to="/"
            className="text-2xl font-bold text-violet-600 "
          >
            Home         
             </Link>

          {user ? (
            <div className=" flex items-center gap-4 md">
              <p className="text-gray-700 capitalize font-bold ">
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