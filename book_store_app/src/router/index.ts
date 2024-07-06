import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUpView.vue";
import Login from "../views/LoginView.vue";
import NewUser from "../views/NewUserView.vue";
import BookDetails from "../views/BookDetailsView.vue";
import { useSignupStore } from "@/stores/signUp";
import BookHeader from "@/views/BookHeaderView.vue";
import { useHomeStore } from "@/stores/home";
import CartItems from "@/views/CartItemsView.vue";
import OrderPlaced from "@/views/OrderPlacedView.vue";
import Wishlist from "@/views/WishlistView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/books",
      name: "header",
      component: BookHeader,
      children: [
        {
          path: "/books",
          name: "home",
          component: HomeView,
        },
        {
          path: "/bookDetails/:id",
          name: "bookDetails",
          component: BookDetails,
        },
        {
          path: "/cartDetails",
          name: "cartDetails",
          component: CartItems,
        },
        {
          path: "/orderPlaced",
          name: "orderPlaced",
          component: OrderPlaced,
        },
        {
          path: "/wishlist",
          name: "wishlist",
          component: Wishlist,
        },
      ],
    },
    {
      path: "/newUser",
      name: "newUser",
      component: NewUser,
      children: [
        {
          path: "/signup",
          name: "signup",
          component: SignUp,
        },
        {
          path: "/login",
          name: "login",
          component: Login,
        },
      ],
    },
    {
      path: "/",
      redirect: "/books",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const signupStore = useSignupStore();
  const token = localStorage.getItem("x-access-token");
  const isAuthenticated = !!token;

  if (to.name === "signup") {
    signupStore.tab = 2;
    signupStore.changeColor = true;
  }

  if (isAuthenticated) {
    if (
      to.name === "cartDetails" ||
      to.name === "orderPlaced" ||
      to.name === "wishlist" ||
      to.name === "profile"
    ) {
      return next();
    }
  } else {
    if (
      to.name === "cartDetails" ||
      to.name === "orderPlaced" ||
      to.name === "wishlist" ||
      to.name === "profile"
    ) {
      return next({ name: "login" });
    }
  }

  next();
});

export default router;
