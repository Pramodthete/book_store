import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUpView.vue";
import Login from "../views/LoginView.vue";
import NewUser from "../views/NewUserView.vue";
import BookDetails from "../views/BookDetailsView.vue";
import { useSignupStore } from "@/stores/signUp";
import BookHeader from "@/views/BookHeaderView.vue";

import { useHomeStore } from "@/stores/home";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/books",
      name: "header",
      component: BookHeader,
      children:[{
        path: "/books",
        name: "home",
        component: HomeView,
      },
      {
        path: "/bookDetails/:id",
        name: "bookDetails",
        component: BookDetails,
      },
    ]
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
    
  ],
});

router.beforeEach((to, from, next) => {
  const signupStore = useSignupStore();
  const homeStore = useHomeStore();
  const token = localStorage.getItem('x-access-token');
  const isAuthenticated = !!token;

  if (!isAuthenticated && to.name !== 'login') {
    return next({ name: 'login' }); 
  }

  if (to.name === "signup") {
    signupStore.tab = 2;
    signupStore.changeColor=true
  }
  if (to.path === "/") {
    return next({name:'home'})
  }
  if (to.name === "bookDetails/:id") {
    const bookId = to.params.id;
    if (!homeStore.book1._id || homeStore.book1._id !== bookId) {
      console.log("Book not found in store, fetch or handle as needed.");
      // Fetch book or handle the case when the book is not in store
    }
  }
  
  next();
});

export default router;
