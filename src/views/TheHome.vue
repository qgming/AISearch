<template>
  <div :class="['home', themeStore.theme]">
    <NavBar @goToSetting="goToSetting" @goToAbout="goToAbout" @goToAiSearch="goToAiSearch" />
    <main>
      <div class="logo">
        <img src="/src/assets/send.svg" alt="Google Logo">
      </div>
      <div class="searchBar" :class="themeStore.theme">
        <img src="/src/assets/searchH.svg" alt="搜索输入框">
        <input :class="themeStore.theme"  type="text" v-model="searchQuery" @keydown.enter="searchBing" placeholder="">
      </div>
      <div class="buttons" :class="themeStore.theme">
        <button @click="searchBing">必应搜索</button>
        <button @click="searchGoogle">Google 搜索</button>
        <button @click="goToSearch">AI搜索</button>
      </div>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '../components/NavBar.vue'; // 引入NavBar组件
import { useThemeStore } from '../store/theme';

const themeStore = useThemeStore();
const router = useRouter();
const searchQuery = ref('');

const goToSearch = () => {
  router.push({ path: '/search', query: { q: searchQuery.value } });
};

const goToAiSearch = () => {
  router.push('/search');
};

const goToSetting = () => {
  router.push('/setting');
};
const goToAbout = () => {
  router.push('/about');
};

const searchBing = () => {
  const query = encodeURIComponent(searchQuery.value);
  window.open(`https://www.bing.com/search?q=${query}`, '_blank');
};

const searchGoogle = () => {
  const query = encodeURIComponent(searchQuery.value);
  window.open(`https://www.google.com/search?q=${query}`, '_blank');
};

</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
  transition: background-color 0.3s ease;
}

main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10%;
  padding: 5px;
}

.logo img {
  width: 100px;
}

.searchBar {
  margin-top: 20px;
  width: 600px;
  border-radius: 12px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.searchBar:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.searchBar img {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  margin-right: 2px;
}

.searchBar input {
  width: 100%;
  max-width: 600px;
  border-radius: 9px;
  font-size: 18px;
  padding: 8px;
  border: none;
  outline: none;
}

.buttons {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.buttons button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.buttons button:hover {
  border: 2px solid #91CAE8;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f2f2f2;
}

/* 移动端样式 */
@media (max-width: 648px) {
  .searchBar {
    margin-top: 20px;
    width: 90%;
    padding: 10px;
  }

  .buttons button {
    width: 95%;
  }
}

/* 浅色模式样式 */
.home.light {
  background-color: #f4f5fa;
  color: #000000;
}

/* 深色模式样式 */
.home.dark {
  background-color: #121212;
  color: #ffffff;
}

/* 搜索框样式 */
.searchBar.light {
  background-color: #ffffff;
  color: #000000;
}

.searchBar input.light {
  background-color: #ffffff;
  color: #000000;
}

.searchBar.dark {
  background-color: #333;
  color: #ffffff;
}

.searchBar input.dark {
  background-color: #333;
  color: #ffffff;
}

/* 按钮样式 */
.buttons.light button {
  background-color: #f8f9fa;
  color: #000000;
  border: 2px solid #f8f9fa;
}

.buttons.dark button {
  background-color: #333;
  color: #ffffff;
  border: 2px solid #333;
}

.buttons.dark button:hover {
  border: 2px solid #91CAE8;
  background-color: #444;
}

/* 响应系统深色模式 */
@media (prefers-color-scheme: dark) {
  .home:not(.light):not(.dark) {
    background-color: #000000;
    color: #ffffff;
  }
}
</style>