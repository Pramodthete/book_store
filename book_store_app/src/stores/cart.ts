import { defineStore } from "pinia";
import {
  addToCart,
  getAllCartItems,
  deleteFromCart,
  addItemQty
} from "@/services/bookStoreService";
import type { Book, Cart } from "./types";
import { useHomeStore } from "./home";
import { loginData } from "@/services/userService";

export const useCartStore = defineStore("cart", {
  state: () => ({
    quantity: 0 as Cart["quantityToBuy"],
    allCartItems: [] as Cart[],
    totalCarts: 0,
    cartBook: null as Cart["product_id"] | null,
    cartName: null as string | null,
    cartAddresss: null as string | null,
    cartMobile: null as string | null,
    cartEmail: null as string | null,
    cartCity: null as string | null,
    cartState: null as string | null,
    cartId: "" as string,
    totalPrice: 0
  }),

  getters: {
    cartItemsCount: (state) => state.allCartItems.length,
    cartUserInfo: (state) => ({
      name: state.cartName,
      address: state.cartAddresss,
      city: state.cartCity,
      state: state.cartState,
      mobile: state.cartMobile,
      email: state.cartEmail,
    }),
  },

  actions: {
    async addIntoCart(bookId: string) {
      const homestore = useHomeStore();
      if (homestore.book1) {
        try {
          const res = await addToCart(bookId);
          console.log(res);
          homestore.fetchBooks();
          this.fetchAllCarts();
        } catch (error) {
          console.log(error);
        }
      }
    },

    async addQuantity(cartId: string, qty: number) {
      const data = { quantityToBuy: qty };
      const homestore = useHomeStore();
      if (homestore.book1) {
        try {
          const res = await addItemQty(cartId, data);
          console.log(res);
          this.fetchAllCarts();
        } catch (error) {
          console.log(error);
        }
      }
    },

    async removeFromCart(cartId: string) {
      const homestore = useHomeStore();
      if (homestore.book1) {
        try {
          const res = await deleteFromCart(cartId);
          homestore.fetchBooks();
          this.fetchAllCarts();
          this.getOneBook(cartId);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      }
    },

    increment(bookId: string, cartId: string, qty: number) {
      if (qty === 0) {
        this.quantity = (this.quantity ?? 0) + 1;
        this.addIntoCart(bookId);
        this.getOneBook(bookId);
      } else if (qty > 0) {
        this.quantity = (qty ?? 0) + 1;
        console.log(cartId);
        this.addQuantity(cartId, this.quantity);
      } else {
        console.log("out of stock");
      }
    },

    decrement(cartId: string, qty: number) {
      if (qty === 1) {
        this.removeFromCart(cartId);
        this.fetchAllCarts();
        console.log(qty);
      } else if (qty > 1) {
        console.log(qty);
        this.quantity = qty - 1;
        this.addQuantity(cartId, this.quantity);
      }
    },


    async fetchAllCarts() {
      const tk = localStorage.getItem("x-access-token");
      try {
        const res = await getAllCartItems(tk);
        console.log(res.data.result);
        this.totalCarts = res.data.result.length;
        this.allCartItems = res.data.result;
        
        this.totalPrice = this.allCartItems.reduce((sum, book) => {
          return sum + (book.quantityToBuy * book.product_id.discountPrice);
      }, 0);
      
        if (this.allCartItems.length > 0) {
          const user = this.allCartItems[0].user_id;
          if (user) {
            this.cartName = user.fullName || null;
            this.cartMobile = user.phone || null;
            this.cartEmail = user.email || null;
            const address = user.address && user.address.length > 0 ? user.address[0] : undefined;
            if (address) {
              this.cartAddresss = address.fullAddress || null;
              this.cartCity = address.city || null;
              this.cartState = address.state || null;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    getOneBook(bookId: string) {
      console.log("allCartItems:", this.allCartItems);
      const oneBook = this.allCartItems.find(
        (book) => book.product_id._id === bookId
      );
      this.cartBook = oneBook ? oneBook.product_id : null;
      this.quantity = oneBook?.quantityToBuy || 0;
      this.cartId = oneBook?._id || "";
      console.log(oneBook);
      return this.cartBook;
    },
    
  }
});
