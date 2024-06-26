import type { loginDataType } from '@/stores/login'
import {postData} from '../services/axiosService'
import type { registerType } from '@/stores/signUp'


export const loginData = (data:loginDataType) => {
    let url = '/login'
    const headers = {
      'Content-Type': 'application/json'
    }
    return postData(url, data, headers)
  }
  
  export const registerData = (data:registerType) => {
    let url = '/registration'
    const headers = {
      'Content-Type': 'application/json'
    }
    return postData(url, data, headers)
  }