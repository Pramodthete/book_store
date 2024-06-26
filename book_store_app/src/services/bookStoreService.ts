import { getData,postData } from "./axiosService"
const token = localStorage.getItem('x-access-token')
export const getAllBooks = () => {
    let url = `/get/book`
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }
    return getData(url, headersOptions)
  }

  export const addToCart = (bookId:string) => {
    console.log(token);
    
    let url = `/add_cart_item/${bookId}`
    let data = {}
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }
    return postData(url,data, headersOptions)
  }

  export const getAllCartItems = () => {
    let url = `/get_cart_items`
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }
    return getData(url, headersOptions)
  }