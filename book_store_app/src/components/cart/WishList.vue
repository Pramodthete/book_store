<script setup lang="ts">
import { ref, watch, onMounted, onBeforeMount } from "vue";
import { useHomeStore } from "@/stores/home";
import { deleteFromWishlist } from "@/services/bookStoreService";
import router from "@/router";

const homeStore = useHomeStore();

const deleteWishlistItem = (bookId:string)=>{
  deleteFromWishlist(bookId).then((res)=>{
    console.log(res);
    homeStore.getAllWishlistItems();
  }).catch((error)=>{
    console.log(error);
  })
}


onMounted(() => {
  homeStore.getAllWishlistItems();
});

const items=ref([
        {
          title: 'Home',
          disabled: false,
        },{
          title: `My Wishlist`,
          disabled: false,
        }
        ])
        
const booksPush=()=>{
  router.push('/books')
}
</script>

<template>
  <div class="breadCrumb">
    <v-breadcrumbs @click="booksPush" :items></v-breadcrumbs>
  </div>
  <div class="outer-div">
    <div class="outerBorder">
      <div>
        <h2>
          <b>My Wishlist ({{ homeStore.totalWishlist.length }})</b>
        </h2>
      </div>
    </div>
    <div class="second-border">
      <div class="main-img" v-for="(book, index) in homeStore.totalWishlist" :key="book._id">
        <div style="display: flex;gap: 20px;">
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
              <b style="font-size: larger">Rs {{ book.product_id.discountPrice + ' ' }}</b>
              <span>
                <s>Rs  {{ book.product_id.price }}</s>
              </span>
            </div>
          </div>
        </div>
        <div class="placeOrder">
          <v-btn variant="plain" @click="deleteWishlistItem(book.product_id._id)"><v-icon>mdi-trash-can</v-icon></v-btn>
        </div>
      </div>
    </div>
  </div>
  <br><br>
</template>

<style scoped>
.breadCrumb {
  margin-left: 15%;
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
.main-img {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin: 2%;
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
