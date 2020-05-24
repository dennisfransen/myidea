import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "./auth-guard";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Profile from "@/views/Profile.vue";
import Articles from "@/views/Articles.vue";
import Article from "@/views/Article.vue";
import CreateArticle from "@/views/CreateArticle.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: AuthGuard,
  },
  {
    path: "/articles",
    name: "Articles",
    component: Articles,
  },
  {
    path: "/articles/:id",
    name: "Article",
    props: true,
    component: Article,
  },
  {
    path: "/create-article",
    name: "CreateArticle",
    component: CreateArticle,
    beforeEnter: AuthGuard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
