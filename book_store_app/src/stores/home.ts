import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {
  getAllBooks,
  addToCart,
  getAllCartItems,
  deleteFromCart,
  get_wishlist_items,
  addItemQty,
} from "@/services/bookStoreService";
import type { StoreState, Cart,Book,Wishlist } from "./types";


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
  const totalWishlist = ref<Wishlist[]>([]);
  const cartBook = ref<Cart["product_id"] | null>(null);
  const cartName = ref<string | null>(null);
  const cartAddresss = ref<string | null>(null);
  const cartMobile = ref<string | null>(null);
  const cartEmail = ref<string | null>(null);
  const cartCity = ref<string | null>(null);
  const cartState = ref<string | null>(null);
  const cartId = ref<string>("");

  watch(
    () => quantity.value,
    (newCartItemsQty) => {
      quantity.value = newCartItemsQty;
    }
  );

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
        fetchBooks();
        fetchAllCarts();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const addQuantity = async (cartId: string, qty: number) => {
    const data = {
      quantityToBuy: qty,
    };
    if (book1.value) {
      try {
        const res = await addItemQty(cartId, data);
        console.log(res);
        fetchAllCarts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromCart = async (cartId: string) => {
    if (book1.value) {
      try {
        const res = await deleteFromCart(cartId);
        fetchBooks();
        fetchAllCarts();
        getOneBook(cartId);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const increment = (bookId: string, cartId: string, qty: number) => {
    if (qty == 0) {
      quantity.value = (quantity.value ?? 0) + 1;
      addIntoCart(bookId);
    } else if (qty > 0) {
      quantity.value = (qty ?? 0) + 1;
      console.log(cartId);
      
      addQuantity(cartId, quantity.value);
    } else {
      console.log("out of stock");
    }
  };

  const decrement = (cartId: string, qty: number) => {
    if (qty === 1) {
      removeFromCart(cartId);
      fetchAllCarts();
      console.log(qty);

    } else if (qty > 1) {
      console.log(qty);
      quantity.value = qty - 1;
      addQuantity(cartId, quantity.value);
    }
  };

  const getAllWishlistItems = () => {
    const tk = localStorage.getItem("x-access-token");
    get_wishlist_items(tk)
      .then((res) => {
        console.log(res.data.result);
        totalWishlist.value = res.data.result.filter((book: { product_id: null; })=>book.product_id !== null);
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
            cartEmail.value = user.email || null;
            const address =
              user.address && user.address.length > 0
                ? user.address[0]
                : undefined;
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
    cartId.value = oneBook?._id || "";
    console.log(oneBook);
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
    cartId,
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
    addQuantity,
    totalWishlist,
    paginatedBooks,
    cartEmail
  };
});
