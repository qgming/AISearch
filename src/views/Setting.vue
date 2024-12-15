<template>
    <NavBar @goToSetting="goToSetting" @goToAbout="goToAbout" @goToHome="goToHome" />
  <div class="settingsContainer">
    <div class="pageTitle">设置</div>
    <div class="settingBox">
      <p class="settingTitle">大模型</p>
      <div class="settingItem">
        <p class="settingLabel">服务商</p>
        <input type="text" placeholder="请输入服务商" v-model="largeModel.provider" />
      </div>
      <div class="settingItem">
        <p class="settingLabel">Key</p>
        <input type="password" placeholder="请输入Key" v-model="largeModel.key" />
      </div>
      <div class="settingItem">
        <p class="settingLabel">模型</p>
        <input type="text" placeholder="请输入模型" v-model="largeModel.model" />
      </div>
      <div class="rightOption">
        <button @click="saveLargeModel">添加到备选</button>
        <button @click="applyLargeModel">应用</button>
      </div>
      <p class="hintText">支持OpenAI格式，默认由<a href="https://open.bigmodel.cn/" target="_blank">智谱AI</a>（glm-4-flash）提供免费服务</p>
    </div>
    <div class="settingBox">
      <p class="settingTitle">备选模型</p>
      <div v-for="(model, index) in otherLargeModels" :key="index" class="otherModel">
        <div class="modelCard">
          <div class="modelInfo">
            <p class="modelLabel">模型</p>
            <p>{{ model.model }}</p>
            <p class="modelLabel">服务商</p>
            <p>{{ model.provider }}</p>
          </div>
          <div class="modelActions">
            <button class="new-button" @click="deleteLargeModel(index)">删除</button>
            <button class="new-button" @click="fillLargeModel(model)">选择</button>
          </div>
        </div>
      </div>
    </div> 
    <div class="settingBox">
      <p class="settingTitle">网络搜索</p>
      
      <div class="settingItem">
        <p class="settingLabel">Key</p>
        <input type="text" placeholder="请输入Key" v-model="webSearch.key" />
      </div>
      <div class="rightOption">
        <button @click="saveWebSearch">应用</button>
      </div>
      <p class="hintText">默认无网络搜索服务，请配置<a href="https://serper.dev/" target="_blank">Serper</a>谷歌搜索API</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
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

const largeModel = ref({
  provider: '',
  key: '',
  model: ''
});

const otherLargeModels = ref([]);

const webSearch = ref({
  key: ''
});

const saveLargeModel = () => {
  otherLargeModels.value.push({ ...largeModel.value });
  localStorage.setItem('otherLargeModels', JSON.stringify(otherLargeModels.value));
  ElMessage.success('已保存');
};

const deleteLargeModel = (index) => {
  otherLargeModels.value.splice(index, 1);
  localStorage.setItem('otherLargeModels', JSON.stringify(otherLargeModels.value));
  ElMessage.success('已删除');
};

const applyLargeModel = () => {
  localStorage.setItem('largeModel', JSON.stringify(largeModel.value));
  ElMessage.success('大模型已应用');
};

const fillLargeModel = (model) => {
  largeModel.value = { ...model };
  ElMessage.info('已填充，请应用');
};

const saveWebSearch = () => {
  localStorage.setItem('webSearch', JSON.stringify(webSearch.value));
  ElMessage.success('已应用');
};

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
});
</script>

<style scoped>
.settingsContainer {
  padding: 0 0 50px 50px;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

.pageTitle {
  font-size: 24px;
  height: 50px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  line-height: 50px;
  padding-left: 20px;
}

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

a {
  color: #91CAE8;
  text-decoration: none;
}

.settingTitle {
  font-size: 20px;
  margin-bottom: 5px;
}

.hintText {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}

.settingItem {
  padding: 5px 0 0 0;
}

.settingLabel {
  margin-bottom: 5px;
}

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

.settingItem input::placeholder {
  color: #ccc;
  opacity: 1; /* Firefox */
}

.settingItem input:focus {
  border-color: #aaa;
}

.rightOption {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

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

.rightOption button:hover {
  background-color: #e0e0e0;
}

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

.modelInfo {
  flex: 1;
}

.modelActions {
  display: flex;
  justify-content: flex-end;
}

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

.modelActions .new-button:hover {
  background-color: #e0e0e0;
}

.modelLabel {
  margin-bottom: 5px;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .settingsContainer {
    padding: 10px;
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