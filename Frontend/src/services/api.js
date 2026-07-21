import axios from "axios";

const api = axios.create({

    baseURL : "http://localhost:3000/Api",

    withCredentials : true

});

export default api;

// now we can directly use api.get(/profile)  and  api.post(/login)
// in our whole app