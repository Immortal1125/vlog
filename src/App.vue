<template>
  <Nav></Nav>
  <Content></Content>
  <RouterView></RouterView>
  <AI></AI>
</template>

<script setup>
import Nav from "./components/Nav/index.vue";
import { RouterView } from "vue-router";
import Content from "./components/content/index.vue";
import AI from "./views/AI/index.vue";
</script>

<style scoped>
@import "style.css";
</style>
