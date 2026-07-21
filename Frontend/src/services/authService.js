import api from "./api.js";

export const register = (userData)=>{  // a function which reqire a userdata and this function retur a api call

return api.post(

"/register",

userData

);

};

// same way for our login api call

export const login = (userData)=>{

return api.post(

"/login",

userData

);

};

// same way for our logout api call

export const logout = ()=>{

return api.post(

"/logout",

);

};

// for currentUser

export const getCurrentUser = ()=>{

return api.get(

"/me"

);

};



