import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import Seat from "../views/Seat.vue";
import Ticket from "../views/Ticket.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/:movieId/seat",
    name: "seat",
    component: Seat
  },
  {
    path: "/ticket",
    name: "ticket",
    component: Ticket
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
