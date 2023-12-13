<template>
  <div class="content">
    <div class="aside">
      <Aside></Aside>
    </div>
    <div class="main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup>
import Aside from "./aside/index.vue";
import Main from "./main/index.vue";
</script>

<style scoped>
@import "./index.css";
@import "./mobile.css";
</style>
