<template>
  <header :class="themeStore.theme">
    <ul class="nav-list">
      <li class="dark" @click="themeStore.toggleTheme"><img :class="themeStore.theme" src="/src/assets/dark.svg" alt=""></li>
      <li class="ai" @click="$emit('goToAiSearch')"><img :class="themeStore.theme" src="/src/assets/send.svg" alt=""></li>
      <li class="home" @click="$emit('goToHome')"><img :class="themeStore.theme" src="/src/assets/home.svg" alt=""></li>
      <li class="about" @click="$emit('goToAbout')"><img :class="themeStore.theme" src="/src/assets/about.svg" alt=""></li>
      <li class="setting" @click="$emit('goToSetting')"><img :class="themeStore.theme" src="/src/assets/setting.svg" alt=""></li>
    </ul>
  </header>
</template>

<script setup>
import { useThemeStore } from '../store/theme';
const themeStore = useThemeStore();
</script>

<style scoped>
header {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 50px;
  /* background-color: #fafafa; */
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

li img.dark {
  color: #ffffff;
}

/* 浅色模式样式 */
header.light {
  background-color: #fafafa;
  border-right: 1px solid #ccc;
  /* color: #000000; */
}

.nav-list img.light {
    fill: white !important; /* 使用!important来确保样式优先级 */
}

.nav-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin-bottom: 15px;
  cursor: pointer;
}

li img {
  width: 24px;
  height: 24px;
}

@media (max-width: 648px) {
  header {
    position: fixed;
    bottom: 0;  /* 位置改为底部 */
    left: 0;
    height: 50px;
    width: 100%;
    border-top: 1px solid #ccc;  /* 顶部边框 */
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    z-index: 1000;
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .nav-list li {
    margin-bottom: 0;
  }

  li img {
    width: 20px;
    height: 20px;
  }
  .dark {
    display: none;
  }
  .about {
    display: none;
  }
}
</style>
