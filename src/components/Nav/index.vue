<template>
    <nav>
        <div class="navMenuBtn" @click="openSiderBox" id="navMenuBtn">
            <i class="iconfont icon-gengduo" id="navMenuIcon"></i>
        </div>
        <div class="content">
            <div class="logo">
                <RouterLink to="/">
                    <!-- <img src="/images/logo.png" alt="1" /> -->
                    <span>Immort</span>
                </RouterLink>
            </div>
            <ul class="active">
                <li v-for="item in navBtnList" :key="item">
                    <RouterLink :to="item.path">
                        <i :class="item.icon" class="iconfont"></i>
                        <span>{{ item.name }}</span>
                    </RouterLink>
                </li>
            </ul>
            <ul
                :class="[
                    { searchBoxIsOpened: isOpened },
                    { searchBoxIsClosed: !isOpened },
                ]"
                class="searchBox"
                @click="openSearchBox"
            >
                <li>
                    <form @submit="getSearch">
                        <i class="iconfont icon-sousuo"></i>
                        <input
                            type="text"
                            placeholder="搜索什么...."
                            v-model="searchValue"
                            @blur="closeSearchBox"
                            id="input"
                        />
                    </form>
                </li>
            </ul>
        </div>
    </nav>
    <Sidebar
        :barIsOpened="barIsOpened"
        id="siderBar"
        :navBtnList="navBtnList"
        class="siderBar"
    ></Sidebar>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { provide, ref } from "vue";
import Sidebar from "./childComps/SideBar/index.vue";
const navBtnList = ref([
    {
        name: "友链",
        icon: "icon-charulianjie",
        path: "/link",
    },
    {
        name: "分类",
        icon: "icon-fenlei",
        path: "/category",
    },
    {
        name: "归档",
        icon: "icon-guidangxiangmu",
        path: "/archive",
    },
]);

let isOpened = ref(false);
let searchValue = ref("");
function openSearchBox() {
    isOpened.value = true;
    const input = document.getElementById("input");
    input.focus();
}

function closeSearchBox() {
    isOpened.value = false;
    searchValue.value = "";
}

let barIsOpened = ref(false);
provide("barIsOpened", barIsOpened);
let clickCloseSiderBoxListener;
function openSiderBox() {
    barIsOpened.value = true;
    document.addEventListener("click", clickCloseSiderBox);
}

/**
 * 检测点击元素关闭左侧栏
 * @param {*} event 点击的页面元素
 */
function clickCloseSiderBox(event) {
    const sideBar = document.getElementById("siderBar");
    const navMenuBtn = document.getElementById("navMenuBtn");
    const navMenuIcon = document.getElementById("navMenuIcon");
    if (sideBar) {
        console.log(event.target);
        if (
            !sideBar.contains(event.target) &&
            event.target !== navMenuBtn &&
            event.target !== navMenuIcon
        ) {
            closeSiderBox();
            document.removeEventListener("click", clickCloseSiderBox);
        }
    } else {
        document.removeEventListener("click", clickCloseSiderBox);
    }
}

function closeSiderBox() {
    barIsOpened.value = false;
}

function getSearch(e) {
    e.preventDefault();
    console.log(searchValue.value);
}
</script>

<style scoped>
@import "index.css";
@import "mobile.css";
@import "/fonts/iconfont.css";
</style>
