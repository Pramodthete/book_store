<script setup lang="ts">
import { getAllCartItems } from "@/services/bookStoreService";
import { useHomeStore } from "@/stores/home";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
const homeStore = useHomeStore();
const router = useRouter()

const menu = ref(false);

const logout = () => {
  localStorage.removeItem("x-access-token");
  router.push('/login')
};

const goToCart=()=>{
  router.push('/cartDetails')
}
const goToProfile=()=>{
  router.push('/profile')
}
const goToWishlist=()=>{
  router.push('/wishlist')
}

onMounted(() => {
  homeStore.fetchAllCarts()
  document.body.style.backgroundColor = "white";
});

</script>

<template>
  <v-layout>
    <v-app-bar color="#A03037">
      <div class="imgbox">
        <img src="@/assets/svgfiles/education.svg" alt="" />
      </div>
      <div class="bookstore-text" @click="router.push('/books')">
        Bookstore
      </div>
      <div class="search">
        <v-text-field
          v-model="homeStore.searchText"
          @keyup="homeStore.search(homeStore.searchText)"
          placeholder="Search..."
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
        ></v-text-field>
      </div>

      <v-spacer></v-spacer>

      <div class="end-btn">
        <div class="text-center">
          <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn icon class="end-btn1" v-bind="props">
                <div class="item">
                  <v-icon>mdi-account-outline</v-icon>
                  <div class="font">Profile</div>
                </div>
              </v-btn>
            </template>
            <v-card min-width="200">
              <v-list>
                <v-list-item
                >
                  <div><b>Welcome Pramod,</b></div>
                  <v-btn variant="plain" @click="goToProfile"><v-icon>mdi-account-outline</v-icon><span>Profile</span></v-btn><br>
                  <v-btn variant="plain"><v-icon>mdi-cart-outline</v-icon><span>My Orders</span></v-btn><br>
                  <v-btn variant="plain"  @click="goToWishlist"><v-icon>mdi-heart-outline</v-icon><span>My Wishlist</span></v-btn><br>
                </v-list-item>
              </v-list>

              <v-card-actions>
                <v-btn color="red" width="100%" variant="outlined" @click="logout">
                  Logout
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>

        <v-btn icon class="text-none end-btn2" @click="goToCart" stacked>
          <v-badge color="white" :content="homeStore.totalCarts">
            <div class="item">
              <v-icon>mdi-cart-outline</v-icon>
              <div class="font">Cart</div>
            </div>
          </v-badge>
        </v-btn>
      </div>
    </v-app-bar>
  </v-layout>

  <RouterView />

  <div class="foot">
    <div class="footer">
      Copiright @ 2020. Bookstore Private Limited. All rights reserved
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
}
.search {
  display: flex;
  align-items: center;
  width: 600px;
  margin-left: 4%;
  height: 62px;
  margin-top: 1.5%;
}
.v-text-field .v-input__details {
  display: none !important;
}
.bookstore-text{
  font-size: x-large;
  color: rgb(240, 240, 240);
  padding-bottom: 0.5%;
  margin-left: 0.6%;
}
.imgbox {
  margin-left: 10%;
}
.end-btn {
  display: flex;
  gap: 0%;
  margin-right: 10%;
}
.font {
  font-size: small;
}
.end-btn1 {
  border-left: 1px solid rgb(146, 76, 76);
  border-right: 1px solid rgb(146, 76, 76);
  border-radius: 0;
  width: 100px !important;
  height: 60px !important;
}
.end-btn2 {
  border-left: 1px solid rgb(146, 76, 76);
  border-right: 1px solid rgb(146, 76, 76);
  border-radius: 0;
  width: 100px !important;
  height: 60px !important;
}
.foot {
  position: absolute;
  left: 0;
  right: 0;
  top: 94vh;
  bottom: 0;
}
.footer {
  height: 50px;
  background-color: black;
  color: white;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
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
    /* width: 40px; */
  }

  .end-btn1 {
    width: 50px !important;
  }
  .end-btn2 {
    width: 50px !important;
  }
  .bookstore-text{
  margin: 0;
}
@media screen and (max-width: 380px) {
  .search {
    width: 40px;
  }
}
}
</style>
