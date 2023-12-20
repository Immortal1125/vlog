<template>
  <Nav></Nav>
  <Content></Content>
  <AdminBtn class="adminBtn"></AdminBtn>
</template>

<script setup>
import Nav from "../../components/Nav/index.vue";
import Content from "../../components/content/index.vue";
import AdminBtn from "../../components/AdminBtn/index.vue";
</script>

<style scoped>
.adminBtn {
  position: fixed;
  bottom: 50px;
  left: 50px;
}

@media (max-width: 660px) {
  .adminBtn {
    display: none;
  }
}
</style>
