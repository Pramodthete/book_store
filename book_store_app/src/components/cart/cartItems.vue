<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useHomeStore, type Cart } from "@/stores/home";

const homeStore = useHomeStore();
const items = ref(false);
const carts = ref<Cart[]>([]);

carts.value = homeStore.allCartItems;

watch(
  () => homeStore.allCartItems,
  (newCartItems) => {
    carts.value = newCartItems;
  }
);

onMounted(() => {
  document.body.style.backgroundColor = "white";
});
</script>

<template>
  <div class="breadCrumb">
    <v-breadcrumbs :items="['Home', 'My cart']"></v-breadcrumbs>
  </div>
  <div class="outer-div">
    <div class="outerBorder">
      <div class="flex">
        <h2 @click="items = !items"><b>My Cart ({{ homeStore.allCartItems.length }})</b></h2>
        <select v-if="items">
          <option value="">Use Current Location</option>
        </select>
      </div>
      <div v-if="items">
      <br>
        <div class="main-img" v-for="book in carts" :key="book._id">
          <div>
            <img src="../../assets/images/dmmt.png" height="130px" width="100px" alt="" />
          </div>
          <div>
            <h3><b>{{ book.product_id.bookName }}</b></h3>
            <div>{{ book.product_id.author }}</div>
            <div>
              <b style="font-size: larger;">Rs. {{ book.product_id.discountPrice }}</b>
              <span><s>Rs. {{ book.product_id.price }}</s></span>
            </div>
            <div class="btnbox">
              <v-icon class="bagBtn" @click="homeStore.decrement">mdi-minus</v-icon>
              <div id="count">{{ book.quantityToBuy }}</div>
              <v-icon class="bagBtn" @click="homeStore.increment(book.product_id._id)">mdi-plus</v-icon>
              <div id="remove" @click="homeStore.removeFromCart(book._id)">Remove</div>
            </div>
          </div>
        </div>
        <div id="placeOrder">
          <v-btn color="blue">PLACE ORDER</v-btn>
        </div>
      </div>
    </div>
  </div>
  <div class="outer-div">
    <div>
      <div class="block"><h2><b>Address Details</b></h2></div>
      <div class="block"><h2><b>Order Summary</b></h2></div>
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
  justify-content: center;
}
.outerBorder {
  border: 1px solid #707070;
  width: 900px;
  padding: 2%;
  margin-bottom: 2%;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.main-img {
  display: flex;
  margin-bottom: 5%;
  gap: 10%;
}
#count {
  font-size: x-large;
}
.bagBtn {
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.btnbox {
  display: flex;
  justify-content: space-between;
  margin-top: 8%;
  width: 200px;
}
#placeOrder {
  width: fit-content;
  float: right;
}
#remove {
  margin-left: 15%;
  margin-top: 5%;
  cursor: pointer;
}
.block {
  display: flex;
  justify-content: start;
  border: 1px solid #707070;
  padding: 2%;
  width: 900px;
  margin-bottom: 2%;
}
</style>
