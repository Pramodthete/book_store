import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { getAllBooks, get_wishlist_items } from "@/services/bookStoreService";
import type { StoreState, Book, Wishlist } from "./types";

export const useHomeStore = defineStore("home", {
  state: () => ({
    page: 1 as StoreState["page"],
    itemsPerPage: 12 as StoreState["itemsPerPage"],
    count: 0 as StoreState["count"],
    book1: {} as Book,
    searchText: "" as StoreState["searchText"],
    originalBooks: [] as StoreState["originalBooks"],
    books: [] as StoreState["books"],
    totalWishlist: [] as Wishlist[],
  }),

  getters: {
    paginatedBooks(state) {
      const start = (state.page - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.books.slice(start, end);
    }
  },

  actions: {
    async fetchBooks() {
      try {
        const res = await getAllBooks();
        this.originalBooks = res.data.result;
        this.books = [...this.originalBooks];
        this.count = this.books.length;
        console.log(res.data.result);
      } catch (error) {
        console.log(error);
      }
    },

    setBook(book: Book) {
      this.book1 = book;
    },

    search(typeText: string) {
      if (typeText) {
        const lowerCaseText = typeText.toLowerCase();
        this.books = this.originalBooks.filter(
          (book) =>
            (book.bookName &&
              book.bookName.toLowerCase().includes(lowerCaseText)) ||
            (book.author && book.author.toLowerCase().includes(lowerCaseText)) ||
            (book.discountPrice &&
              book.discountPrice.toString().includes(typeText))
        );
      } else {
        this.books = [...this.originalBooks];
      }
      console.log(this.books);
    },

    highToLow() {
      this.books.sort((a, b) => {
        const priceA = a.discountPrice ?? 0;
        const priceB = b.discountPrice ?? 0;
        return priceB - priceA;
      });
    },

    lowToHigh() {
      this.books.sort((a, b) => {
        const priceA = a.discountPrice ?? 0;
        const priceB = b.discountPrice ?? 0;
        return priceA - priceB;
      });
    },

    async getAllWishlistItems() {
      const tk = localStorage.getItem("x-access-token");
      try {
        const res = await get_wishlist_items(tk);
        console.log(res.data.result);
        this.totalWishlist = res.data.result.filter((book: { product_id: null; }) => book.product_id !== null);
      } catch (error) {
        console.log(error);
      }
    }
  }
});
