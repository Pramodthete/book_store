<script setup lang="ts">
import { getAllCartItems } from "@/services/bookStoreService";
import { useHomeStore } from "@/stores/home";
import { useRouter } from "vue-router";
import { ref, onMounted, onUpdated } from "vue";
const homeStore = useHomeStore();
const router = useRouter()

const totalCartItems = ref(0);
const fav = ref(true);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);

onMounted(() => {
  getAllCartItems()
    .then((res) => {
      console.log(res.data.result);
      totalCartItems.value = res.data.result.length;
    })
    .catch((error) => {
      console.log(error);
    });
});

const newUser=()=>{
  router.push('/login')
}
</script>

<template>
  <v-layout>
    <v-app-bar color="#A03037">
      <div class="imgbox">
        <img src="@/assets/svgfiles/education.svg" alt="" />
      </div>
      <div class="bookstore-text">
        <v-app-bar-title class="big-font">Bookstore</v-app-bar-title>
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
            <v-card min-width="300">
              <v-list>
                <v-list-item
                >
                  <div>Welcome</div>
                  <div>To access account and manage orders</div>
                  <v-btn size="large" outlined @click="newUser">Login/Signup</v-btn>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn variant="text" @click="menu = false"><v-icon>mdi-orders</v-icon> My Orders </v-btn>
                <v-btn color="primary" variant="text" @click="menu = false">
                  <v-icon>mdi-heart</v-icon> Wishlist
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>

        <v-btn icon class="text-none end-btn2" stacked>
          <v-badge color="white" :content="totalCartItems">
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
}
</style>
