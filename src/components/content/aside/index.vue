<template>
  <div class="leftBar-part1 card">
    <span>站点概览 </span>
    <span>运行时间 {{ untilTime }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
/**
 * 运行时间
 */
const startTime = new Date("2023-09-01T00:00:00");
let untilTime = ref("");

function formatTimeDifference(duration) {
  const pad = (num) => (num < 10 ? "0" + num : num);

  const years = Math.floor(duration / (365 * 24 * 60 * 60));
  duration %= 365 * 24 * 60 * 60;

  const days = Math.floor(duration / (24 * 60 * 60));

  return `${pad(years)}年${pad(days)}天`;
}

function updateTimer() {
  let now = new Date();
  let temp = Math.floor((now - startTime) / 1000);
  untilTime.value = formatTimeDifference(temp);
}

updateTimer();
</script>

<style>
@import "/css/card.css";
</style>

<style scoped>
@import "./index.css";
</style>
