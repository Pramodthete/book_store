<script setup lang="ts">
import { useHomeStore } from "@/stores/home";
import type { Book } from "@/stores/types";
import {computed, onMounted } from "vue";
import { useRouter } from "vue-router";
const homeStore = useHomeStore();
const router = useRouter();

onMounted(() => {
  homeStore.fetchBooks();
});

const goToDetails=(book: Book)=> {
      homeStore.setBook(book);
      
      router.push(`/bookDetails/${book._id}`);
    }

const books = computed(() => homeStore.paginatedBooks);

const handleSort = (event:any) => {
  const value = event.target.value;
  if (value === "highToLow") {
    homeStore.highToLow();
  } else if (value === "lowToHigh") {
    homeStore.lowToHigh();
  }
};

const updatePage = (newPage:any) => {
  homeStore.page = newPage;
};
</script>

<template>
  <div style="background-color: white;">
    <v-card class="mx-auto noBorder" max-width="448">
      <div class="top">
        <div>
          <span class="books-text">Books</span>
          <span> ({{ homeStore.count+' ' }}Items)</span>
        </div>
        <select @change="handleSort" class="custom-select" >
          <option value="" disabled selected>Sort by relevance &nbsp;<span>&#8595</span></option>
          <option value="highToLow">High to Low Price</option>
          <option value="lowToHigh">Low to High Price</option>
        </select>
        
      </div> 
      <div class="card">
        <div class="block" v-for="book in books" :key="book._id">
          <div class="image" @click="goToDetails(book)">
            <img src="../assets/images/dmmt.png" alt="" />
          </div>
          <div class="content">
            <h3>
              <b>{{ book.bookName }}</b>
            </h3>
            <div>{{ book.author }}</div>
            <span class="rating">4.5 <v-icon class="starIcon" icon="mdi-star"></v-icon></span>
            <span>(20)</span>
            <div><b>Rs. {{ book.discountPrice+' ' }} </b><span class="strikeAmount">Rs. {{ book.price }} </span></div>
          </div>
        </div>
      </div>
    </v-card>
    <div style="height: 100px">
      <v-pagination :length="Math.ceil(homeStore.count / homeStore.itemsPerPage)" v-model="homeStore.page" @input="updatePage"></v-pagination>
    </div>
  </div>
</template>

<style scoped>
.noBorder{
  border: none;
  box-shadow: none;
}
.bookstore-text {
  margin-left: 8px;
  padding-bottom: 8px;
}
.big-font {
  font-size: 400;
}

.top {
  display: flex;
  justify-content: space-between;
  padding: 0rem 12rem;
  margin: 1.5rem;
}
.books-text {
  font-size: x-large;
}

.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  row-gap: 30px;
  padding: 0rem 12rem;
  padding-top: 1%;
}
.image {
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
}
.image img {
  width: 109.4px;
  height: 125px;
}

.v-text-field .v-input__details {
  display: none !important;
}
.font {
  font-size: small;
}



.block {
  width: 235px;
  height: 275px;
  border: 1px solid rgb(194, 193, 193);
  border-radius: 5px;
}
.v-card--variant-elevated {
  max-width: 100vw !important;
}
.content {
  padding-top: 4%;
  padding-left: 6%;
}
.rating {
  background-color: rgb(41, 163, 41);
  color: white;
  width: fit-content;
  padding: 2px;
  padding-left: 4px;
  padding-right: 4px;
}
.starIcon {
  font-size: small;
  padding-bottom: 1%;
}
.strikeAmount {
  text-decoration: line-through;
}

.pagination {
  margin-left: 20%;
}

.custom-select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 160px;
  outline: none; 
  cursor: pointer; 
}

.custom-select option {
  padding: 10px;
  font-size: 16px;
  background-color: #fff; 
  color: #333; 
}

.custom-select option:checked {
  background-color: #f0f0f0; 
}

@media screen and (max-width: 1510px) {
  .card{
    width: fit-content;
    padding: 0;
    margin: 2%;
  }
}
@media screen and (max-width: 915px) {
  
  .top{
    padding: 0;
    padding-top: 2rem;
  }
}
@media screen and (max-width: 600px) {
  .imgbox {
    margin-left: 0%;
  }
  .block {
    width: 170px !important;
    height: fit-content!important;
  }
  .image {
    padding: 2%;
  }
  .content {
    padding-top: 1%;
    padding-left: 2%;
  }
  .end-btn {
    margin-right: 0%;
  }
  .search {
    margin-top: 5%;
  }
  .end-btn1 {
    width: 50px !important;
  }
  .end-btn2 {
    width: 50px !important;
  }
}
</style>
