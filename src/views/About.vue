<template>
  <NavBar @goToSetting="goToSetting" @goToAbout="goToAbout" @goToHome="goToHome" />
  <div class="aboutContainer">
    <div class="pageTitle">关于</div>
    <div class="aboutBox logoBox">
      <img src="/src/assets/send.svg" alt="" class="logo">
      <p class="topName">极点AI搜索</p>
      <p>1.0.0</p>
      <p>beta7</p>
    </div>
    <div class="aboutBox">
      <div class="aboutItem">
        <div class="functionItem">
          <p class="function">🔍 联网搜索</p>
        </div>
        <div class="functionItem">
          <p class="function">💡 深度思考</p>
        </div>
        <div class="functionItem">
          <p class="function">📊 文字转图表</p>
        </div>
        <div class="functionItem">
          <p class="function">🔧 自定义大模型</p>
        </div>
      </div>
    </div>
    <div class="aboutBox">
     <div class="contactInfo">
      <p>联系方式:</p>
      <p>邮箱: qgming@qq.com</p>
     </div>
     <div class="copyright">
      <p> 2024 极点AI搜索. 保留所有权利。</p>
     </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // 导入 useRouter
import NavBar from '../components/NavBar.vue';

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
  padding: 0 0 50px 50px;
  width: 100vw;
  height: 100vh;
}

.pageTitle {
  font-size: 24px;
  height: 50px;
  border-bottom: 1px solid #ddd;
  background-color: #ffffff;
  text-align: left;
  line-height: 50px;
  padding-left: 20px;
}

.aboutBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  width: 50%;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 9px;
  box-sizing: border-box;
}

.logoBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
}

.aboutItem {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.functionItem {
  background-color: #f9f9f9;
  padding: 15px;
  transition: background-color 0.3s;
}

.functionItem:hover {
  background-color: #e0e0e0;
}

.function {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.contactInfo {
  font-size: 14px;
  color: #666;
}

.copyright {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .aboutContainer {
    padding: 10px;
  }

  .aboutBox {
    width: 100%;
  }

  .pageTitle {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    padding-left: 0;
  }

  .logo {
    margin: 10px;
    width: 80px;
    height: 80px;
  }

  .topName {
    font-size: medium;
  }

  .contactInfo {
    font-size: 12px;
  }

  .copyright {
    font-size: 10px;
  }
}
</style>