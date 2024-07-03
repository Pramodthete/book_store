import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { getAllBooks } from "@/services/bookStoreService";

export interface Book {
  _id: string;
  bookName?: string;
  author?: string;
  discountPrice?: number;
  quantity?: number;
  price?:number
  description?:string
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
  const quantity = ref<StoreState["quantity"]>(0);
  const book1 = ref<StoreState["book1"]>({} as Book);
  const router = useRouter();
  const searchText = ref<StoreState["searchText"]>("");
  const originalBooks = ref<StoreState["originalBooks"]>([]);
  const books = ref<StoreState["books"]>([]);

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
          (book.bookName && book.bookName.toLowerCase().includes(lowerCaseText)) ||
          (book.author && book.author.toLowerCase().includes(lowerCaseText)) ||
          (book.discountPrice && book.discountPrice.toString().includes(typeText))
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

  return {
    page,
    itemsPerPage,
    books,
    book1,
    count,
    quantity,
    searchText,
    fetchBooks,
    goToDetails,
    search,
    highToLow,
    lowToHigh,
    setBook,
    paginatedBooks,
  };
});
