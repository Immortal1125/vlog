<template>
    <div class="main card">
        <div class="publishVlog">
            <RouterLink to="/admin/editor" class="publishBtn">发布</RouterLink>
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
</style>
