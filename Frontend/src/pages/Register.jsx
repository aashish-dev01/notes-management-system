import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import React from 'react'
import Container from "../components/Container";
import Inputfield from "../components/Input";
import Mybutton from "../components/Mybutton";
import toast from "react-hot-toast";

const Register = () => {


    const [loading, setloading] = useState(false)
    const [error, seterror] = useState("")





    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",

        confirmPassword: ""

    });

    const { registerUser } = useAuth();

    const navigate = useNavigate();

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

           toast.error("Password doesn't match");

            return;

        }

        try {

            setloading(true) // loading till user registerd
             seterror(""); // empty kyoki login process hori hai

            await registerUser({

                name: formData.name,

                email: formData.email,

                password: formData.password

            });

            toast.success("Registration Successful");

            navigate("/Dashboard");

        }

        catch (error) {

            seterror(error.response.data.message)

        }
        finally {
            setloading(false); // aakhir me firse loading band 
        }

    };


    return (
        <>

                 <Container>
        
                 <h1 className="text-3xl font-bold text-center">Create Account</h1>
                    <p className="text-gray-500 text-center mt-2">
                        Register to continue
                    </p>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>


                  {error && (
                            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                


                <Inputfield

                    lable ="Your Name"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}

                />
                
                 

                <Inputfield

                    lable= "Email"

                    type="email"

                    name="email"

                    placeholder="Enter Email"

                    value={formData.email}

                    onChange={handleChange}

                />



                <Inputfield

                    lable= "Password"

                    type="password"

                    name="password"

                    placeholder="Enter Password"

                    value={formData.password}

                    onChange={handleChange}

                />
                


                <Inputfield
               
                    lable= "Confirm Password"


                    type="password"

                    name="confirmPassword"

                    placeholder="Confirm Password"

                    value={formData.confirmPassword}

                    onChange={handleChange}

                />
                

                <Mybutton
                
                type="submit"
                disabled={loading}
                text={loading?"Please Wait":"Register"}
                />
                            
                            

                    

                

                    
                        <p className="text-center text-sm text-gray-600 ">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Login
                            </Link>
                        </p>

            </form>

            </Container>
            
        </>
    )
}

export default Register;