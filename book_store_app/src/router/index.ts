import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUpView.vue";
import Login from "../views/LoginView.vue";
import NewUser from "../views/NewUserView.vue";
import BookDetails from "../views/BookDetailsView.vue";
import { useSignupStore } from "@/stores/signUp";
import BookHeader from "@/views/BookHeaderView.vue";

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
  const token = localStorage.getItem('x-access-token');
  const isAuthenticated = !!token;

  if (!isAuthenticated && to.name !== 'login') {
    return next({ name: 'login' }); 
  }

  if (to.name === "signup") {
    signupStore.tab = 2;
    signupStore.changeColor=true
  }
  
  next();
});

export default router;
