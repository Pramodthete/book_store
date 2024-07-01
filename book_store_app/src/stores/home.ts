import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { getAllBooks } from "@/services/bookStoreService";

export const useHomeStore = defineStore("home", () => {
  const page = ref(1);
  const itemsPerPage = ref(12);
  const count = ref(0);
  const quantity = ref(0);
  const book1 = ref({});
  const router = useRouter();
  const searchText = ref<string>("");
  const originalBooks = ref([]);
  const books = ref([]);

  const goToDetails = (book: Object) => {
    console.log("book===>", book);
    book1.value = book;
    console.log("id===>", book1);
    router.push(`/bookDetails/${book._id}`);
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
    document.body.style.backgroundColor = "white";
    console.log(books.value);
  };

  const highToLow = () => {
    books.value.sort((a, b) => b.discountPrice - a.discountPrice);
  };

  const lowToHigh = () => {
    books.value.sort((a, b) => a.discountPrice - b.discountPrice);
  };

  const fetchBooks = async () => {
    try {
      const res = await getAllBooks();
      originalBooks.value = res.data.result;
      books.value = [...originalBooks.value];
      count.value = books.value.length;
      console.log(res.data.result);
    } catch (error) {
      console.log(error);
    }
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
    paginatedBooks,
  };
});
