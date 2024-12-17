<template>
  <NavBar @goToSetting="goToSetting" @goToAbout="goToAbout" @goToHome="goToHome" @goToAiSearch="goToAiSearch" />
  <div class="aboutContainer" :class="themeStore.theme">
    <div class="pageTitle" :class="themeStore.theme">关于</div>
    <div class="aboutBox logoBox" :class="themeStore.theme">
      <img src="/src/assets/send.svg" alt="" class="logo">
      <p class="topName">极点AI搜索</p>
      <p>1.0.0</p>
      <p>beta11</p>
    </div>
    <div class="aboutBox" :class="themeStore.theme">
      <div class="aboutItem">
        <div class="functionItem" :class="themeStore.theme">
          <p class="function" :class="themeStore.theme">🔍 联网搜索</p>
        </div>
        <div class="functionItem" :class="themeStore.theme">
          <p class="function" :class="themeStore.theme">💡 深度思考</p>
        </div>
        <div class="functionItem" :class="themeStore.theme">
          <p class="function" :class="themeStore.theme">📊 文字转图表</p>
        </div>
        <div class="functionItem" :class="themeStore.theme">
          <p class="function" :class="themeStore.theme">🔧 自定义大模型</p>
        </div>
      </div>
    </div>
    <div class="aboutBox" :class="themeStore.theme">
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
import { useThemeStore } from '../store/theme';
const themeStore = useThemeStore();

const router = useRouter(); // 获取 router 实例

// 导航到首页
const goToHome = () => {
  router.push('/');
};
// 导航到设置页面
const goToSetting = () => {
  router.push('/setting');
};
// 导航到关于页面
const goToAbout = () => {
  router.push('/about');
};
// 导航到AI搜索页面
const goToAiSearch = () => {
  router.push('/search');
};
</script>

<style scoped>
/* 关于页面容器样式 */
.aboutContainer {
  padding: 0 0 50px 50px;
  width: 100vw;
  height: 100vh;
}

/* 页面标题样式 */
.pageTitle {
  font-size: 24px;
  height: 50px;
  text-align: left;
  line-height: 50px;
  padding-left: 20px;
}

/* 关于盒子样式 */
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

/* Logo盒子样式 */
.logoBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Logo样式 */
.logo {
  margin: 20px;
  width: 100px;
  height: 100px;
}

/* 顶部名称样式 */
.topName {
  font-weight: bold;
  font-size: large;
  font-family: 'PingFang SC', sans-serif;
}

/* 关于项样式 */
.aboutItem {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 功能项样式 */
.functionItem {
  background-color: #f9f9f9;
  padding: 15px;
}

/* 功能项悬停样式 */
.functionItem:hover {
  background-color: #e0e0e0;
}

/* 功能样式 */
.function {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

/* 联系方式样式 */
.contactInfo {
  font-size: 14px;
  color: #666;
}

/* 版权信息样式 */
.copyright {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}

/* 浅色模式样式 */
.aboutContainer.light {
  background-color: #ffffff;
  color: #000000;
}

.pageTitle.light {
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  color: #000000;
}

/* 深色模式样式 */
.aboutContainer.dark {
  background-color: #121212;
  color: #ffffff;
}

.pageTitle.dark {
  background-color: #121212;
}

.aboutBox.dark {
  background-color: #333;
  border: 1px solid #333;
}

.functionItem.dark {
  background-color: #333;
}

.function.dark {
  color: #ffffff;
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