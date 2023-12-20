<template>
  <div
    class="sideBarBox"
    :class="[
      { sideBarBoxIsOpened: barIsOpened },
      { sideBarBoxIsClosed: !barIsOpened },
    ]"
  >
    <div class="asideUser">
      <div class="userHead">
        <img src="/images/logo.png" alt="" />
      </div>
      <div class="introduction">
        <div><span class="title">Immort</span></div>
        <div><span class="myIntroduction">欢迎来看</span></div>
      </div>
    </div>
    <div class="siderMenuCard">
      <span class="siderTitle">导航</span>
      <hr />
      <ul class="siderNav">
        <li @click="closeSiderBox" :class="{ active: isCurrentPage('/') }">
          <RouterLink to="/">
            <i class="iconfont icon-bofang"></i>
            <span>首页</span>
          </RouterLink>
        </li>
        <li
          v-for="item in navBtnList"
          :key="item"
          @click="closeSiderBox"
          :class="{ active: isCurrentPage(item.path) }"
        >
          <RouterLink :to="item.path">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="siderMenuCard">
      <span class="siderTitle">音乐</span>
      <hr />
      <div style="width: 100%; height: 200px">
        <MusicCard></MusicCard>
      </div>
    </div>
    <div class="displayMode">
      <span>日间</span>
      <label for="modeButton">
        <input
          @click="changeMode"
          type="checkbox"
          name="modeButton"
          id="modeButton"
          :checked="dOrNMode"
        />
        <div></div>
      </label>
      <span>夜间</span>
    </div>
    <AdminBtn class="adminBtn"></AdminBtn>
  </div>
</template>

<script setup>
import AdminBtn from "../../../AdminBtn/index.vue";
import { RouterLink, useRoute } from "vue-router";
import { inject, ref } from "vue";
import MusicCard from "../../../Music/index.vue";
const props = defineProps(["navBtnList"]);

const barIsOpened = inject("barIsOpened");
/**
 * 关闭侧栏
 * barIsOpened由父组件注入
 */
function closeSiderBox() {
  barIsOpened.value = false;
}

const route = useRoute();
/**
 * 判断当前页面是否是该按钮的跳转路径
 * 用于显示当前页面按钮背景样式
 * @param {string} url 页面路径
 * @return {boolean}
 */
function isCurrentPage(url) {
  return route.path === url;
}

let dOrNMode = ref(true);
const root = document.documentElement;
const modeButton = document.getElementById("modeButton");
function nowModeSetting() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  if (currentHour <= 8 || currentHour >= 18) {
    dOrNMode.value = false;
    changeMode();
  }
}

nowModeSetting();
function changeMode() {
  if (!dOrNMode.value) {
    dOrNMode.value = true;
    root.style.setProperty(
      "--background-color",
      "linear-gradient(to top, #bdc3c7, #2c3e50)"
    );
    root.style.setProperty("--nav-background-color", "#29323c");
    root.style.setProperty("--nav-font-color", "#efeff0");
    root.style.setProperty("--box-shadow-color", "rgba(64, 64, 64, 0.6)");
    root.style.setProperty("--nav-list-hover-color", "rgb(34, 42, 45)");
    root.style.setProperty("--nav-thin-font-color", "rgba(255,255,255,0.5)");
  } else {
    dOrNMode.value = false;
    root.style.setProperty("--background-color", "#f0f3f4");
    root.style.setProperty("--nav-background-color", "#edf1f2");
    root.style.setProperty("--nav-font-color", "#333333");
    root.style.setProperty("--box-shadow-color", "rgba(64, 64, 64, 0.6)");
    root.style.setProperty("--nav-list-hover-color", "#e5e5e5");
    root.style.setProperty("--nav-thin-font-color", "rgba(0,0,0,0.3)");
  }
}
</script>

<style scoped>
@import "index.css";
@import "/fonts/iconfont.css";
</style>
