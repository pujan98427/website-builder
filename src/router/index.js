import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Builder from "@/components/builder/Builder.vue";
import PageList from "@/components/pages/PageList.vue";
import Preview from "@/components/preview/Preview.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/pages",
    },
    {
      path: "/pages",
      name: "pages",
      component: PageList,
    },
    {
      path: "/builder/:id",
      name: "builder",
      component: Builder,
      props: true,
    },
    {
      path: "/:id",
      name: "preview",
      component: Preview,
      props: true,
    },
    // Catch all route - redirect to pages
    {
      path: "/:pathMatch(.*)*",
      redirect: "/pages",
    },
  ],
});

// Navigation guard to handle any redirects
router.beforeEach((to, from, next) => {
  // If trying to access a non-existent route, redirect to pages
  if (to.name === undefined) {
    next({ name: "pages" });
  } else {
    next();
  }
});

export default router;
