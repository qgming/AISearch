<template>
  <div class="settingsContainer">
    <img class="bankHome" @click="goToHome" src="/src/assets/bankbutton.svg" alt="返回">
    <h1>设置</h1>
    <p>大模型<span>支持OpenAI格式</span></p>
    <div class="settingBox">
      <div class="settingItem">
        <p>服务商</p>
        <input type="text" placeholder="请输入服务商" v-model="largeModel.provider" />
      </div>
      <div class="settingItem">
        <p>Key</p>
        <input type="text" placeholder="请输入Key" v-model="largeModel.key" />
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
    <p>网络搜索<span>支持<a href="https://serper.dev/" target="_blank">Serper</a>谷歌搜索服务</span></p>
    <div class="settingBox">
      <div class="settingItem">
        <p>Key</p>
        <input type="text" placeholder="请输入Key" v-model="webSearch.key" />
      </div>
      <div class="rightOption">
        <button @click="saveWebSearch">确定</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'; // 导入 useRouter

const router = useRouter(); // 获取 router 实例

const goToHome = () => {
  router.push('/');
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
  width: 100%;
  max-width: 600px;
  height: 100vh;
}

.bankHome {
  width: 30px;
  height: 30px;
}

span {
  font-size: 12px;
  margin-left: 10px;
  color: #b2afaf;
}

span a {
  text-decoration: none;
}

.settingBox {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin: 5px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  padding: 10px;
  width: 600px;
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
  border: 2px solid #e0e0e0;
  transition: border-color 0.3s ease;
}

.rightOption button:hover {
  border: 2px solid #91CAE8;
}


.settingItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 5px;
  font-size: 14px;
  outline: none;
  color: gray;
  border: none;
}

.modelList {
  width: 100%;
  background-color: #f8f9fa;
  padding: 5px;
  margin: 2px;
  border-radius: 9px;
  border: 1px solid #e0e0e0
}

.aModel {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.otherModel {
  display: flex;
  justify-content: space-between;
  margin: 2px;
  flex-wrap: wrap;
}

.otherModelButton {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}

.otherModelButton button {
  margin: 2px;
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
  .settingBox {
    padding: 5px;
    width: 100%;
  }

  .settingItem p {
    font-size: 14px;
  }

  .settingItem input {
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
  }
}
</style>