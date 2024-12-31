<template>
  <NavBar @goToSetting="goToSetting" @goToAbout="goToAbout" @goToHome="goToHome" @goToAiSearch="goToAiSearch" />
  <div class="settingsContainer" :class="themeStore.theme">
    <div class="pageTitle" :class="themeStore.theme">设置</div>
    <div class="settingBox switchBox" :class="themeStore.theme">
      <p>深色模式</p>
      <el-switch v-model="darkmodel" @change="themeStore.toggleTheme" />
    </div>
    <div class="settingBox switchBox" :class="themeStore.theme">
      <p>简化模式</p>
      <el-switch v-model="bingImg" @change="bingbgStore.setBingbg" />
    </div>
    <div class="settingBox" :class="themeStore.theme">
      <p class="settingTitle">大模型</p>
      <div class="settingItem">
        <p class="settingLabel">服务商</p>
        <input :class="themeStore.theme" type="text" placeholder="请输入服务商" v-model="largeModel.provider" />
      </div>
      <div class="settingItem">
        <p class="settingLabel">Key</p>
        <input :class="themeStore.theme" type="password" placeholder="请输入Key" v-model="largeModel.key" />
      </div>
      <div class="settingItem">
        <p class="settingLabel">模型</p>
        <input :class="themeStore.theme" type="text" placeholder="请输入模型" v-model="largeModel.model" />
      </div>
      <div class="rightOption">
        <button :class="themeStore.theme" @click="saveLargeModel">添加到备选</button>
        <button :class="themeStore.theme" @click="applyLargeModel">应用</button>
      </div>
      <p class="hintText">支持OpenAI格式，默认由<a href="https://open.bigmodel.cn/" target="_blank">智谱AI</a>（glm-4-flash）提供免费服务
      </p>
    </div>
    <div class="settingBox" :class="themeStore.theme">
      <p class="settingTitle">备选模型</p>
      <div v-for="(model, index) in otherLargeModels" :key="index" class="otherModel">
        <div class="modelCard" :class="themeStore.theme">
          <div class="modelInfo">
            <p class="modelLabel">模型</p>
            <p>{{ model.model }}</p>
            <p class="modelLabel">服务商</p>
            <p>{{ model.provider }}</p>
          </div>
          <div class="modelActions">
            <button :class="themeStore.theme" class="new-button" @click="deleteLargeModel(index)">删除</button>
            <button :class="themeStore.theme" class="new-button" @click="fillLargeModel(model)">选择</button>
          </div>
        </div>
      </div>
    </div>
    <div class="settingBox" :class="themeStore.theme">
      <p class="settingTitle">网络搜索</p>

      <div class="settingItem">
        <p class="settingLabel">Key</p>
        <input :class="themeStore.theme" type="text" placeholder="请输入Key" v-model="webSearch.key" />
      </div>
      <div class="rightOption">
        <button :class="themeStore.theme" @click="saveWebSearch">应用</button>
      </div>
      <p class="hintText">默认无网络搜索服务，请配置<a href="https://serper.dev/" target="_blank">Serper</a>谷歌搜索API</p>
    </div>
    <div class="settingBox" :class="themeStore.theme">
      <p class="settingTitle">说明</p>
      <p class="hintText">输入框输入搜索关键词，点击Enter即可普通引擎搜索（默认Bing搜索），使用组合键Ctrl+Q切换到AI搜索<br>使用联网搜索功能需要按照提示配置API</p>
    </div>
    <div class="settingBox" :class="themeStore.theme" @click="goToAbout">
      <p class="settingTitle">关于极点AI搜索</p>
    </div>
    <div class="settingBox" :class="themeStore.theme" @click="goToPrivacy">
      <p class="settingTitle">隐私政策</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElSwitch } from 'element-plus';
import { useRouter } from 'vue-router'; // 导入 useRouter
import NavBar from '../components/NavBar.vue';
import { useThemeStore } from '../store/theme';
import { useBingbgStore } from '../store/bingbg';

const darkmodel = ref(false);
const bingImg = ref(false);

// 获取 themeStore 实例
const themeStore = useThemeStore();

// 获取 bingbgStore 实例
const bingbgStore = useBingbgStore();

// 获取 router 实例
const router = useRouter();

// 导航函数
const goToHome = () => {
  router.push('/');
};
const goToSetting = () => {
  router.push('/setting');
};
const goToAbout = () => {
  router.push('/about');
};
const goToAiSearch = () => {
  router.push('/search');
};
// 导航到隐私政策
const goToPrivacy = () => {
  router.push('/privacy');
};

// 大模型相关数据
const largeModel = ref({
  provider: '',
  key: '',
  model: ''
});

const otherLargeModels = ref([]);

// 网络搜索相关数据
const webSearch = ref({
  key: ''
});

// 保存大模型到备选
const saveLargeModel = () => {
  otherLargeModels.value.push({ ...largeModel.value });
  localStorage.setItem('otherLargeModels', JSON.stringify(otherLargeModels.value));
  ElMessage.success('已保存');
};

// 删除备选大模型
const deleteLargeModel = (index) => {
  otherLargeModels.value.splice(index, 1);
  localStorage.setItem('otherLargeModels', JSON.stringify(otherLargeModels.value));
  ElMessage.success('已删除');
};

// 应用大模型
const applyLargeModel = () => {
  localStorage.setItem('largeModel', JSON.stringify(largeModel.value));
  ElMessage.success('大模型已应用');
};

// 填充大模型
const fillLargeModel = (model) => {
  largeModel.value = { ...model };
  ElMessage.info('已填充，请应用');
};

// 保存网络搜索配置
const saveWebSearch = () => {
  localStorage.setItem('webSearch', JSON.stringify(webSearch.value));
  ElMessage.success('已应用');
};

// 组件挂载时初始化数据
onMounted(() => {
  const savedLargeModel = localStorage.getItem('largeModel');
  if (savedLargeModel) {
    largeModel.value = JSON.parse(savedLargeModel);
  }

  const savedOtherLargeModels = localStorage.getItem('otherLargeModels');
  if (savedOtherLargeModels) {
    otherLargeModels.value = JSON.parse(savedOtherLargeModels);
  }

  const savedWebSearch = localStorage.getItem('webSearch');
  if (savedWebSearch) {
    webSearch.value = JSON.parse(savedWebSearch);
  }

  darkmodel.value = themeStore.theme === 'dark';

  // const savedBingbg = localStorage.getItem('bingbg');
  // if (savedBingbg) {
  //   bingImg.value = savedBingbg === 'NoBingImg' ? false : true;
  // }
  bingImg.value = bingbgStore.bingbg === 'bingImg';
});
</script>

<style scoped>
/* 设置容器样式 */
.settingsContainer {
  padding: 0 0 50px 50px;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

/* 页面标题样式 */
.pageTitle {
  font-size: 24px;
  height: 50px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  line-height: 50px;
  padding-left: 20px;
}

/* 设置框样式 */
.settingBox {
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

.switchBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

/* 链接样式 */
a {
  color: #91CAE8;
  text-decoration: none;
}

/* 设置标题样式 */
.settingTitle {
  font-size: 20px;
  margin-bottom: 5px;
}

/* 提示文本样式 */
.hintText {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}

/* 设置项样式 */
.settingItem {
  padding: 5px 0 0 0;
}

/* 设置标签样式 */
.settingLabel {
  margin-bottom: 5px;
}

/* 设置项输入框样式 */
.settingItem input {
  width: 100%;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
  outline: none;
  transition: border-color 0.3s;
  color: #333;
}

/* 设置项输入框占位符样式 */
.settingItem input::placeholder {
  color: #ccc;
  opacity: 1;
  /* Firefox */
}

/* 设置项输入框聚焦样式 */
.settingItem input:focus {
  border-color: #aaa;
}

/* 右侧选项样式 */
.rightOption {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

/* 右侧选项按钮样式 */
.rightOption button {
  padding: 8px 12px;
  border: none;
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 9px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  margin-left: 10px;
}

/* 右侧选项按钮悬停样式 */
.rightOption button:hover {
  background-color: #e0e0e0;
}

/* 模型卡片样式 */
.modelCard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 9px;
  background-color: #f8f9fa;
  /* border: 1px solid #ccc; */
  margin-bottom: 5px;
}

/* 模型信息样式 */
.modelInfo {
  flex: 1;
}

/* 模型操作样式 */
.modelActions {
  display: flex;
  justify-content: flex-end;
}

/* 模型操作按钮样式 */
.modelActions .new-button {
  padding: 8px 12px;
  border: none;
  background-color: #f8f9fa;
  border-radius: 9px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  margin-left: 10px;
  border: #ccc 1px solid;
}

/* 模型操作按钮悬停样式 */
.modelActions .new-button:hover {
  background-color: #e0e0e0;
}

/* 模型标签样式 */
.modelLabel {
  margin-bottom: 5px;
}

/* 深色模式样式 */
.settingsContainer.dark {
  background-color: #121212;
  color: #ffffff;
}

.pageTitle.dark {
  border-bottom: 1px solid #121212;
}

.settingBox.dark {
  background-color: #333;
  border: 1px solid #333;
}

.settingBox input.dark {
  background-color: #333;
  color: #ffffff
}

.rightOption button.dark {
  background-color: #000000;
  border: 1px solid #000000;
}

.modelCard.dark {
  background-color: #000000;
  border: 1px solid #000000;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .settingsContainer {
    padding: 10px 10px 60px 10px;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .pageTitle {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    padding-left: 0px;
  }

  .settingBox {
    width: 100%;
    margin-top: 10px;
  }

  .settingItem {
    padding: 10px 0;
  }

  .settingItem input {
    font-size: 14px;
  }

  .rightOption button {
    font-size: 14px;
    padding: 10px;
  }
}
</style>