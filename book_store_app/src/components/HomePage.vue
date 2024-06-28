<script lang="ts">
export default {
  data() {
    return {
      page: 1,
    };
  },
};
</script>

<template>
  <v-card class="mx-auto" max-width="448">
    <div class="top">
      <div>
        <span class="books-text">Books</span> <span>(128 Items)</span>
      </div>
      <select >
        <option value="" selected>Sort by relevance</option>
        <option value="highToLow" >High to Low Price</option>
        <option value="lowToHigh">Low to High Price</option>
        <option value="aboveThreeRating">above 3.0 ratings</option>
      </select>
    </div>
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

      <div class="card">
        <div class="block" v-for="n in 19">
          <div class="image">
            <img src="../assets/images/dmmt.png" alt="" />
          </div>
          <div class="content">
            <h3><b>Dont Make Me Think</b></h3>
            <div>By Steve Krug</div>
            <span class="rating"
              >4.5 <v-icon class="starIcon" icon="mdi-star"></v-icon> </span
            ><span>(20)</span>
            <div>Rs. 1500 <span class="strikeAmount">Rs. 2000</span></div>
          </div>
        </div>
          <v-pagination
            class="pagination"
            v-model="page"
            :length="15"
            :total-visible="7"
          ></v-pagination>
      </div>
    </v-layout>
    <br />
    <br />
    <div class="foot">
      <div class="footer">
        Copiright @ 2020. Bookstore Private Limited. All rights reserved
      </div>
    </div>
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
  margin-left: 8px;
  padding-bottom: 8px;
}
.big-font {
  font-size: 400;
}
.search {
  display: flex;
  align-items: center;
  width: 600px;
  margin-left: 4%;
  height: 62px;
  margin-top: 1.5%;
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
.top {
  display: flex;
  justify-content: space-between;
  padding: 0rem 12rem;
  margin: 1.5rem;
}
.books-text{
  font-size: x-large
}
.imgbox {
  margin-left: 20%;
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
.end-btn {
  display: flex;
  gap: 0%;
  margin-right: 10%;
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
.foot {
  position: absolute;
  left: 0;
  right: 0;
  top: 85vh;
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
.pagination {
  margin-left: 20%;
}
</style>
