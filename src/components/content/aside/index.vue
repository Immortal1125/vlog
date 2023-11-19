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
const startTime = new Date("2023-11-18T22:49:50");
let untilTime = ref("");

function formatTimeDifference(duration) {
  const pad = (num) => (num < 10 ? "0" + num : num);

  const years = Math.floor(duration / (365 * 24 * 60 * 60));
  duration %= 365 * 24 * 60 * 60;

  const months = Math.floor(duration / (30 * 24 * 60 * 60));
  duration %= 30 * 24 * 60 * 60;

  const days = Math.floor(duration / (24 * 60 * 60));
  duration %= 24 * 60 * 60;

  const hours = Math.floor(duration / (60 * 60));
  duration %= 60 * 60;

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${pad(years)}年${pad(months)}月${pad(days)}天${pad(hours)}小时${pad(
    minutes
  )}分${pad(seconds)}秒`;
}

function updateTimer() {
  let now = new Date();
  let temp = Math.floor((now - startTime) / 1000);
  untilTime.value = formatTimeDifference(temp);
  setTimeout(updateTimer, 1000); // 递归调用，确保每秒更新
}

updateTimer();
</script>

<style>
@import "/css/card.css";
</style>

<style scoped>
@import "./index.css";
</style>
