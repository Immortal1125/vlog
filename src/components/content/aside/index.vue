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
        <div class="site-state">
          <div class="site-state-item">
            <span class="site-state-item-count">0</span>
            <span class="site-state-item-name">文章</span>
          </div>
          <div class="site-state-item">
            <span class="site-state-item-count">0</span>
            <span class="site-state-item-name">分类</span>
          </div>
          <div class="site-state-item">
            <span class="site-state-item-count">0</span>
            <span class="site-state-item-name">标签</span>
          </div>
        </div>
        <div class="runDays">
          <h6 class="font-weight-bold">运行天数</h6>
          <span class="subtitle"> {{ untilTime }}</span>
        </div>
      </div>
      <div id="inner-part2" v-else-if="tabTools == 2">
        <div class="year-progress">
          <h6 class="font-weight-bold">Year Progress</h6>
          <div class="progress-info">
            <div class="progress-label">
              <span id="yearprogress_yearname">{{ year }}</span>
            </div>
            <div id="yearprogress_text_container" class="progress-percentage">
              <span id="yearprogress_progresstext">{{ progressshort }}</span>
              <span id="yearprogress_progresstext_full">{{ progress }}</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar" :style="{ width: progressshort }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let tabTools = ref(1);

let year = new Date().getFullYear();
let progress = ref("");
let progressshort = ref("");
let now = new Date();

function yearprogress_refresh() {
  let year = new Date().getFullYear();
  let from = new Date(year, 0, 1, 0, 0, 0);
  let to = new Date(year, 11, 31, 23, 59, 59);
  now = new Date();
  progress.value = (((now - from) / (to - from + 1)) * 100).toFixed(7) + "%";
  progressshort.value =
    (((now - from) / (to - from + 1)) * 100).toFixed(2) + "%";
}
yearprogress_refresh();
if (typeof yearProgressIntervalHasSet == "undefined") {
  var yearProgressIntervalHasSet = true;
  setInterval(function () {
    yearprogress_refresh();
  }, 500);
}

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
