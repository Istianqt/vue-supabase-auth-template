import { createRouter, createWebHistory } from "vue-router";

import Login from "../login.vue";
import Signup from "../signup.vue";
import Dashboard from "../dashboard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/signup",
      component: Signup,
    },
        {
      path: "/dashboard",
      component: Dashboard,
    }
  ],
});

export default router;