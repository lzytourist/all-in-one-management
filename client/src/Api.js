import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 10000,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
})

export default Api