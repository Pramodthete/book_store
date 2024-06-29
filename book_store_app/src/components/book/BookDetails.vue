<script setup lang="ts">
import { ref } from "vue";
const rating = ref(0);
</script>

<template>
  <div class="outer-div">
    <v-breadcrumbs :items="['Home', `Book (1)`]"></v-breadcrumbs>
    <div class="details">
      <div class="img-flex">
        <div>
          <img src="../../assets/images/dmmt.png" width="50px" alt="" />
          <img src="../../assets/images/dmmt.png" width="50px" alt="" />
        </div>
        <div>
        <div class="main-img">
          <img
            src="../../assets/images/dmmt.png"
            height="300px"
            width="230px"
            alt=""
          />
        </div>
        <div class="btnbox">
          <v-btn class="addBag">Add To Bag</v-btn>
          <v-btn class="wishlist"><v-icon>mdi-heart </v-icon> WISHLIST</v-btn>
        </div>
      </div>
      </div>
      <div>
        <div>
          <h2><b>Dont Make Me Think</b></h2>
        </div>
        <div>By Steve Krug</div>
        <div>
          <span class="rating"
            >4.5 <v-icon class="starIcon" icon="mdi-star"></v-icon> </span
          ><span>(20)</span>
        </div>
        <div>Rs. 500 <span class="strikeAmount">Rs. 2000 </span></div>
        <br />
        <v-divider></v-divider>
        <br>
        <div><ul><li>Book Details</li></ul></div>
        <div class="desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit fuga mollitia
          a Lorem ipsum dolor sit amet, consectetur adipisicing elit fuga
          mollitia a Lorem ipsum dolor sit amet, consectetur adipisicing elit
          fuga mollitia a
        </div>
        <br>
        <v-divider></v-divider>
        <br />
        <div class="fb-text">Customer Feedback</div>
        <div class="rating-box">
          <div><h4>Overall Ratings</h4></div>
          <div>
            <v-rating
              v-model="rating"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half"
              half-increments
              hover
            ></v-rating>
          </div>
            <v-textarea
              rows="2"
              variant="solo"
              placeholder="Write Your Review"
            ></v-textarea>
          <div>
            <v-btn id="submit-btn" color="primary">Submit</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-field__field {
    height: fit-content;
}
.outer-div {
  background-color: white;
  height: 100vh;
  padding: 1rem 9rem;
  width: 100%;
}
.details {
  display: flex;
  /* flex-wrap: wrap; */
  gap: 50px;
}
.img-flex {
  display: flex;
  gap: 5px;
}
.main-img {
  border: 1px solid rgb(211, 210, 210);
  padding: 15px;
  padding-left: 30px;
  padding-right: 30px;
  height: fit-content;
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
.fb-text {
  font-size: x-large;
}
.rating-box {
  background-color: rgb(234, 231, 231);
  padding: 10px;
  height: fit-content !important;
}
#submit-btn {
  margin-left: 85%;
}
.v-field__field .v-textarea {
  height: fit-content !important;
}
.desc {
  text-wrap: wrap;
}
@media screen and (max-width: 600px) {
  .outer-div {
    background-color: white;
    height: 100%;
    padding: 10px;
    width: 100vw;
  }
}
.strikeAmount {
  text-decoration: line-through;
}
.btnbox{
  display: flex;
  justify-content: space-between;
  margin-top:8% ;
}
.addBag{
background-color: #A03037;
color: white;
}
.wishlist{
  background-color: black;
  color: white;
}
</style>
