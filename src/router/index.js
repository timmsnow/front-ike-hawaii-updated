import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Calendar from "../views/Calendar.vue";
import DayShow from "../views/DayShow.vue";
import ExperienceIndex from "../views/ExperienceIndex.vue";
import Logout from "../views/Logout.vue";
import { createRouter, createWebHistory } from 'vue-router'





Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/day-show",
    name: "DayShow",
    component: DayShow,
  },
  {
    path: "/experiences",
    name: "experience-index",
    component: ExperienceIndex,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
//   scrollBehavior() {
//     return { x: 0, y: 0 };
//   },
// });

export default router;
