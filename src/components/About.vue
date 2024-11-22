<template>
  <div class="aboutContainer">
    <img class="bankHome" @click="goToHome" src="/src/assets/bankbutton.svg" alt="返回">
    <h1>关于</h1>
    <div class="aboutBox">
      <img src="/src/assets/logo.svg" alt="" class="logo">
      <p class="topName">极点AI搜索</p>
      <p>1.0.0</p>
    </div>
    <div class="aboutBox">
      <div class="aboutItem">
        <p class="name">版本</p>
        <p>1.0.0</p>
      </div>
      <div class="aboutItem">
        <p class="name">作者</p>
        <p>极点维度</p>
      </div>
      <div class="aboutItem">
        <p class="name">描述</p>
        <p>一款使用大模型技术的搜素引擎，支持联网搜索，深度思考，生成图表等功能。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // 导入 useRouter

const router = useRouter(); // 获取 router 实例

const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
.aboutContainer {
  padding: 10px;
  width: 100%;
  max-width: 600px;
  height: 100vh;
}

.bankHome {
  width: 30px;
  height: 30px;
}

.aboutBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin: 5px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
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
  padding: 5px 0;
  border-bottom: 1px solid #e0e0e0;
}

.aboutItem p {
  font-size: 16px;
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

  .name {
    width: 40px;
  }
}
</style>