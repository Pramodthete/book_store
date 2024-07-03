import { getData,postData,deleteData } from "./axiosService"
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

  export const getAllCartItems = (tk: string | null) => {
    let url = `/get_cart_items`
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': tk
      }
    }
    return getData(url, headersOptions)
  }

  export const getFeedbacksById = (bookId:string) => {
    let url = `/get/feedback/${bookId}`
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }
    return getData(url, headersOptions)
  }

  // deleteFromCart
  export const deleteFromCart = (cartId:string) => {
    let url = `/add_cart_item/${cartId}`
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }
    return deleteData(url, headersOptions)
  }

  export const storeFeedback = (bookId:string,data:Object) => {
    console.log(token);
    let url = `/add/feedback/${bookId}`
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }
    return postData(url,data, headersOptions)
  }
