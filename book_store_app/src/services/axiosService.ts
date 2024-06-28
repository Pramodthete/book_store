import axios from 'axios'

const BASE_URL = `https://bookstore.incubation.bridgelabz.com/bookstore_user`

export const getData=(url:String,headers:Object)=>{
    return axios.get(BASE_URL+url,headers)
}

export const postData=(url:String,data:String,headers:Object)=>{
    return axios.post(BASE_URL+url,data,headers)
}