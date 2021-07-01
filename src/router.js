import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Course from "./components/Course.vue";
import Admin from "./components/Admin.vue";
import ManageUser from "./components/ManageUser.vue"
import AddUser from "./components/AddUser.vue"
import UpdateUser from "./components/UpdateUser.vue"


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
  } ,
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/admin/users",
    name: "ManageUser",
    component: ManageUser
  },
  {
    path: "/admin/add_user",
    name: "AddUser",
    component: AddUser
  },
  {
    path: "/admin/update_user/:id?",
    name: "UpdateUser",
    component: UpdateUser
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;