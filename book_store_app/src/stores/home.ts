
import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { getAllBooks } from "@/services/bookStoreService";

export const useHomeStore = defineStore("home", () => {
const page=ref(1)
const count = ref(0);
const books = ref([]);
const book1 = ref({});
const router = useRouter();

const goToDetails = (book:Object)=>{
  console.log("book===>",book);
  book1.value=book
  console.log("id===>",book1);
  router.push(`/bookDetails/${book._id}`)
  
}

const fetchBooks = async () => {
  try {
    const res = await getAllBooks();
    books.value = res.data.result;
    console.log(res.data.result);
  } catch (error) {
    console.log(error);
  }
};

return {
page,
  books,
  book1,
  count,
  fetchBooks,
  goToDetails
};
});