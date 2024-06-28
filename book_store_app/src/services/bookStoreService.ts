import { getData } from "./axiosService"
const token = localStorage.getItem('token')
export const getAllBooks = () => {
    let url = `/get/book`
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    }
    return getData(url, headersOptions)
  }