import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/index.vue";
import Link from "../views/Link/index.vue";
import Category from "../views/Category/index.vue";
import Archive from "../views/Archive/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: Home,
    },
    {
      path: "/link",
      name: "link",
      component: Link,
    },
    {
      path: "/category",
      name: "category",
      component: Category,
    },
    {
      path: "/archive",
      name: "archive",
      component: Archive,
    },
  ],
});

export default router;
