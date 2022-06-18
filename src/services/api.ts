import axios from 'axios'

export const api = axios.create({
    //baseURL: 'http://localhost:3001'
    //baseURL: 'https://appfabi.herokuapp.com'
    baseURL: process.env.NEXT_PUBLIC_URL_PADRAO
}) 