import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {
  getAllBooks,
  addToCart,
  getAllCartItems,
  deleteFromCart,
  get_wishlist_items,
} from "@/services/bookStoreService";

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

export const useHomeStore = defineStore("home", () => {
  const page = ref<StoreState["page"]>(1);
  const itemsPerPage = ref<StoreState["itemsPerPage"]>(12);
  const count = ref<StoreState["count"]>(0);
  const quantity = ref<Cart["quantityToBuy"]>(0);
  const book1 = ref<StoreState["book1"]>({} as Book);
  const router = useRouter();
  const searchText = ref<StoreState["searchText"]>("");
  const originalBooks = ref<StoreState["originalBooks"]>([]);
  const books = ref<StoreState["books"]>([]);
  const allCartItems = ref<Cart[]>([]);
  const totalCarts = ref(0);
  const totalWishlist = ref<Book>();
  const cartBook = ref<Cart["product_id"] | null>(null);
  const cartName = ref<string | null>(null);
  const cartAddresss = ref<string | null>(null);
  const cartMobile = ref<string | null>(null);
  const cartCity = ref<string | null>(null);
  const cartState = ref<string | null>(null);

  const goToDetails = (book: Book) => {
    setBook(book);
    router.push(`/bookDetails/${book._id}`);
  };

  const setBook = (book: Book) => {
    book1.value = book;
  };

  const search = (typeText: string) => {
    if (typeText) {
      const lowerCaseText = typeText.toLowerCase();
      books.value = originalBooks.value.filter(
        (book) =>
          (book.bookName &&
            book.bookName.toLowerCase().includes(lowerCaseText)) ||
          (book.author && book.author.toLowerCase().includes(lowerCaseText)) ||
          (book.discountPrice &&
            book.discountPrice.toString().includes(typeText))
      );
    } else {
      books.value = [...originalBooks.value];
    }
    console.log(books.value);
  };

  const highToLow = () => {
    books.value.sort((a, b) => {
      const priceA = a.discountPrice ?? 0;
      const priceB = b.discountPrice ?? 0;
      return priceB - priceA;
    });
  };

  const lowToHigh = () => {
    books.value.sort((a, b) => {
      const priceA = a.discountPrice ?? 0;
      const priceB = b.discountPrice ?? 0;
      return priceA - priceB;
    });
  };

  const fetchBooks = () => {
    getAllBooks()
      .then((res) => {
        originalBooks.value = res.data.result;
        books.value = [...originalBooks.value];
        count.value = books.value.length;
        console.log(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const paginatedBooks = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return books.value.slice(start, end);
  });

  const addIntoCart = async (bookId: string) => {
    if (book1.value) {
      try {
        const res = await addToCart(bookId);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromCart = async (cartId: string) => {
    if (book1.value) {
      try {
        const res = await deleteFromCart(cartId);
        fetchAllCarts();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const increment = (bookId: string) => {
    if (book1.value && book1.value.quantity !== 0) {
      quantity.value = (quantity.value ?? 0) + 1;
      addIntoCart(bookId);
    } else {
      console.log("out of stock");
    }
  };

  const decrement = () => {
    if (book1.value && book1.value.quantity === 0) {
      console.log("out of stock");
    } else if ((quantity.value ?? 0) > 0) {
      quantity.value = (quantity.value ?? 1) - 1;
    }
  };

  const getAllWishlistItems = () => {
    const tk = localStorage.getItem("x-access-token");
    get_wishlist_items(tk)
      .then((res) => {
        console.log(res.data.result);
        totalWishlist.value = res.data.result;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAllCarts = () => {
    const tk = localStorage.getItem("x-access-token");
    getAllCartItems(tk)
      .then((res) => {
        console.log(res.data.result);
        totalCarts.value = res.data.result.length;
        allCartItems.value = res.data.result;

        if (allCartItems.value.length > 0) {
          const user = allCartItems.value[0].user_id;
          if (user) {
            cartName.value = user.fullName || null;
            cartMobile.value = user.phone || null;
            const address = user.address && user.address.length > 0 ? user.address[0] : undefined;
            if (address) {
              cartAddresss.value = address.fullAddress || null;
              cartCity.value = address.city || null;
              cartState.value = address.state || null;
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOneBook = (bookId: string) => {
    console.log("allCartItems:", allCartItems.value);
    const oneBook = allCartItems.value.find(
      (book) => book.product_id._id === bookId
    );
    cartBook.value = oneBook ? oneBook.product_id : null;
    quantity.value = oneBook?.quantityToBuy || 0;
    console.log(cartBook.value);
    return cartBook.value;
  };

  return {
    page,
    itemsPerPage,
    books,
    book1,
    count,
    quantity,
    searchText,
    allCartItems,
    totalCarts,
    cartName,
    cartMobile,
    cartAddresss,
    cartCity,
    cartState,
    removeFromCart,
    fetchBooks,
    goToDetails,
    search,
    highToLow,
    lowToHigh,
    setBook,
    increment,
    decrement,
    fetchAllCarts,
    getOneBook,
    getAllWishlistItems,
    paginatedBooks,
  };
});
