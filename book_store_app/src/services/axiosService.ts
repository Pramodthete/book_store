import type { loginDataType } from '@/stores/login'
import type { registerType } from '@/stores/signUp'
import axios from 'axios'

const BASE_URL = `https://bookstore.incubation.bridgelabz.com/bookstore_user`

export const getData=(url:String,headers:Object)=>{
    return axios.get(BASE_URL+url,headers)
}

export const postData=(url:String,data:loginDataType | registerType | Object,headers:Object)=>{
    return axios.post(BASE_URL+url,data,headers)
}
export const deleteData=(url:String,headers:Object)=>{
    return axios.post(BASE_URL+url,headers)
}