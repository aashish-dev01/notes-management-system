import React from 'react'

const Mybutton = ({type,disabled,text}) => {
  return (
    <div>

     <button   
         type={type}
         disabled={disabled}
         className="w-full bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
     >
        {text}
         
         

     </button>

    </div>
  )
}

export default Mybutton