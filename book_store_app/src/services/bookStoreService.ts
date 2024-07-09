import { getData,postData,putData,deleteData } from "./axiosService"
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

  export const deleteFromCart = (cartId:string) => {
    let url = `/remove_cart_item/${cartId}`
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

  export const get_wishlist_items = (tk:string | null)=>{
    let url = `/get_wishlist_items`
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': tk
      }
    }
    return getData(url, headersOptions)
  }

  export const addItemQty = (cartId:string,data:Object)=>{
    console.log(data);
    
    let url = `/cart_item_quantity/${cartId}`
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }
    return putData(url,data, headersOptions)
  }

  export const deleteFromWishlist = (bookId:string) => {
    let url = `/remove_wishlist_item/${bookId}`
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }
    return deleteData(url, headersOptions)
  }

  export const addItemToWishlist = (bookId:string)=>{
    let url = `/add_wish_list/${bookId}`
    let data={}
    let headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }
    return postData(url,data, headersOptions)
  }