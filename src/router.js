import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Course from "./components/Course.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  }
  ,
  {
    path: "/course",
    name: "Course",
    component: Course
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;