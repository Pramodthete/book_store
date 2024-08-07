<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useHomeStore } from "@/stores/home";
import { useCartStore } from "@/stores/cart";
import {
  getAllBooks,
  getFeedbacksById,
  storeFeedback,
  addItemToWishlist,
} from "@/services/bookStoreService";
import type { Book, Feedback } from "../../stores/types";
import router from "@/router";

const route = useRoute();
const rating = ref(0);
const bag = ref(true);
const book1 = ref<Book | null>(null);
const books = ref<Book[]>([]);
const feedbacks = ref<Feedback[]>([]);
const bookId = route.params.id as string;
const feedbackText = ref<string>("");
const updateKey = ref(0);
const colorRed = ref(false);

const homeStore = useHomeStore();
const cartStore = useCartStore();

const fetchBooks = async () => {
  try {
    const res = await getAllBooks();
    books.value = res.data.result;
    console.log(res.data.result);
    book1.value = books.value.find((b) => b._id === bookId) || null;
    console.log(book1.value?._id);
    const b = homeStore.totalWishlist.filter(
      (book) => book.product_id._id == book1.value?._id
    );
    if (b.length != 0) {
      console.log(b);

      colorRed.value = true;
    } else {
      colorRed.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const getFeedbacks = async () => {
  try {
    const res = await getFeedbacksById(bookId);
    feedbacks.value = res.data.result.reverse().splice(0, 4);
    console.log(res.data.result);
  } catch (error) {
    console.log(error);
  }
};

const clickBag = () => {
  bag.value = false;
  cartStore.increment(bookId, cartStore.cartId, cartStore.quantity);
};

const addFeedbacks = () => {
  const data = {
    comment: feedbackText.value,
    rating: rating.value,
  };
  console.log(bookId, data);

  if (feedbackText.value !== "" && rating.value !== 0) {
    storeFeedback(bookId, data)
      .then((res) => {
        console.log(res);
        getFeedbacks();
        feedbackText.value = "";
        rating.value = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("Feedback Text and rating Both required");
  }
};

onMounted(() => {
  fetchBooks();
  getFeedbacks();
  cartStore.getOneBook(bookId);
  homeStore.getAllWishlistItems();
});

const addToWishlist = (bookId: string) => {
  addItemToWishlist(bookId)
    .then((res) => {
      colorRed.value = true;
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};


const items = ref([
  {
    title: "Home",
    disabled: false
  },
  {
    title: `My Book`,
    disabled: false
  },
]);


const booksPush=()=>{
  router.push('/books')
}
</script>

<template>
  <div class="breadCrumb">
    <v-breadcrumbs @click="booksPush" :items ></v-breadcrumbs>
  </div>

  <div class="outer-div">
    <div class="details" v-if="book1">
      <div class="img-flex">
        <div class="two-img">
          <img
            style="padding: 10%; border: 1px solid red"
            src="../../assets/images/dmmt.png"
            width="50px"
            alt=""
          />
          <img
            style="padding: 10%; border: 1px solid rgb(211, 210, 210)"
            src="../../assets/images/uxdesign.png"
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
            <v-icon
              class="bagBtn"
              v-if="cartStore.quantity > 0"
              @click="cartStore.decrement(cartStore.cartId, cartStore.quantity)"
            >
              mdi-minus
            </v-icon>
            <div class="count" v-if="cartStore.quantity > 0">
              {{ cartStore.quantity }}
            </div>
            <v-icon
              class="bagBtn"
              v-if="cartStore.quantity > 0"
              @click="
                cartStore.increment(
                  bookId,
                  cartStore.cartId,
                  cartStore.quantity
                )
              "
            >
              mdi-plus
            </v-icon>
            <v-btn class="addBag" :key="updateKey" v-else @click="clickBag">
              Add To Bag
            </v-btn>
            <v-btn class="wishlist" @click="addToWishlist(book1._id)">
              <v-icon :class="{ RedWishlist: colorRed }">mdi-heart </v-icon>
              WISHLIST
            </v-btn>
          </div>
        </div>
      </div>
      <div class="second-div">
        <div class="content">
          <div>
            <h1>
              <b>{{ book1.bookName }}</b>
            </h1>
          </div>
          <div class="author">By {{ book1.author }}</div>
          <div>
            <span class="rating">
              4.5 <v-icon class="starIcon" icon="mdi-star"></v-icon>
            </span>
            <span> (20)</span>
          </div>
          <div class="price">
            Rs. {{ book1.discountPrice }}
            <span class="strikeAmount">Rs. {{ book1.price }}</span>
          </div>
        </div>
        <v-divider></v-divider>
        <br />
        <div>
          <ul>
            <li>Book Details</li>
          </ul>
        </div>
        <div class="desc">
          {{ book1.description }}
        </div>
        <br />
        <v-divider></v-divider>
        <div class="fb-text">Customer Feedback</div>
        <div class="rating-box">
          <div style="margin-left: 1%">
            <h4>Overall Ratings</h4>
          </div>
          <div>
            <v-rating
              active-color="#FDD835"
              v-model="rating"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half"
              hover
            ></v-rating>
          </div>
          <textarea
            rows="3"
            v-model="feedbackText"
            placeholder="Write Your Review"
          ></textarea>
          <div>
            <button id="submit-btn" @click="addFeedbacks">Submit</button>
          </div>
          <br /><br />
        </div>
        <div>
          <div v-for="feedback in feedbacks" :key="feedback._id">
            <div class="namebox">
              <div class="round">{{ feedback.user_id.fullName[0] }}</div>
              <div class="name">{{ feedback.user_id.fullName }}</div>
            </div>
            <div>
              <div>
                <v-rating
                  readonly
                  active-color="#FDD835"
                  v-model="feedback.rating"
                  empty-icon="mdi-star-outline"
                  full-icon="mdi-star"
                  half-icon="mdi-star-half"
                  half-increments
                  hover
                ></v-rating>
              </div>
              <div>
                {{ feedback.comment }}
              </div>
              <br />
            </div>
          </div>
          <br><br>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <v-progress-circular
      :size="50"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
      <h2>Loading...</h2>
    </div>
  </div>
</template>

<style scoped>
.breadCrumb {
  margin-left: 15%;
  margin-top: 2%;
}
.two-img {
  display: flex;
  flex-direction: column;
  justify-content: start;
}
@media screen and (max-width: 800px) {
  .outer-div {
    padding: 0;
    width: 100%;
  }
  .details {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 1%;
  }
  .breadCrumb {
    margin-top: 5%;
  }
  .img-flex {
    display: flex;
    justify-content: center;
    gap: 2px;
  }
  li {
    margin-left: 4%;
  }
  .content {
    text-align: center;
  }
}
@media screen and (max-width: 400px) {
  .body {
    width: 100%;
  }
  .outer-div {
    padding: 0;
    width: 100%;
  }
  .two-img {
    display: none;
  }
}
.v-field__field {
  height: fit-content;
}
.outer-div {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1%;
}
.details {
  display: flex;
  /* flex-wrap: wrap; */
  width: 1000px;
  gap: 50px;
}
.second-div {
  width: 100%;
}
.img-flex {
  display: flex;
  gap: 0.5%;
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
  .breadCrumb {
    margin-top: 12%;
  }
}
.strikeAmount {
  text-decoration: line-through;
  font-size: large;
  color: gray;
}
.price {
  font-size: xx-large;
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
  padding-left: 19px;
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
.RedWishlist {
  color: red;
}
.loading{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  padding-bottom: 10%;
  gap: 2%;
}
</style>
