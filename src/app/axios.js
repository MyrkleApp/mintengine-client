import axios from 'axios'

export const baseUrl = "https://algorand-backend.myrkle.app"


const API = axios.create({ baseURL: baseUrl })

API.interceptors.request.use(req => {

    if (localStorage.getItem('mint-engine')) {
        req.headers.Authorization = `Token ${JSON.parse(localStorage.getItem('mint-engine'))}`
    }

    return req
})

export default API
