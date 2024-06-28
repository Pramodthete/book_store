<script setup lang="ts"></script>

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
          placeholder="Search..."
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
        ></v-text-field>
      </div>

      <v-spacer></v-spacer>

      <div class="end-btn">
        <v-btn icon class="end-btn1">
          <div class="item">
            <v-icon>mdi-account-outline</v-icon>
            <div class="font">Profile</div>
          </div>
        </v-btn>
        <v-btn icon class="end-btn2">
          <div class="item">
            <v-icon>mdi-cart-outline</v-icon>
            <div class="font">Cart</div>
          </div>
        </v-btn>
      </div>
    </v-app-bar>
  </v-layout>


  <RouterView/>


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
