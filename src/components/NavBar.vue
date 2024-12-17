<template>
  <header :class="[themeStore.theme,bingbgStore.bingbg]">
    <ul class="nav-list" :class="[themeStore.theme,bingbgStore.bingbg]">
      <li class="darkmodel" @click="themeStore.toggleTheme"><img :class="themeStore.theme" src="/src/assets/dark.svg"
          alt=""></li>
      <li class="ai" @click="$emit('goToAiSearch')"><img :class="themeStore.theme" src="/src/assets/send.svg" alt="">
      </li>
      <li class="home" @click="$emit('goToHome')"><img :class="themeStore.theme" src="/src/assets/home.svg" alt=""></li>
      <li class="about" @click="$emit('goToAbout')"><img :class="themeStore.theme" src="/src/assets/about.svg" alt="">
      </li>
      <li class="setting" @click="$emit('goToSetting')"><img :class="themeStore.theme" src="/src/assets/setting.svg"
          alt=""></li>
    </ul>
  </header>
</template>

<script setup>
// 引入主题存储
import { useThemeStore } from '../store/theme';
import { useBingbgStore } from '../store/bingbg';
const themeStore = useThemeStore();
const bingbgStore = useBingbgStore();
</script>

<style scoped>
/* 头部样式 */
header {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 50px;
  background-color: #fafafa;
  border-right: 1px solid #ccc;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
}

/* 深色模式样式 */
header.dark {
  background-color: #333;
  border-right: 1px solid #000;
  color: #ffffff;
}

header.bingImg {
  background-color: transparent;
  border: none;
}

li img.dark {
  color: #ffffff;
}

/* 导航列表样式 */
.nav-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-list.bingImg {
  padding: 6px;
  border-radius: 9px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(7px);
}

.nav-list.bingImg.dark {
  background-color: rgba(128, 128, 128, 0.3);
  backdrop-filter: blur(4px);
}

.nav-list li {
  margin: 10px 0px;
  cursor: pointer;
}

li img {
  width: 24px;
  height: 24px;
}

.nav-list.bingImg .about,
.nav-list.bingImg .darkmodel {
  display: none;
}

/* 媒体查询，小于648px时的样式 */
@media (max-width: 600px) {
  header {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    z-index: 1000;
  }

  header.dark {
    border-top: 1px solid #121212;
  }

  header.dark.bingImg {
    border-top: none;
  }

  .nav-list.bingImg {
   padding: 1px;
   border-radius: 40px;
   margin-bottom: 10px;
  }

  .nav-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  .nav-list li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 6px;
  }

  li img {
    width: 22px;
    height: 22px;
  }

  .nav-list .darkmodel,
  .nav-list .about {
    display: none;
  }

}
</style>