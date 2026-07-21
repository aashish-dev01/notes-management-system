import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, register, getCurrentUser } from "../services/authService";


const AuthContext = createContext(); // create a context




export function AuthProvider({ children }) { 

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // when App start:
    
    useEffect(() => {

        const checkUser = async () => {

            try {

                const response = await getCurrentUser();

                setUser(response.data.user);

            }

            catch {

                setUser(null);

            }

            finally {   // this runs when catch does not executes

                setLoading(false);

            }
            };

           checkUser(); // call our function so that when app firstly start our function runs 

    }, []);

    // now our login api call 

     const loginUser = async (data) => {

        const response = await login(data);

        setUser(response.data.user); // state update

    };

    // now our register api call 

    const registerUser = async (data) => {

        const response = await register(data);

        setUser(response.data.user); // state update

    };

    //logout 

     const logoutUser = async () => {

        await logout();

        setUser(null);  // state update

    };

    // now we return a template so we do not write values in our provider wrap
   // here childern is that component who wants to use these values i.e <App>
     return (

        <AuthContext.Provider value={{user,loading,loginUser,registerUser,logoutUser}} >

            {children}  

        </AuthContext.Provider>

     );

}

// now we write a direct function which holds our useContext

export const useAuth = () => {

        return useContext(AuthContext);
    };