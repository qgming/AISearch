<template>
  <NavBar @goToSetting="goToSetting" @goToAbout="goToAbout" @goToHome="goToHome" @goToAiSearch="goToAiSearch" />
  <div class="privacyContainer" :class="themeStore.theme">
    <div class="pageTitle" :class="themeStore.theme">隐私政策</div>
    <div class="privacyBox" :class="themeStore.theme">
      <p>欢迎使用<strong>极点AI搜索</strong>（以下简称“本网站”）。我们深知隐私对您的重要性，并致力于保护您的个人信息。</p>

      <h2>1. 信息收集</h2>
      <p>我们可能会收集以下类型的信息：</p>
      <ul>
        <li><strong>API密钥</strong>：保存在您的浏览器本地存储中，不会传输到我们的服务器或任何第三方。</li>
        <li><strong>使用数据</strong>：包括IP地址、浏览器类型、访问时间、页面浏览记录等。</li>
        <li><strong>API调用数据</strong>：临时处理您的API调用数据以返回查询结果，页面刷新或会话结束后自动删除。</li>
      </ul>

      <h2>2. 信息使用</h2>
      <p>我们可能会将收集到的信息用于以下目的：</p>
      <ul>
        <li>为您提供AI搜索功能</li>
        <li>改进我们的网站和服务</li>
        <li>遵守适用的法律法规</li>
      </ul>

      <h2>3. 信息安全</h2>
      <p>我们采取合理的技术和组织措施保护您的信息，但无法保证信息的绝对安全。</p>

      <h2>4. 您的权利</h2>
      <p>根据适用法律，您可能拥有以下权利：</p>
      <ul>
        <li>访问和更正您的个人信息</li>
        <li>要求删除您的个人信息</li>
        <li>限制对您个人信息的使用</li>
        <li>将您的个人信息转移给另一个组织</li>
        <li>反对我们处理您的个人信息</li>
      </ul>
      <p>如您希望行使上述权利，请联系：<a href="mailto:qgming@qq.com">qgming@qq.com</a></p>

      <h2>5. 隐私政策的变更</h2>
      <p>我们可能会不时更新本隐私政策。任何更改将在本页面上发布，并在生效日期生效。</p>

      <p>最后更新日期：2024年12月31日</p>
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
/* 隐私政策页面容器样式 */
.privacyContainer {
  padding: 0 0 50px 50px;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

/* 页面标题样式 */
.pageTitle {
  font-size: 24px;
  height: 50px;
  text-align: left;
  line-height: 50px;
  padding-left: 20px;
}

/* 隐私盒子样式 */
.privacyBox {
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

/* 顶部名称样式 */
.topName {
  font-weight: bold;
  font-size: large;
  font-family: 'PingFang SC', sans-serif;
}

/* 隐私项样式 */
.privacyItem {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 内容样式 */
.content {
  font-size: 16px;
  color: #333;
}

/* 浅色模式样式 */
.privacyContainer.light {
  background-color: #ffffff;
  color: #000000;
}

.pageTitle.light {
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  color: #000000;
}

/* 深色模式样式 */
.privacyContainer.dark {
  background-color: #121212;
  color: #ffffff;
}

.pageTitle.dark {
  background-color: #121212;
}

.privacyBox.dark {
  background-color: #333;
  border: 1px solid #333;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .privacyContainer {
    padding: 10px 10px 60px 10px;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .privacyBox {
    width: 100%;
  }

  .pageTitle {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    padding-left: 0;
  }

  .topName {
    font-size: medium;
  }

  .content {
    font-size: 14px;
  }
}
</style>