import axios from "axios";

const Api = axios.create({
    baseURL: '/api/',
    timeout: 10000,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
})

export default Api