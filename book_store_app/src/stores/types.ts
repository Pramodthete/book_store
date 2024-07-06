export interface Book {
    _id: string;
    bookName?: string;
    author?: string;
    discountPrice?: number;
    quantity?: number;
    price?: number;
    description?: string;
  }
  
  export interface Feedback {
    _id: string;
    book_id: string;
    user_id: {
      _id: string;
      fullName: string;
    };
    rating: number;
    comment: string;
  }
  
  export interface Address {
    fullAddress: string;
    city: string;
    state: string;
  }
  
  export interface User {
    address: Address[];
    email: string;
    fullName: string;
    phone: string;
  }
  
  export interface Wishlist {
    _id: string;
    quantityToBuy: number;
    product_id: {
      _id: string;
      author: string;
      bookName: string;
      description: string;
      discountPrice: number;
      price: number;
      quantity: number;
    };
    user_id: User;
  }
  
  export interface Cart {
    _id: string;
    quantityToBuy: number;
    product_id: {
      _id: string;
      author: string;
      bookName: string;
      description: string;
      discountPrice: number;
      price: number;
      quantity: number;
    };
    user_id: User;
  }
  
  export interface StoreState {
    page: number;
    itemsPerPage: number;
    count: number;
    quantity: number;
    book1: Book;
    searchText: string;
    originalBooks: Book[];
    books: Book[];
  }