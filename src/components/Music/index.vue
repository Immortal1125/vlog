<template>
  <div class="musicCard" id="musicCard">
    <div class="musicInfo">
      <div class="title">
        <span>{{ musicList[musicIndex].title }}</span>
      </div>

      <span class="author">{{ musicList[musicIndex].author }}</span>
    </div>
    <div class="controlCard">
      <img :src="musicList[musicIndex].image" alt="" class="musicImage" />
      <div class="controlPanel">
        <div class="controlBtn">
          <i class="iconfont icon-shangyishou icon" @click="prevMusic"></i>
          <i
            class="iconfont icon"
            :class="[
              { 'icon-bofang': !playStatus },
              { 'icon-zanting': playStatus },
            ]"
            @click="changePlayStatus"
          ></i>
          <i class="iconfont icon-xiayishou icon" @click="nextMusic"></i>
        </div>
        <div class="lrcButtonBox">
          <i
            class="iconfont icon-geci1 iconLrc"
            :class="{ lrcIsOpened: lrcIsOpen }"
            @click="changeLrcStatus"
          ></i>
        </div>
        <div class="progressBar"></div>
        <div
          class="progressBar progress"
          :style="{ width: (audioCurTime / audio.duration) * 100 + '%' }"
        ></div>
      </div>
    </div>
  </div>
  <div class="lrc" v-if="lrcIsOpen">
    <div id="lrc">
      <p v-for="(item, index) in lyrics" :key="item" class="otherSentence">
        <span
          :class="{ curSentence: index == lrcIndex }"
          @click="console.log(index, lrcIndex)"
          >{{ item.text }}</span
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
const musicList = [
  {
    title: "secret base ~君がくれたもの~ (secret base ~你给我的所有~)",
    author: "SI",
    image: "https://i.imgs.ovh/2023/10/04/V4cas.jpeg",
  },
  {
    title: "海阔天空",
    author: "BEYOND",
    image: "https://i.imgs.ovh/2023/10/04/V4g3X.jpeg",
  },
  {
    title: "看得最远的地方",
    author: "毛不易",
    image: "https://i.imgs.ovh/2023/10/04/V4g3X.jpeg",
  },
  {
    title: "すずめ feat.十明 (铃芽)",
    author: "RADWIMPS、十明",
    image: "https://i.imgs.ovh/2023/10/04/V4g3X.jpeg",
  },
  {
    title: "青花",
    author: "周传雄",
    image: "https://i.imgs.ovh/2023/10/04/V4g3X.jpeg",
  },
  {
    title: "记事本",
    author: "周传雄",
    image: "https://i.imgs.ovh/2023/10/04/V4g3X.jpeg",
  },
  {
    title: "弱水三千",
    author: "周传雄",
    image: "https://i.imgs.ovh/2023/10/04/V4g3X.jpeg",
  },
  {
    title: "关不上的窗",
    author: "周传雄",
    image: "https://i.imgs.ovh/2023/10/04/V4g3X.jpeg",
  },
  {
    title: "出卖",
    author: "周传雄",
    image: "https://i.imgs.ovh/2023/10/04/V4g3X.jpeg",
  },
  {
    title: "必杀技",
    author: "古巨基",
    image: "https://i.imgs.ovh/2023/10/04/V4g3X.jpeg",
  },
];

// 音乐音频
let audio = new Audio();
let musicIndex = 0;

function onloadMusic(url) {
  url = "/music/" + url + ".mp3";
  lrcIndex.value = 0;
  audio.src = url;
  audio.addEventListener("durationchange", () => {
    console.log(audio.duration);
  });
  audio.addEventListener("progress", (e) => {
    console.log(e);
  });
}

function musicPlay() {
  audio.play();
}

function musicPause() {
  audio.pause();
}

let playStatus = ref(false);
function changePlayStatus() {
  if (onloadLrcPercent.value == "100%") {
    if (playStatus.value) {
      musicPause();
      playStatus.value = false;
    } else {
      musicPlay();
      playStatus.value = true;
    }
  }
}

async function nextMusic() {
  if (playStatus.value) {
    changePlayStatus();
  }
  musicIndex++;
  const lrcBox = document.getElementById("lrc");
  if (lrcBox) {
    lrcBox.style.transform = "transformY(0)";
  }
  if (musicIndex == musicList.length) {
    musicIndex = 0;
  }
  await onloadAudio(musicList[musicIndex].title);
  changePlayStatus();
}

async function prevMusic() {
  if (playStatus.value) {
    changePlayStatus();
  }
  musicIndex--;
  const lrcBox = document.getElementById("lrc");
  if (lrcBox) {
    lrcBox.style.transform = "transformY(0)";
  }
  if (musicIndex == -1) {
    musicIndex = musicList.length - 1;
  }
  await onloadAudio(musicList[musicIndex].title);
  changePlayStatus();
}

let audioCurTime = ref(0);
let lrcIndex = ref(0);
audio.addEventListener("timeupdate", () => {
  audioCurTime.value = parseInt(audio.currentTime);
  const lrcBox = document.getElementById("lrc");
  if (
    lyrics.value.findIndex((item) => {
      return item.timestamp == audioCurTime.value;
    }) != -1
  ) {
    lrcIndex.value = lyrics.value.findIndex((item) => {
      return item.timestamp == audioCurTime.value;
    });
  }
  if (lrcIndex.value != -1 && lrcBox) {
    lrcBox.style.transform = "translateY(" + -24 * lrcIndex.value + "px)";
  }
});

audio.addEventListener("ended", () => {
  nextMusic();
});

onMounted(() => {
  onloadAudio(musicList[musicIndex].title);
});

let onloadLrcPercent = ref("0%");
async function onloadLrc(url) {
  lyrics.value = [];
  url = "/lrc/" + url + ".lrc";
  try {
    const response = await axios.get(url, {
      onDownloadProgress: (progressEvent) => {
        onloadLrcPercent.value =
          Math.round((progressEvent.loaded * 100) / progressEvent.total) + "%";
      },
    });
    parseLRC(response.data);
  } catch {
    return;
  }
}

/**
 * 加载音乐和歌词
 * @param {string} name 音乐名字
 */
async function onloadAudio(name) {
  await onloadMusic(name);
  await onloadLrc(name);
}

let lyrics = ref([]); // 歌词数组
function parseLRC(lrcText) {
  const lines = lrcText.split("\n");
  lines.forEach((line) => {
    const match = line.match(/\[(\d+:\d+\.\d+)\](.*)/);
    if (match) {
      const timestamp = parseInt(timeToSec(match[1]));
      const text = match[2];
      if (text) {
        lyrics.value.push({ timestamp, text });
      }
    }
  });
}

function timeToSec(time) {
  let matches = time.match(/(\d+):(\d+)\.(\d+)/);

  if (matches) {
    // 将提取的部分转换为数字
    var minutes = parseInt(matches[1]);
    var seconds = parseInt(matches[2]);
    var milliseconds = parseInt(matches[3]);

    // 将分钟和秒转换为总秒数
    var totalSeconds = minutes * 60 + seconds;

    // 添加毫秒部分
    totalSeconds += milliseconds / 1000;
    return totalSeconds;
  } else {
    console.log("无效的时间标记格式");
  }
}

// 修改歌词显示状态
let lrcIsOpen = ref(false);
function changeLrcStatus() {
  lrcIsOpen.value = !lrcIsOpen.value;
}

/**
 * 异步请求音频文件
 * 将音频文件转为blob的url赋给audio.src
 * @param {string} url 音频url
 */
// let onloadMusicPercent = ref("0%");
// async function onloadMusic(url) {
//   url = "/music/" + url + ".mp3";
//   lrcIndex.value = 0;
//   try {
//     const audioData = await axios.get(url, {
//       responseType: "blob",
//       // 加载进度
//       onDownloadProgress: (progressEvent) => {
//         onloadMusicPercent.value =
//           Math.round((progressEvent.loaded * 100) / progressEvent.total) + "%";
//         console.log(onloadMusicPercent.value);
//       },
//     });
//     if (audioData.status === 200) {
//       // 创建一个 Blob 对象
//       // const audioBlob = new Blob([audioData.data], { type: "audio/mpeg" });
//       audio.src = URL.createObjectURL(audioData.data);
//     } else {
//       throw new Error("Failed to fetch audio data");
//     }
//   } catch (error) {
//     console.error("Error loading audio:", error);
//     throw error;
//   }
// }
</script>

<style scoped>
@import "./index.css";
@import "/fonts/iconfont.css";
</style>
