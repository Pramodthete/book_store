<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useHomeStore } from "@/stores/home";
import type { Cart } from "../../stores/types";

import router from "@/router";

const homeStore = useHomeStore();
const item = ref(true);
const address = ref(false);
const placeOrderBtn = ref(true);
const checkoutBtn = ref(true);
const select = ref(true);
const carts = ref<Cart[]>([]);

carts.value = homeStore.allCartItems;

watch(
  () => homeStore.allCartItems,
  (newCartitem) => {
    carts.value = newCartitem;
  }
);

const placeOrder = () => {
  address.value = !address.value;
  placeOrderBtn.value = !placeOrderBtn.value;
};
const checkout = () => {
  router.push("/orderPlaced");
};

onMounted(() => {
  homeStore.fetchAllCarts();
});

const items=ref([
        {
          title: 'Home',
          disabled: false,
          href: 'books',
        },{
          title: `My Cart`,
          disabled: false,
          href: 'cartDetails',
        }
        ])
</script>

<template>
  <div class="breadCrumb">
    <v-breadcrumbs :items></v-breadcrumbs>
  </div>
  <div class="outer-div">
    <div class="outerBorder">
      <div class="flex">
        <h2 @click="item = !item">
          <b>My Cart ({{ homeStore.allCartItems.length }})</b>
        </h2>
        <select v-if="item" class="custom-select">
          <option value="">Use Current Location</option>
        </select>
      </div>
      <div v-if="item">
        <br />
        <div class="main-img" v-for="book in carts" :key="book._id">
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
              <v-icon class="bagBtn" @click="homeStore.decrement(book._id,book.quantityToBuy)"
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
        </div>
        <div id="placeOrder">
          <v-btn color="blue" v-if="placeOrderBtn" @click="placeOrder"
            >PLACE ORDER</v-btn
          >
        </div>
      </div>
    </div>
  </div>
  <div class="outer-div">
    <div class="outerBorder">
      <div class="flex">
        <h2 v-if="address"><b>Customer Details</b></h2>
        <h2 v-else>
          <b @click="placeOrderBtn = !placeOrderBtn">Address Details</b>
        </h2>
        <v-btn
          v-if="address || !placeOrderBtn"
          @click="placeOrderBtn = !placeOrderBtn"
          color="red"
          variant="outlined"
        >
          Add New Address
        </v-btn>
      </div>
      <div v-if="!placeOrderBtn">
        <div class="flex1">
          <div>
            <label for="name">Full Name</label>
            <v-text-field
              width="400px"
              variant="outlined"
              v-model="homeStore.cartName"
            ></v-text-field>
          </div>
          <div>
            <label for="name">Mobile Number</label>
            <v-text-field
              width="400px"
              variant="outlined"
              v-model="homeStore.cartMobile"
            ></v-text-field>
          </div>
        </div>
        <div class="address-details">
          <div class="flex2">
            <div v-if="select">
              <v-icon color="rgb(146, 76, 76)" @click="select=!select">mdi-record-circle</v-icon>
            </div>
            <div v-else>
              <v-icon color="rgb(146, 76, 76)" @click="select=!select">mdi-circle-outline</v-icon>
            </div>
            <div>
              <span><h3>1. WORK</h3> </span
              ><span style="color: rgb(146, 76, 76)"> Edit</span>
            </div>
          </div>
          <div>
            <label for="address">Address</label>
            <v-textarea
              v-model="homeStore.cartAddresss"
              auto-grow
              variant="outlined"
              style="height: 180px"
              disabled
            ></v-textarea>
            <div class="flex1 lower">
              <div>
                <label for="name">City / Town</label>
                <v-text-field
                  width="400px"
                  variant="outlined"
                  v-model="homeStore.cartCity"
                  disabled
                ></v-text-field>
              </div>
              <div>
                <label for="name">State</label>
                <v-text-field
                  width="400px"
                  variant="outlined"
                  v-model="homeStore.cartState"
                  disabled
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>
        <div v-if="checkoutBtn">
          <div class="flex2">
            <div v-if="select">
              <v-icon color="rgb(146, 76, 76)" @click="select=!select">mdi-circle-outline</v-icon>
            </div>
            <div v-else>
              <v-icon color="rgb(146, 76, 76)" @click="select=!select">mdi-record-circle</v-icon>
            </div>
            <div>
              <span><h3>2. HOME</h3> </span
              ><span style="color: rgb(146, 76, 76)"> Edit</span>
            </div>
          </div>
          <div>
            <label for="address" id="address">Address</label>
            <p>
              <b
                >{{ homeStore.cartAddresss }},{{ homeStore.cartCity }},{{
                  homeStore.cartState
                }}</b
              >
            </p>
          </div>
          <div id="placeOrder">
            <v-btn
              color="blue"
              v-if="checkoutBtn"
              @click="checkoutBtn = !checkoutBtn"
            >
              CONTINUE
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="outer-div">
    <div class="outerBorder">
      <div class="flex">
        <h2><b>Order Summary</b></h2>
      </div>
      <div
        class="main-img"
        v-for="book in carts"
        :key="book._id"
        v-if="!checkoutBtn"
      >
        <div id="last-img">
          <img
            src="../../assets/images/dmmt.png"
            height="130px"
            width="100px"
            alt=""
          />
        </div>
        <div id="last-img">
          <h3>
            <b>{{ book.product_id.bookName }}</b>
          </h3>
          <div>{{ book.product_id.author }}</div>
          <div>
            <b style="font-size: larger"
              >Rs. {{ book.product_id.discountPrice + " " }}
            </b>
            <span
              ><s>Rs. {{ book.product_id.price }}</s></span
            >
          </div>
        </div>
      </div>
      <div id="placeOrder" v-if="!checkoutBtn">
        <v-btn color="blue" @click="checkout"> CHECKOUT </v-btn>
      </div>
    </div>
  </div>
  <br>
</template>

<style scoped>
.breadCrumb {
  margin-left: 20%;
  margin-top: 3%;
}
.outer-div {
  display: flex;
  justify-content: center;
  margin: 1%;
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
.flex1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.flex2 {
  display: flex;
  gap: 10px;
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
.main-img {
  display: flex;
  margin-bottom: 5%;
  gap: 10%;
}
#count {
  font-size: x-large;
  border: 1px solid rgb(208, 207, 207);
  width: 50px;
  padding-left: 6%;
  height: 40px;
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
  width: 250px;
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
.v-field__field {
  height: fit-content;
}
.lower {
  margin-top: -5%;
}
#last-img {
  margin-top: 2%;
  margin-bottom: -2%;
}
#address {
  font-size: large;
}
@media screen and (max-width: 600px) {
  .breadCrumb {
    margin-top: 10%;
  }
  .custom-select{
    padding: 0;
    width: fit-content;
  }
  #remove {
  margin-left: 0%;
}
.outerBorder{
  width: 100%;
}
.main-img {
  gap: 1%;
}
.btnbox {
  display: flex;
  justify-content: space-between;
  width: 200px;
}
}
</style>
