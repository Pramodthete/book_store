import {postData} from '../services/axiosService'

const token = localStorage.getItem('token')

export const loginData = (data:any) => {
    let url = '/login'
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token
    }
    return postData(url, data, headers)
  }
  
  export const registerData = (data:any) => {
    let url = '/registration'
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token
    }
    return postData(url, data, headers)
  }