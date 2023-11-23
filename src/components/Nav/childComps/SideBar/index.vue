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
          @click="console.log(1)"
          type="checkbox"
          name="modeButton"
          id="modeButton"
        />
        <div></div>
      </label>
      <span>夜间</span>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import { inject } from "vue";
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
</script>

<style scoped>
@import "index.css";
@import "/fonts/iconfont.css";
</style>
