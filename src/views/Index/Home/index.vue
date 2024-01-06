<template>
    <div class="vlog-list">
        <div class="card vlog-item" v-for="item in 7">
            <RouterLink to="/vlog">
                <img
                    src="https://gitee.com/Immortal112/image/raw/master/background/1.webp"
                    alt="1"
                    class="cover"
                />
                <div class="content">
                    <span class="title">测试</span>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style>
@import "/css/card.css";
</style>

<style scoped>
@import "./index.css";
@import "./mobile.css";
</style>
