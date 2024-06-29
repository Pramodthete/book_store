
import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { getAllBooks } from "@/services/bookStoreService";

export const useHomeStore = defineStore("home", () => {
const page=ref(1)

const books = ref([]);
const router = useRouter();

const goToDetails = (id:string)=>{
  console.log("id===>",id);
  router.push(`/bookDetails/${id}`)
  
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
  fetchBooks,
  goToDetails
};
});