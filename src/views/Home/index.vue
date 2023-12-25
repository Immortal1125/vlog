<template>
    <div class="vlog-list">
        <div class="card vlog-item" v-for="item in 3">
            <img
                src="https://gitee.com/Immortal112/image/raw/master/background/1.webp"
                alt="1"
                class="cover"
            />
            <div class="content">
                <span class="title">KMS</span>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style>
@import "/css/card.css";
</style>

<style scoped>
@import "./index.css";
@import "./mobile.css";
</style>
