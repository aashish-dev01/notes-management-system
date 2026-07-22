import React from 'react'
import Navbar from './Navbar'
import { useAuth } from "../context/Authcontext";
import {FaReact,FaNodeJs,FaDatabase,FaLock,FaCode,} from "react-icons/fa";
import { SiExpress, SiMongodb, SiTailwindcss } from "react-icons/si";


const Home = () => {
  const {user} = useAuth(); // currunt user


  const techStack = [
    {
      icon: <FaReact className="text-sky-500 text-4xl" />,
      name: "React",
    },
    {
      icon: <SiTailwindcss className="text-cyan-500 text-4xl" />,
      name: "Tailwind CSS",
    },
    {
      icon: <FaNodeJs className="text-green-600 text-4xl" />,
      name: "Node.js",
    },
    {
      icon: <SiExpress className="text-gray-700 text-4xl" />,
      name: "Express.js",
    },
    {
      icon: <SiMongodb className="text-green-500 text-4xl" />,
      name: "MongoDB",
    },
    {
      icon: <FaLock className="text-red-500 text-4xl" />,
      name: "JWT Auth",
    },
  ];

  const features = [
    "Secure Authentication",
    "Create Notes",
    "Edit Notes",
    "Delete Notes",
    "Pin Important Notes",
    "Toast Notifications",
    "Responsive Design",
    "Clean UI",
  ];



  return (
    <> 

      <Navbar/>

       <div className="bg-slate-100 min-h-screen">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h1 className="text-5xl font-extrabold text-slate-800 mb-6">

          {user ? (
            <>
              Hello, <span className="text-blue-600">{user.name}</span> 👋
            </>
          ) : (
            <>
              Notes Management System
            </>
          )}

        </h1>

        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-8">
          Organize your ideas, save important notes, pin your tasks,
          and access everything securely from one place.
        </p>

      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="bg-white rounded-3xl shadow-md p-10">

          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            About This Project
          </h2>

          <p className="text-slate-600 leading-8 text-lg">
            This is a full-stack MERN Notes Management application developed by{" "}
            <span className="font-semibold text-blue-600">
              Aashish Gautam
            </span>.
            <br /><br />
            It helps users securely manage notes with authentication,
            CRUD operations, pinning functionality, and a modern responsive
            interface.
          </p>

        </div>

      </section>

      {/* Tech Stack */}

      <section className="max-w-6xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold text-center mb-12">
          Tech Stack
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {techStack.map((tech) => (

            <div
              key={tech.name}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 p-6 flex flex-col items-center"
            >

              {tech.icon}

              <p className="mt-4 font-semibold">
                {tech.name}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Features */}

      <section className="max-w-6xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {features.map((feature) => (

            <div
              key={feature}
              className="bg-white rounded-xl shadow p-5 flex items-center gap-4"
            >

              <FaCode className="text-blue-600 text-xl" />

              <p className="font-medium">
                {feature}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-8">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h3 className="text-2xl font-bold">
            Aashish Gautam
          </h3>

          <p className="text-slate-400 mt-2">
            MERN Stack Developer
          </p>

          <p className="text-slate-500 mt-4 text-sm">
            © 2026 Notes Management System. Built with React, Node.js,
            Express & MongoDB.
          </p>

        </div>

      </footer>

    </div>
      
      

    </>
  );
};

export default Home;