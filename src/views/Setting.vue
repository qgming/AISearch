<template>
    <NavBar @goToSetting="goToSetting" @goToAbout="goToAbout" @goToHome="goToHome" />
  <div class="settingsContainer">
    <h1>设置</h1>
    <p>大模型<span>支持OpenAI格式</span></p>
    <div class="settingBox">
      <div class="settingItem">
        <p>服务商</p>
        <input type="text" placeholder="请输入服务商" v-model="largeModel.provider" />
      </div>
      <div class="settingItem">
        <p>Key</p>
        <input type="password" placeholder="请输入Key" v-model="largeModel.key" />
      </div>
      <div class="settingItem">
        <p>模型</p>
        <input type="text" placeholder="请输入模型" v-model="largeModel.model" />
      </div>
      <div class="rightOption">
        <button @click="saveLargeModel">添加到备选</button>
        <button @click="applyLargeModel">确定</button>
      </div>
    </div>
    <div class="settingBox">
      <p>默认使用智谱AI（glm-4-flash），由<a href="https://open.bigmodel.cn/" target="_blank">智谱AI</a>提供免费服务</p>
    </div>
    <p>备选大模型</p>
    <div class="settingBox">
      <div v-for="(model, index) in otherLargeModels" :key="index" class="otherModel">
        <div class="modelList">
          <div class="aModel">
            <p>模型</p>
            <p>{{ model.model }}</p>
          </div>
          <div class="aModel">
            <p>服务商</p>
            <p>{{ model.provider }}</p>
          </div>
        </div>
        <div class="otherModelButton">
          <button @click="deleteLargeModel(index)">删除</button>
          <button @click="fillLargeModel(model)">选择</button>
        </div>
      </div>
    </div>
    <p>网络搜索</p>
    <div class="settingBox">
      <div class="settingItem">
        <p>Key</p>
        <input type="text" placeholder="请输入Key" v-model="webSearch.key" />
      </div>
      <div class="rightOption">
        <button @click="saveWebSearch">确定</button>
      </div>
    </div>
    <div class="settingBox">
      <p>默认无网络搜索服务，请配置<a href="https://serper.dev/" target="_blank">Serper</a>谷歌搜索API</p>
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
  ElMessage.info('已填充，请确定');
};

const saveWebSearch = () => {
  localStorage.setItem('webSearch', JSON.stringify(webSearch.value));
  ElMessage.success('已保存');
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
  padding: 10px;
  width: 100vw;
  max-width: 600px;
  height: 100vh;
}

span {
  font-size: 12px;
  margin-left: 10px;
  color: #b2afaf;
}

a {
  text-decoration: none;
}

.settingBox {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-radius: 12px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

.rightOption {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.rightOption button {
  margin-top: 10px;
  margin-left: 10px;
  padding: 5px;
  width: 100px;
  border: none;
  background-color: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid #ccc;
  transition: border-color 0.3s ease;
}

.rightOption button:hover {
  border: 2px solid #91CAE8;
}


.settingItem {
  padding: 5px 0;
  border-bottom: 1px solid #e0e0e0;
  flex-wrap: wrap;
}

.settingItem p {
  width: 100%;
  margin-bottom: 5px;
  font-size: 16px;
}

.settingItem input {
  width: 100%;
  font-size: 14px;
  outline: none;
  color: gray;
  border: none;
}

.aModel {
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
}

.otherModel {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
}

.modelList {
  width: 100%;
  background-color: #f8f9fa;
  padding: 5px;
  margin-top: 5px;
  border-radius: 9px;
  border: 1px solid #e0e0e0
}

.otherModelButton {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}

.otherModelButton button {
  margin-top: 10px;
  margin-left: 5px;
  margin-bottom: 5px;
  padding: 5px;
  width: 100px;
  border: none;
  background-color: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid #e0e0e0;
  transition: border-color 0.3s ease;
}

.otherModelButton button:hover {
  border: 2px solid #91CAE8;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .settingsContainer {
    width: 100vw;
  }

  .settingBox {
    padding: 5px;
  }

  .settingItem p {
    font-size: 14px;
  }

  .settingItem input {
    width: 100%;
    font-size: 12px;
  }

  .rightOption button,
  .otherModelButton button {
    width: 80px;
    font-size: 12px;
  }

  .modelList,
  .aModel {
    font-size: 14px;
    box-sizing: border-box;
    /* 确保内边距不会导致宽度超出 */
  }
}
</style>