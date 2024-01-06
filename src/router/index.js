import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index/index.vue";
import Home from "@/views/Index/Home/index.vue";
import Link from "@/views/Index/Link/index.vue";
import Category from "@/views/Index/Category/index.vue";
import Archive from "@/views/Index/Archive/index.vue";
import Vlog from "@/views/VlogContent/index.vue";
import Admin from "@/views/administrator/index.vue";
import Login from "@/views/login/index.vue";
import VlogEditor from "@/views/administrator/VlogEditor/index.vue";
import AdminIndex from "@/views/administrator/adminIndex/index.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "index",
            component: Index,
            children: [
                {
                    path: "/",
                    name: "home",
                    component: Home,
                },
                {
                    path: "link",
                    name: "link",
                    component: Link,
                },
                {
                    path: "category",
                    name: "category",
                    component: Category,
                },
                {
                    path: "archive",
                    name: "archive",
                    component: Archive,
                },
                {
                    path: "vlog",
                    name: "vlog",
                    component: Vlog,
                },
            ],
        },
        {
            path: "/admin",
            name: "admin",
            component: Admin,
            children: [
                {
                    path: "/admin",
                    name: "admin-index",
                    component: AdminIndex,
                },
                {
                    path: "editor",
                    name: "editor",
                    component: VlogEditor,
                },
            ],
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    if (to.path === "/admin") {
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
