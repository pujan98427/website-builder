import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../layouts/DashboardLayout.vue"),
    children: [
      {
        path: "",
        name: "DashboardHome",
        component: () => import("../pages/Dashboard.vue"),
      },
      {
        path: "builder",
        name: "Builder",
        component: () => import("../pages/Builder.vue"),
      },
      {
        path: "preview/:pageId",
        name: "Preview",
        component: () => import("../pages/PreviewPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (to.name !== "Login" && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
