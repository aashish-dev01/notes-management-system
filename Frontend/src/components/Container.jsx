import React from 'react'

const Container = ({ children }) => {
    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
               
                 {children} 

            </div>

        </div>
    )
}

export default Container