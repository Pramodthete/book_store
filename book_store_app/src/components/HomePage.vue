<script setup lang="ts"></script>

<template>
  <v-card class="mx-auto" max-width="448">
    <v-layout>
      <v-app-bar color="#A03037" >
          <div class="imgbox">
            <img src="@/assets/svgfiles/education.svg" alt="" />
          </div>
          <div class="bookstore-text">
            <v-app-bar-title>Bookstore</v-app-bar-title>
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
                <label>Profile</label>
              </div>
            </v-btn>
            <v-btn icon class="end-btn2">
              <div class="item">
                <v-icon>mdi-cart-outline</v-icon>
                <label>Cart</label>
              </div>
            </v-btn>
          </div>
      </v-app-bar>

            <div style="display: flex;flex-wrap: wrap;gap: 5px;">
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
            </div>
    </v-layout>
  </v-card>
</template>

<style scoped>

.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
}
.bookstore-text {
  margin-left: 1%;
  padding-bottom: 5px;
}
.search {
    display: flex;
    align-items: center;
  width: 600px;
  margin-left: 4%;
  height: 62px;
  margin-top:1.5%;
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
.imgbox {
  margin-left: 10%;
}
.end-btn {
  display: flex;
  gap: 0%;
  margin-right: 10%;
}
.v-text-field .v-input__details {
    display: none !important;
}

@media screen and (max-width: 600px) {
  .imgbox {
    margin-left: 0%;
  }
  .end-btn {
    margin-right: 0%;
  }
  .search{
    margin-top:5%;
  }

  .end-btn1 {
    width: 50px !important;
  }
  .end-btn2 {
    width: 50px !important;
  }
}

.block{
    width: 300px;
    height: 300px;
    background-color: antiquewhite;
    border: 1px solid red ;
}
.v-card--variant-elevated {
    width: 97vw;
    max-width: 100vw !important;
    max-height: 100vh !important;
}
</style>
