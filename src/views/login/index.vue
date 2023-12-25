<!-- Login.vue -->
<template>
    <div class="card back">
        <RouterLink to="/">
            <i class="iconfont icon-xiangzuojiantou icon"></i>
        </RouterLink>
    </div>
    <div class="loginBody">
        <div class="loginBox">
            <form action="">
                <h2 class="title">Login</h2>
                <input type="text" id="username" placeholder="Username" />
                <input type="password" id="password" placeholder="Password" />
                <input type="submit" value="Login" id="login" @click="login" />
                <div class="footrt">
                    <div class="Remeber">
                        <input type="checkbox" id="remeberMe" />
                        <label for="remeberMe">记住我</label>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import router from "@/router/index.js";
import { RouterLink } from "vue-router";
function login() {
    // 在这里执行登录逻辑，例如发送登录请求到后端
    // 成功登录后，获取并存储 token
    const token = "your_generated_token"; // 替换为实际的 token
    localStorage.setItem("token", token);

    // 跳转到后台管理页面
    router.push("/admin");
}
</script>

<style scoped>
@import "/css/card.css";
@import "/fonts/iconfont.css";
@import "./index.css";
</style>


