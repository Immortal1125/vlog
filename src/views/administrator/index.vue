<!-- Administrator.vue -->
<template>
    <RouterView> </RouterView>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { RouterView } from "vue-router";

const isLoggedIn = ref(false);
const router = useRouter();

const checkLogin = () => {
    // 检查本地存储中是否有 token
    const token = localStorage.getItem("token");
    isLoggedIn.value = !!token; // 将 token 转换为布尔值
};

onBeforeMount(() => {
    // 在组件挂载之前检查登录状态
    checkLogin();

    // 如果未登录，直接跳转到登录页面
    if (!isLoggedIn.value) {
        router.push("/login");
    }
});

function exitLogin() {
    localStorage.removeItem("token");
    checkLogin();

    // 如果未登录，直接跳转到登录页面
    if (!isLoggedIn.value) {
        router.push("/login");
    }
}
</script>
