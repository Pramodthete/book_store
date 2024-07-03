<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useHomeStore } from "@/stores/home";
import {
  getAllBooks,
  getFeedbacksById,
  storeFeedback,
} from "@/services/bookStoreService";
import type { Book, Feedback, Cart } from "@/stores/home";

const route = useRoute();
const rating = ref(0);
const bag = ref(true);
const book1 = ref<Book | null>(null);
const books = ref<Book[]>([]);
const feedbacks = ref<Feedback[]>([]);
const bookId = route.params.id as string;
const feedbackText = ref<string>("");

const homeStore = useHomeStore();

const fetchBooks = async () => {
  try {
    const res = await getAllBooks();
    books.value = res.data.result;
    console.log(res.data.result);
    book1.value = books.value.find((b) => b._id === bookId) || null;
  } catch (error) {
    console.log(error);
  }
};

const getFeedbacks = async () => {
  try {
    const res = await getFeedbacksById(bookId);
    feedbacks.value = res.data.result.reverse();
    console.log(res.data.result);
  } catch (error) {
    console.log(error);
  }
};

const clickBag = () => {
  homeStore.increment(bookId);
  bag.value = false;
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
  homeStore.getOneBook(bookId);
  document.body.style.backgroundColor = "white";
});
</script>



<template>
  <div class="outer-div">
    <v-breadcrumbs :items="['Home', `Book (1)`]"></v-breadcrumbs>
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
            
            <v-icon class="bagBtn" v-if="homeStore.quantity > 0" @click="homeStore.decrement">
              mdi-minus
            </v-icon>
            <div class="count" v-if="homeStore.quantity > 0">
              {{ homeStore.quantity }}
            </div>
            <v-icon class="bagBtn" v-if="homeStore.quantity > 0" @click="homeStore.increment(bookId)">
              mdi-plus
            </v-icon>
            <v-btn class="addBag" v-else @click="clickBag">
              Add To Bag
            </v-btn>
            <v-btn class="wishlist">
              <v-icon>mdi-heart </v-icon> WISHLIST
            </v-btn>
          </div>
        </div>
      </div>
      <div class="second-div">
        <div>
          <h2>
            <b>{{ book1.bookName }}</b>
          </h2>
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
          <textarea rows="3" v-model="feedbackText" placeholder="Write Your Review"></textarea>
          <div>
            <button id="submit-btn" @click="addFeedbacks">Submit</button>
          </div>
          <br /><br />
        </div>
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
      </div>
    </div>
    <div v-else>Loading...</div>
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
  background-color: white;
  height: 100%;
  padding: 1rem 9rem;
  width: 100%;
}
.details {
  display: flex;
  /* flex-wrap: wrap; */
  width: 1000px;
  gap: 50px;
}
.second-div {
  width: 800px;
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
}
.bagBtn {
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>
