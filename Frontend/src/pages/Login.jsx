import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import Container from "../components/Container";
import Inputfield from "../components/Input";
import Mybutton from "../components/Mybutton";
import toast from "react-hot-toast";


export default function Login() {

    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState("")

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const { loginUser } = useAuth();

    const navigate = useNavigate();

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setLoading(true); // mtln login hote tak rukho
            seterror(""); // empty kyoki login process hori hai
            await loginUser(formData);
            toast.success("Login Successful");

            navigate("/");

        }

        catch (error) {

            // alert(error.response.data.message);  // purana mrthod

            seterror(error.response.data.message)

        }
        finally {
            setLoading(false); // aakhir me firse loading band 
        }

    };

    return (

        <>    
                    <Container>    
           
                    <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
                    <p className="text-gray-500 text-center mt-2">
                        Sign in to continue
                    </p>
                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>


                        {error && (
                            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}


                        

                            <Inputfield
                                
                                lable= "Email"

                                type="email"

                                name="email"

                                value={formData.email}

                                onChange={handleChange}

                                placeholder="Enter Email"


                            />

                            <Inputfield
                                
                                lable= "Password"

                                type="password"

                                name="password"

                                value={formData.password}

                                onChange={handleChange}

                                placeholder="Enter Password"


                            />
                            
                            <Mybutton

                            type="submit"
                            disabled={loading}
                            text={loading?"logging in..." : "login"}
                            />

                        <div className="text-right">
                            <Link
                                to="#"
                                className="text-sm text-violet-600 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>


                        <p className="text-center text-sm text-gray-600 mt-6">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-violet-600 font-medium hover:underline"
                            >
                                Register
                            </Link>
                        </p>




                    </form>
                    </Container>  
                
        </>

    );

}