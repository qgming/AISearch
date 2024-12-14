<template>
  <div class="home">
    <NavBar @goToSetting="goToSetting" @goToAbout="goToAbout" />
    <main>
      <div class="logo">
        <img src="/src/assets/send.svg" alt="Google Logo">
      </div>
      <div class="searchBar">
        <img src="/src/assets/searchH.svg" alt="搜索输入框">
        <input type="text" v-model="searchQuery" @keydown.enter="searchBing" placeholder="">
      </div>
      <div class="buttons">
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

const router = useRouter();
const searchQuery = ref('');

const goToSearch = () => {
  router.push({ path: '/search', query: { q: searchQuery.value } });
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
  background-color: white;
  border-radius: 12px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 增加阴影 */
  transition: box-shadow 0.3s ease;
  /* 增加鼠标划过动画 */
}

.searchBar:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  /* 鼠标划过时增加阴影 */
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


.searchIcons {
  display: flex;
  text-align: center;
  justify-content: center;
  padding: 2px;
  background-color: #f5f5f5;
}

.searchIcons img {
  width: 30px;
  height: 30px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  /* 允许按钮换行 */
  justify-content: center;
  /* 居中对齐按钮 */
}

.buttons button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  background-color: #f8f9fa;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid #f8f9fa;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.buttons button:hover {
  border: 2px solid #91CAE8;
  background-color: #e2f0f9;
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
    /* 使按钮占据整个宽度 */
  }
}
</style>