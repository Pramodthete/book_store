import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUpView.vue";
import Login from "../views/LoginView.vue";
import NewUser from "../views/NewUserView.vue";
import BookDetails from "../views/BookDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
      path: "/bookDetails",
      name: "bookDetails",
      component: BookDetails,
    },
  ],
});

export default router;
