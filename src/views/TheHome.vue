<template>
  <div :class="['home', themeStore.theme, bingbgStore.bingbg]">
    <NavBar @goToSetting="goToSetting" @goToAbout="goToAbout" @goToAiSearch="goToAiSearch" />
    <main :class="bingbgStore.bingbg">
      <div class="logo" :class="bingbgStore.bingbg">
        <img src="/src/assets/send.svg" alt="Google Logo">
      </div>
      <div class="searchBar" :class="[bingbgStore.bingbg, themeStore.theme]">
        <img src="/src/assets/searchH.svg" alt="搜索输入框">
        <input :class="[bingbgStore.bingbg, themeStore.theme]" class="searchInput" type="text" v-model="searchQuery" @keydown="handleKeydown" placeholder="">
      </div>
      <div class="buttons" :class="[bingbgStore.bingbg, themeStore.theme]">
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
import NavBar from '../components/NavBar.vue';
import { useThemeStore } from '../store/theme';
import { useBingbgStore } from '@/store/bingbg';

const themeStore = useThemeStore();
const bingbgStore = useBingbgStore();
const router = useRouter();
const searchQuery = ref('');

const goToSearch = () => {
  router.push({ path: '/search', query: { q: searchQuery.value } });
};

const handleKeydown = (event) => {
  if (event.key === 'Enter') {
    searchBing();
  } else if (event.key === 'q' && event.ctrlKey) {
    goToSearch();
  } else if (event.key === 'g' && event.ctrlKey) {
    searchGoogle();
  }
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
  background-color: #f4f5fa;
  transition: background-color 0.3s ease, background-image 0.3s ease;
}

.home.bingImg {
  background-image: url("https://bing.ee123.net/img/rand");
  background-size: cover;
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

.logo.bingImg{
  display: none;
}

.buttons.bingImg {
  display: none;
}

.searchBar {
  margin-top: 20px;
  width: 600px;
  border-radius: 12px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.5s ease,transform 0.3s ease;
}

.searchBar.bingImg {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(7px);
}

.searchBar.dark.bingImg {
  background-color: rgba(128, 128, 128, 0.2);
  backdrop-filter: blur(7px);
}

.searchInput.bingImg {
  background-color: transparent;
  color: #000;
}

.searchBar:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  transform: scale(1.01);
}

.searchBar img {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  margin-right: 2px;
}

.searchInput {
  width: 100%;
  max-width: 600px;
  border-radius: 9px;
  font-size: 18px;
  padding: 8px;
  background-color: transparent;
  color: #000000;
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
  /* border: none; */
  border-radius: 4px;
  cursor: pointer;
  background-color: #f8f9fa;
  color: #000000;
  border: 2px solid #f8f9fa;
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
    width: 90vw;
    padding: 10px;
  }

  .buttons button {
    width: 95%;
  }
}

/* 深色模式样式 */
.home.dark {
  background-color: #121212;
  color: #ffffff;
}

.searchBar.dark {
  background-color: #333;
  color: #ffffff;
}

.searchInput.dark {
  color: #ffffff;
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
</style>