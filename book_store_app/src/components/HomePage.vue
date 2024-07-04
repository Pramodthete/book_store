<script setup lang="ts">
import { useHomeStore } from "@/stores/home";
import {computed, onMounted } from "vue";
const homeStore = useHomeStore();

onMounted(() => {
  homeStore.fetchBooks();
});

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
          <span>({{ homeStore.count }} Items)</span>
        </div>
        <select @change="handleSort" class="custom-select" >
          <option value="" disabled selected>Sort by relevance &nbsp;&nbsp;&nbsp;<span>&#8595</span>  </option>
          <option value="highToLow">High to Low Price</option>
          <option value="lowToHigh">Low to High Price</option>
        </select>
        
      </div>
      <div class="card">
        <div class="block" v-for="book in books" :key="book._id">
          <div class="image" @click="homeStore.goToDetails(book)">
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
  gap: 60px;
  padding: 0rem 12rem;
  padding-top: 20px;
}
.image {
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  padding: 20px;
  border-radius: 5px;
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

@media screen and (max-width: 600px) {
  .imgbox {
    margin-left: 0%;
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
  .pagination {
    margin-left: 0%;
    display: flex;
    flex-direction: column;
  }
  .card {
    gap: 1%;
    padding: 0;
  }
  .block {
    width: 185px !important;
    height: fit-content;
    margin-bottom: 1%;
  }
  .top {
    padding: 0;
    padding-top: 50px;
    margin: 0;
  }
  .image img {
    width: 80.4px;
    height: 105px;
  }
}
@media screen and (max-width: 915px) {
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1%;
    padding: 0;
  }
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
  width: 200px;
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
</style>
