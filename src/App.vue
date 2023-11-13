<template>
  <Nav></Nav>
  <Content></Content>
  <RouterView></RouterView>
</template>

<script setup>
import Nav from "./components/Nav/index.vue";
import { RouterView } from "vue-router";
import Content from "./components/content/index.vue";
</script>

<style scoped>
@import "style.css";
</style>
