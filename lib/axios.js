import axios from "axios";
const BASE_URL = `${process.env.APP_URL}/api`

const instance = axios.create({
    baseURL: BASE_URL,
})
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export default instance