import React from 'react'

const Inputfield = ({lable, type, name, placeholder, value, onChange}) => {

  return (
    <div>
        <lable className="block text-sm font-medium mb-2">
             
            {lable}

        </lable>


         <input 
               className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
               type = {type}
               name = {name}
               placeholder= {placeholder}
               value={value}
               onChange={onChange}

         />

    </div>
  )
}

export default Inputfield;