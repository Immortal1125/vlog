<template>
  <div class="leftBar-part1 card">
    <div class="leftBar-part1-inner">
      <div class="mainList">
        <div>
          <span
            class="tab-tools-btn"
            :class="{ active: tabTools == 1 }"
            @click="tabTools = 1"
            >站点概览</span
          >
        </div>
        <div>
          <span
            class="tab-tools-btn"
            :class="{ active: tabTools == 2 }"
            @click="tabTools = 2"
            >功能</span
          >
        </div>
      </div>
      <div id="inner-part1" v-if="tabTools == 1">
        <div class="author-card">
          <img src="/images/logo.png" alt="0" class="author-image" />
          <span class="title">Immort</span>
          <span class="subtitle">欢迎来看</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let tabTools = ref(1);

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
