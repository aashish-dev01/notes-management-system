import React from "react";
import { useAuth } from "../context/Authcontext";
import Navbar from "../components/Navbar";
import {
  FaUserCircle,
  FaUser,
  FaEnvelope,
  FaPen,
} from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10 px-4 min-w-2xl">

        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">

          {/* Header */}

          <div className="bg-blue-600 text-white p-8 flex flex-col items-center">

            <FaUserCircle className="text-8xl mb-4" />

            <h1 className="text-3xl font-bold">
              {user?.name}
            </h1>

            <p className="text-blue-100 mt-2">
              Welcome to your profile
            </p>

          </div>

          {/* Body */}

          <div className="p-8 space-y-6">

            <div className="flex items-center gap-4 border rounded-xl p-4">

              <FaUser className="text-blue-600 text-2xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                <h2 className="text-lg font-semibold">
                  {user?.name}
                </h2>

              </div>

            </div>

            <div className="flex items-center gap-4 border rounded-xl p-4">

              <FaEnvelope className="text-green-600 text-2xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Email Address
                </p>

                <h2 className="text-lg font-semibold break-all">
                  {user?.email}
                </h2>

              </div>

            </div>

            {/* Future Features */}

            <div className="bg-slate-50 rounded-xl p-5 border">

              <h3 className="text-lg font-semibold mb-2">
                About Your Account
              </h3>

              <p className="text-gray-600">
                This profile belongs to your Notes Management System
                account. Soon you'll be able to upload a profile picture,
                update your details, and change your password.
              </p>

            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <FaPen />
              Edit Profile (Coming Soon)
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default Profile;