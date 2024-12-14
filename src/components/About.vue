<template>
    <NavBar @goToSetting="goToSetting" @goToAbout="goToAbout" @goToHome="goToHome" />
  <div class="aboutContainer">
    <h1>关于</h1>
    <div class="aboutBox">
      <img src="/src/assets/send.svg" alt="" class="logo">
      <p class="topName">极点AI搜索</p>
      <p>1.0.0（beta5）</p>
    </div>
    <div class="aboutBox">
      <div class="aboutItem">
        <div class="functionItem">
          <p class="function">联网搜索</p>
          <p class="function">深度思考</p>
        </div>
        <div class="functionItem">
          <p class="function">文字转图表</p>
          <p class="function">自定义大模型</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // 导入 useRouter
import NavBar from './NavBar.vue';

const router = useRouter(); // 获取 router 实例

const goToHome = () => {
  router.push('/');
};
const goToSetting = () => {
  router.push('/setting');
};
const goToAbout = () => {
  router.push('/about');
};

</script>

<style scoped>
.aboutContainer {
  padding: 10px;
  width: 100vw;
  max-width: 600px;
  height: 100vh;
}
.aboutBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 12px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  padding: 10px;
}

.logo {
  margin: 20px;
  width: 100px;
  height: 100px;
}

.topName {
  font-weight: bold;
  font-size: large;
  font-family: 'PingFang SC', sans-serif;
  /* 添加苹方字体 */
}

.aboutItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px 0;
}

.aboutItem p {
  font-size: 16px;
}

.functionItem {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.function {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f5fa;
  border-radius: 9px;
  height: 50px;
  width: 250px;
  padding: 5px;
  margin: 5px;
}

.name {
  width: 50px;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .aboutBox {
    padding: 5px;
  }

  .logo {
    margin: 10px;
    width: 80px;
    height: 80px;
  }

  .topName {
    font-size: medium;
  }

  .aboutItem p {
    font-size: 14px;
  }

  .function {
    width: 100px;
  }

  .name {
    width: 40px;
  }
}
</style>