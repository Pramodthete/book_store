<script setup lang="ts">
import { ref } from "vue";
import { useHomeStore } from "@/stores/home";
import { addToCart } from "@/services/bookStoreService";
const rating = ref(0);
const bag = ref(true);


const addIntoCart=()=>{
  addToCart(homeStore.book1._id).then((res)=>{
    console.log(res);
  }).catch((error)=>{
    console.log(error);
  })
}

const increment = () => {
  if (homeStore.book1.quantity > homeStore.count) {
    homeStore.count++;
    addIntoCart()
  } else {
    console.log("out of stock");
  }
};
const decrement = () => {
  if (homeStore.book1.quantity === 0) {
    console.log("out of stock");
  }
  if (homeStore.count == 0) {
  } else {
    homeStore.count--;
    addIntoCart()
  }
};
const homeStore = useHomeStore();
</script>

<template>
  <div class="outer-div">
    <v-breadcrumbs :items="['Home', `Book (1)`]"></v-breadcrumbs>
    <div class="details">
      <div class="img-flex">
        <div class="two-img">
          <img
            style="padding: 10%; border: 1px solid rgb(211, 210, 210)"
            src="../../assets/images/dmmt.png"
            width="50px"
            alt=""
          />
          <img
            style="padding: 10%; border: 1px solid rgb(211, 210, 210)"
            src="../../assets/images/dmmt.png"
            width="50px"
            alt=""
          />
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
            <v-btn class="addBag" v-if="bag" @click="bag = !bag"
              >Add To Bag</v-btn
            >
            <v-icon class="bagBtn" v-else @click="decrement">mdi-minus</v-icon>
            <div class="count" v-if="!bag">{{ homeStore.count }}</div>
            <v-icon class="bagBtn" v-if="!bag" @click="increment"
              >mdi-plus</v-icon
            >
            <v-btn class="wishlist"><v-icon>mdi-heart </v-icon> WISHLIST</v-btn>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2>
            <b>{{ homeStore.book1.bookName }}</b>
          </h2>
        </div>
        <div class="author">{{ homeStore.book1.author }}</div>
        <div>
          <span class="rating"
            >4.5 <v-icon class="starIcon" icon="mdi-star"></v-icon> </span
          ><span> (20)</span>
        </div>
        <div class="price">
          Rs. {{ homeStore.book1.discountPrice }}
          <span class="strikeAmount">Rs. {{ homeStore.book1.price }} </span>
        </div>

        <v-divider></v-divider>
        <br />
        <div>
          <ul>
            <li>Book Details</li>
          </ul>
        </div>
        <div class="desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit fuga mollitia
          a Lorem ipsum dolor sit amet, consectetur adipisicing elit fuga
          mollitia a Lorem ipsum dolor sit amet, consectetur adipisicing elit
          fuga mollitia a
        </div>
        <br />
        <v-divider></v-divider>
        <div class="fb-text">Customer Feedback</div>
        <div class="rating-box">
          <div style="margin-left: 1%"><h4>Overall Ratings</h4></div>
          <div>
            <v-rating
            color="#FDD835"
              v-model="rating"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half"
              half-increments
              hover
            ></v-rating>
          </div>
          <textarea rows="3" placeholder="Write Your Review"></textarea>
          <div>
            <button id="submit-btn">Submit</button>
          </div>
          <br /><br>
        </div>
        <div>
          <div class="namebox">
            <div class="round">AC</div>
            <div class="name">Aniket Chile</div>
          </div>
          <div>
            <div>
              <v-rating
              color="#FDD835"
                v-model="rating"
                empty-icon="mdi-star-outline"
                full-icon="mdi-star"
                half-icon="mdi-star-half"
                half-increments
                hover
              ></v-rating>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              tenetur porro fugit quam molestias, dolore officiis. Nihil, rerum
              nisi voluptates obcaecati dicta, laudantium consectetur assumenda
              ut sit facere exercitationem? Hic.
            </div>
            <br />
          </div>
        </div>
        <div>
          <div class="namebox">
            <div class="round">SB</div>
            <div class="name">Sweta Bodkar</div>
          </div>
          <div>
            <div>
              <v-rating
              color="#FDD835"
                v-model="rating"
                empty-icon="mdi-star-outline"
                full-icon="mdi-star"
                half-icon="mdi-star-half"
                half-increments
                hover
              ></v-rating>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              tenetur porro fugit quam molestias, dolore officiis. Nihil, rerum
              nisi voluptates obcaecati dicta, laudantium consectetur assumenda
              ut sit facere exercitationem? Hic.
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 800px) {
  .outer-div {
    padding: 0;
    width: fit-content;
  }
  .details {
    display: flex;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 410px) {
  .body {
    width: 100%
  }
  .outer-div {
    padding: 0;
    width: 100%;
  }
  .two-img{
    display: none;
  }
}
.v-field__field {
  height: fit-content;
}
.outer-div {
  background-color: white;
  height: 100%;
  padding: 1rem 9rem;
  width: 100%;
}
.details {
  display: flex;
  /* flex-wrap: wrap; */
  width: fit-content;
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
  background-color: rgb(41, 163, 41);
  color: white;
  width: fit-content;
  padding: 2px;
  padding-left: 4px;
  padding-right: 4px;
}
.starIcon {
  font-size: small;
  padding-bottom: 5px;
}
.fb-text {
  font-size: x-large;
  margin-top: 2%;
}
.rating-box {
  background-color: rgb(241, 239, 239);
  padding: 10px;
  height: fit-content !important;
}
#submit-btn {
  background-color: #3371b5;
  color: white;
  padding: 1%;
  border-radius: 5px;
  float: right;
}
.v-field__field .v-textarea {
  height: fit-content !important;
}
.desc {
  text-wrap: wrap;
  width: fit-content;
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
  font-size: large;
  color: gray;
}
.price {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 2%;
}
.btnbox {
  display: flex;
  justify-content: space-between;
  margin-top: 8%;
}
.addBag {
  background-color: #a03037;
  color: white;
}
.wishlist {
  background-color: black;
  color: white;
}
.author {
  font-size: larger;
  color: grey;
  margin-bottom: 7px;
}
textarea {
  width: 100%;
  background-color: white;
  padding: 1%;
  margin-left: 1%;
}
.round {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(210, 210, 210);
  padding: 13px;
  padding-left: 1 5px;
}
.name {
  padding-top: 1%;
  padding-left: 1.5%;
  font-size: 20px;
  font-weight: bold;
}
.namebox {
  display: flex;
  margin-top: 2%;
}
.count {
  font-size: x-large;
}
.bagBtn {
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>
