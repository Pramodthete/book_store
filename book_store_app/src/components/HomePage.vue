<script setup lang="ts">
import { useHomeStore } from "@/stores/home";
import { ref, computed, onMounted } from "vue";
const homeStore = useHomeStore();

onMounted(() => {
  console.log(homeStore.fetchBooks());
});

const books: any = computed(() => homeStore.books);
</script>

<template>
  <v-card class="mx-auto" max-width="448">
    <div class="top">
      <div>
        <span class="books-text">Books</span>
        <span>({{ books.length }} Items)</span>
      </div>
      <select>
        <option value="" selected>Sort by relevance</option>
        <option value="highToLow">High to Low Price</option>
        <option value="lowToHigh">Low to High Price</option>
        <option value="aboveThreeRating">above 3.0 ratings</option>
      </select>
    </div>
    <div class="card">
      <div
        class="block"
        v-for="book in books"
        @click="homeStore.goToDetails(book._id)"
      >
        <div class="image">
          <img src="../assets/images/dmmt.png" alt="" />
        </div>
        <div class="content">
          <h3>
            <b>{{ book.bookName }}</b>
          </h3>
          <div>{{ book.author }}</div>
          <span class="rating"
            >4.5 <v-icon class="starIcon" icon="mdi-star"></v-icon
          ></span>
          <span>(20)</span>
          <div>
            Rs. {{ book.discountPrice }}
            <span class="strikeAmount">Rs. {{ book.price }} </span>
          </div>
        </div>
      </div>
    </div>
  </v-card>
  <div style="height: 100px;">
    <v-pagination :length="18"></v-pagination>
  </div>
  
</template>

<style scoped>
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
  background-color: green;
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
</style>
