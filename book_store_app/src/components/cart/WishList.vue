<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useHomeStore } from "@/stores/home";
import type { Wishlist } from "../../stores/types";
import router from "@/router";
const homeStore = useHomeStore();
const list = ref<Wishlist[]>([]);

list.value = homeStore.totalWishlist;

onMounted(() => {
  homeStore.getAllWishlistItems();
});
</script>

<template>
  <div class="breadCrumb">
    <v-breadcrumbs :items="['Home', 'My Wishlist']"></v-breadcrumbs>
  </div>
  <div class="outer-div">
    <div class="outerBorder">
      <div>
        <h2>
          <b>My Wishlist ({{ list.length }})</b>
        </h2>
      </div>
    </div>
    <div class="second-border">
      <br />
      <div class="main-img" v-for="book in list" :key="book._id">
        <div>
          <img
            src="../../assets/images/dmmt.png"
            height="130px"
            width="100px"
            alt=""
          />
        </div>
        <div>
          <h3>
            <b>{{ book.product_id.bookName }}</b>
          </h3>
          <div>{{ book.product_id.author }}</div>
          <div>
            <b style="font-size: larger"
              >Rs. {{ book.product_id.discountPrice + " " }}
            </b>
            <span>
              <s>Rs. {{ book.product_id.price }}</s>
            </span>
          </div>
          <div class="btnbox">
            <v-icon class="bagBtn" @click="homeStore.decrement"
              >mdi-minus</v-icon
            >
            <div id="count">{{ book.quantityToBuy }}</div>
            <v-icon
              class="bagBtn"
              @click="
                homeStore.increment(
                  book.product_id._id,
                  book._id,
                  book.quantityToBuy
                )
              "
              >mdi-plus</v-icon
            >
            <div id="remove" @click="homeStore.removeFromCart(book._id)">
              Remove
            </div>
          </div>
        </div>
        <div class="placeOrder">
          <v-btn><v-icon>mdi-delete</v-icon></v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breadCrumb {
  margin-left: 20%;
  margin-top: 3%;
}
.outer-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.outerBorder {
  border: 1px solid #707070;
  width: 1100px;
  padding: 1%;
  background-color: rgb(225, 225, 225);
}
.second-border {
  border: 1px solid #707070;
  width: 1100px;
  padding: 2%;
}

#placeOrder {
  width: fit-content;
  float: right;
}
@media screen and (max-width: 1120px) {
  .outerBorder {
    width: 100%;
  }
  .second-border {
    width: 100%;
  }
  .breadCrumb {
    margin-top: 5%;
  }
  .outer-div {
    margin: 1%;
  }
}
@media screen and (max-width: 500px) {
  .breadCrumb {
    margin-top: 13%;
  }
  .outer-div {
    margin: 1%;
  }
}
</style>
