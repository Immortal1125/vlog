import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index/index.vue";
import Home from "../views/Home/index.vue";
import Link from "../views/Link/index.vue";
import Category from "../views/Category/index.vue";
import Archive from "../views/Archive/index.vue";
import Vlog from "../views/VlogContent/index.vue";
import Administrator from "../views/administrator/index.vue";
import Login from "../views/login/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      children: [
        {
          path: "/home",
          name: "home",
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
        {
          path: "/vlog",
          name: "vlog",
          component: Vlog,
        },
      ],
    },
    {
      path: "/administrator",
      name: "administrator",
      component: Administrator,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.path === "/administrator") {
    let token = localStorage.getItem("token");
    if (token === null || token === "") {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
