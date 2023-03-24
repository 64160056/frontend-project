import LoginView from "@/views/LoginView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: HomeView,
        menu: () => import("@/components/menus/MainMenu.vue"),
        header: () => import("@/components/headers/MainHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: LoginView,
      },
      meta: {
        layout: "FullLayout",
      },
    },
    {
      path: "/about",
      name: "about",

      components: {
        default: () => import("../views/AboutView.vue"),
        menu: () => import("@/components/menus/AboutMenu.vue"),
        header: () => import("@/components/headers/AboutHeader.vue"),
      },
      meta: {
        layout: "FullLayout",
      },
    },
    {
      path: "/product",
      name: "product",

      components: {
        default: () => import("../views/products/ProductView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
        header: () => import("@/components/headers/MainHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/user",
      name: "user",

      components: {
        default: () => import("../views/users/UserView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
        header: () => import("@/components/headers/MainHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: LoginView,
      },
      meta: {
        layout: "FullLayout",
      },
    },
  ],
});
function isLogin() {
  const user = localStorage.getItem("user");
  if (user) {
    return true;
  }
  return false;
}
router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !isLogin()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
