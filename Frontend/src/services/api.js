import axios from "axios";

const api = axios.create({

    baseURL : "https://notes-management-system-vs6k.onrender.com/Api",

    withCredentials : true

});

export default api;

// now we can directly use api.get(/profile)  and  api.post(/login)
// in our whole app