import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Messenger from "../views/Messenger.vue";
import Settings from "../views/Settings.vue";
import Statistics from "../views/Statistics.vue";
import AddVideo from "../views/AddVideo.vue";
import Watch from "../views/Watch.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/Profile/:id",
    name: "Profile",
    component: Profile,
    props: true
  },
  {
    path: "/Messenger",
    name: "Messenger",
    component: Messenger
  },
  {
    path: "/Settings",
    name: "Settings",
    component: Settings
  },
  {
    path: "/Statistics",
    name: "Statistics",
    component: Statistics
  },
  {
    path: "/AddVideo",
    name: "Add Video",
    component: AddVideo
  },
  {
    path: "/Watch/:id",
    name: "Watch Video",
    component: Watch,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
