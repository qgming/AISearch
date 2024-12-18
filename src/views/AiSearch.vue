<template>
  <div class="main" :class="themeStore.theme">
    <NavBar @goToSetting="goToSetting" @goToAbout="goToAbout" @goToHome="goToHome" />
    <div class="container" :class="themeStore.theme">
      <p class="title">极点AI搜索</p>
      <div ref="messagesContainer" class="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" class="message" :class="themeStore.theme">
          <img class="roleIcon" :src="message.role === 'user' ? '../logo.svg' : '../send.svg'" alt="角色图标"
            style="width: 24px; height: 24px; margin-right: 5px;" />
          <div>
            <MdPreview class="md-preview" :class="themeStore.theme" :modelValue="message.content" />
            <div class="contentOption">
              <div class="optionButton" :class="themeStore.theme" @click="copyContent(message.content)"><img
                  src="/src/assets/copy.svg" alt="复制">
              </div>
              <div class="optionButton" :class="themeStore.theme" @click="sendToChart(message.content, index)"><img
                  src="/src/assets/chartbar.svg" alt="生成图表">
              </div>
            </div>
            <div v-if="chartContent && lastChartIndex === index" class="chart" :class="themeStore.theme">
              <MdPreview class="md-preview" :class="themeStore.theme" :modelValue="chartContent" />
              <div class="chartOption">
                <div class="optionButton" :class="themeStore.theme" @click="zoomChart"><img
                    src=" /src/assets/zoomOut.svg" alt="放大">
                </div>
                <div>
                  <p>极点&nbsp;AI&nbsp;图表</p>
                  <p class="powered">POWERED BY JDWDAI</p>
                </div>
                <div class="optionButton" :class="themeStore.theme" @click="saveAsImage"><img src=" /src/assets/cut.svg"
                    alt="保存图片">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="generatingChart" class="chart">
          <p>AI图表生成中...</p>
        </div>
        <div v-if="streaming" class="streaming" :class="themeStore.theme">
          <p>思考中...</p>
          <MdPreview class="md-preview" :class="themeStore.theme" :modelValue="assistantMessage" />
        </div>
      </div>
      <div class="searchBox" :class="themeStore.theme">
        <input class="inputField" v-model="userInput" :class="themeStore.theme" @keyup.enter="sendMessage"
          placeholder="输入问题..." />
        <div class="searchOption">
          <div class="rightOption">
            <div class="switchOption" :class="[{ 'active': onlineSwitch }, themeStore.theme]"
              @click="toggleOnlineSearch(!onlineSwitch)">
              <img src="/src/assets/online.svg" alt="">
              <p :class="themeStore.theme">联网搜索</p>
            </div>
            <div class="switchOption" :class="[{ 'active': deepThinkingSwitch }, themeStore.theme]"
              @click="toggleDeepThinking(!deepThinkingSwitch)">
              <img src="/src/assets/thinking.svg" alt="">
              <p :class="themeStore.theme">深度思考</p>
            </div>
          </div>
          <div class="rightOption">
            <div class="optionButton" :class="themeStore.theme" @click="refresh"><img src="/src/assets/refresh.svg"
                alt="刷新"></div>
            <div class="optionButton" :class="themeStore.theme" @click="stopConversation"><img
                src="/src/assets/stop.svg" alt="终止"></div>
            <div class="optionButton" :class="themeStore.theme" id="sendButton" @click="sendMessage"><img
                src="/src/assets/sendW.svg" alt="发送">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '../components/NavBar.vue';
import OpenAI from 'openai';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css';
import { useRoute, useRouter } from 'vue-router';
import Mermaid from 'mermaid';
import html2canvas from 'html2canvas';
import { useThemeStore } from '../store/theme';
const themeStore = useThemeStore();
const route = useRoute();
const router = useRouter();

const goToHome = () => {
  router.push('/');
};
const goToSetting = () => {
  router.push('/setting');
};
const goToAbout = () => {
  router.push('/about');
};

const messagesContainer = ref(null);
const messages = ref([]);
const userInput = ref('');
const assistantMessage = ref('');
const streaming = ref(false); // 新增流式输出标志

const onlineSwitch = ref(false); // 新增联网搜索开关
const deepThinkingSwitch = ref(false); // 新增深度思考

const prompt = ref('')
const chartPrompt = ref('')
const chartContent = ref('');
const lastChartIndex = ref(null); // 新增变量记录最后生成图表的消息索引
const generatingChart = ref(false); // 新增变量表示正在生成图表

// 默认API配置
const defaultApiKey = '03da359c49454d6734e2a5de8dbb9a37.kJEgAv0s4DdM9ti0';
const defaultApiProvider = 'https://open.bigmodel.cn/api/paas/v4/';
const defaultModel = 'glm-4-flash';

// 配置
const aiModel = ref('');
const aiKey = ref('');
const aiProvider = ref('');
const webKey = ref('');

// 大模型配置
const openai = new OpenAI({
  baseURL: aiProvider.value || defaultApiProvider,
  apiKey: aiKey.value || defaultApiKey,
  dangerouslyAllowBrowser: true
});

// 发送消息
async function sendMessage() {
  if (!userInput.value.trim()) {
    ElMessage({
      message: '请输入内容',
      type: 'warning'
    });
    return;
  }

  const userMessage = { role: "user", content: userInput.value };
  messages.value.push(userMessage);

  let response;
  if (onlineSwitch.value) {
    // 联网搜索
    const searchResponse = await searchOnline();
    try {
      response = await openai.chat.completions.create({
        messages: [
          { role: "system", content: prompt.value }, // 添加从本地获取的提示词
          ...messages.value,
          { role: "assistant", content: searchResponse }
        ],
        model: aiModel.value,
        stream: true,
      });
    } catch (error) {
      console.error('API 请求错误:', error);
      ElMessage({
        message: 'API 请求错误',
        type: 'error'
      });
      return;
    }
  } else {
    // 普通消息
    try {
      response = await openai.chat.completions.create({
        messages: [
          { role: "system", content: prompt.value }, // 添加从本地获取的提示词
          ...messages.value
        ],
        model: aiModel.value,
        stream: true,
      });
    } catch (error) {
      console.error('API 请求错误:', error);
      ElMessage({
        message: 'API 请求错误',
        type: 'error'
      });
      return;
    }
  }

  // 流式输出
  assistantMessage.value = '';
  streaming.value = true; // 开始流式输出
  for await (const chunk of response) {
    if (!streaming.value) break; // 检查是否终止对话
    assistantMessage.value += chunk.choices[0].delta.content || '';
    // scrollToBottom(); 
    // 自动滚动到底部
  }
  streaming.value = false; // 结束流式输出

  messages.value.push({ role: "assistant", content: assistantMessage.value });
  userInput.value = '';

  scrollToBottom();
  // 自动滚动到底部
}

// 联网搜索
async function searchOnline() {
  const searchQuery = userInput.value; // 使用用户输入的内容作为搜索词
  const apiKey = webKey.value; // API Key 变量

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(`https://google.serper.dev/search?q=${searchQuery}&gl=cn&hl=zh-cn&apiKey=${apiKey}`, requestOptions);
    if (!response.ok) {
      throw new Error('网络搜索请求失败');
    }
    const result = await response.json();

    // 提取内容
    const knowledgeGraph = result.knowledgeGraph;
    const answerBox = result.answerBox;
    const organic = result.organic;

    // 构建消息内容
    let messageContent = '';
    if (answerBox) {
      messageContent += `谷歌答案: ${JSON.stringify(answerBox)}\n`;
    }
    if (knowledgeGraph) {
      messageContent += `知识图谱: ${JSON.stringify(knowledgeGraph)}\n`;
    }
    if (organic) {
      const snippets = organic.map((result, index) =>
        `新闻${index + 1}.\n标题：${result.title}\n内容：${result.snippet}\n链接：${result.link}\n发布时间：${result.date}`
      ).join('\n');
      messageContent += `谷歌搜索结果: ${snippets}`;
    }
    console.log(result);
    console.log(messageContent);


    return messageContent;
  } catch (error) {
    console.error('网络搜索错误:', error);
    ElMessage({
      message: '网络搜索错误',
      type: 'error'
    });
    return ''; // 返回空字符串或错误信息
  }
}

// 切换联网搜索开关
function toggleOnlineSearch(value) {
  onlineSwitch.value = value; // 更新开关状态
  ElMessage({
    message: onlineSwitch.value ? '已开启联网搜索' : '已关闭联网搜索',
    type: onlineSwitch.value ? 'success' : 'warning'
  });
}

// 切换深度思考开关
function toggleDeepThinking(value) {
  deepThinkingSwitch.value = value; // 更新开关状态
  if (value) {
    readDeepThinkingPromptFile(); // 读取深度思考提示词
  } else {
    readPromptFile(); // 恢复默认提示词
  }
  ElMessage({
    message: deepThinkingSwitch.value ? '已开启深度思考' : '已关闭深度思考',
    type: deepThinkingSwitch.value ? 'success' : 'warning'
  });
}

// 读取深度思考提示词文件
async function readDeepThinkingPromptFile() {
  try {
    const response = await fetch('../deepThinkingPro.txt');
    if (!response.ok) {
      throw new Error('读取深度思考提示词失败');
    }
    const deepThinkingPrompt = await response.text();
    prompt.value = deepThinkingPrompt; // 使用 ref 更新 prompt 的值
  } catch (error) {
    console.error('读取深度思考提示词失败:', error);
  }
}

// 使用AI生成图表
async function sendToChart(content, index) {
  generatingChart.value = true; // 设置正在生成图表
  try {
    ElMessage({
      message: '正在生成图表...',
      type: 'info'
    });
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: chartPrompt.value },
      { role: "assistant", content: content }
      ],
      model: aiModel.value,
      stream: false,
    });

    const assistantContent = response.choices[0].message.content;
    chartContent.value = assistantContent; // 将图表内容存储在 chartContent 中
    lastChartIndex.value = index; // 记录最后生成图表的消息索引
    generatingChart.value = false; // 生成图表完成

    scrollToBottom(); // 自动滚动到底部
  } catch (error) {
    console.error('API 请求错误:', error);
    ElMessage({
      message: 'API请求错误,当前大模型不支持图表生成',
      type: 'error'
    });
    generatingChart.value = false; // 生成图表失败
  }
}

// 保存为图片
function saveAsImage() {
  // const chartElement = document.querySelector('.chart');
  const chartElement = document.querySelector('.md-editor-mermaid');

  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // 生成时间戳
      link.download = `jdai_${timestamp}.png`; // 使用时间戳命名文件
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

// 放大图表
function zoomChart() {
  // const chartElement = document.querySelector('.chart');
  const chartElement = document.querySelector('.chart');
  if (chartElement) {
    chartElement.classList.toggle('zoomed');
  }
}

// 读取提示词文件
async function readPromptFile() {
  try {
    const response = await fetch('../searchPro.txt');
    if (!response.ok) {
      throw new Error('读取搜索提示词失败');
    }
    const localPrompt = await response.text();
    prompt.value = localPrompt; // 使用 ref 更新 prompt 的值
  } catch (error) {
    console.error('读取搜索提示词失败:', error);
  }
}

// 新增读取 chart.txt 文件
async function readChartPromptFile() {
  try {
    const response = await fetch('../chart.txt');
    if (!response.ok) {
      throw new Error('读取图表提示词失败');
    }
    const chart = await response.text();
    // 假设你需要将 chartPrompt 存储在另一个 ref 中，例如 chartPromptRef
    chartPrompt.value = chart;
  } catch (error) {
    console.error('读取图表提示词失败:', error);
  }
}

// 终止对话
function stopConversation() {
  streaming.value = false;
}

// 自动滚动到底部
function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}

// 刷新方法
function refresh() {
  messages.value = []; // 清空消息列表
  assistantMessage.value = ''; // 清空助手消息
  chartContent.value = '';
  lastChartIndex.value = null;
  generatingChart.value = false;
}

// 复制内容到剪贴板
function copyContent(content) {
  navigator.clipboard.writeText(content).then(() => {
    ElMessage({
      message: '内容已复制到剪贴板',
      type: 'success'
    });
  }).catch(err => {
    console.error('复制失败:', err);
    ElMessage({
      message: '复制失败',
      type: 'error'
    });
  });
}

// 确保在需要的时候动态应用样式
function applyDynamicStyles() {
  document.querySelectorAll('.md-editor-preview-wrapper').forEach(el => {
    el.style.padding = '5px';
  });
}

// 使用 MutationObserver 监听 DOM 变化
function observeDOMChanges() {
  const observer = new MutationObserver(() => {
    applyDynamicStyles();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}


onMounted(() => {
  applyDynamicStyles(); // 应用动态样式
  observeDOMChanges(); // 监听 DOM 变化
  scrollToBottom(); // 组件挂载时滚动到底部
  readPromptFile(); // 调用读取提示词
  readChartPromptFile(); // 读取 chart 提示词

  //本地获取API配置信息
  const savedLargeModel = localStorage.getItem('largeModel');
  if (savedLargeModel) {
    const largeModelConfig = JSON.parse(savedLargeModel);
    aiModel.value = largeModelConfig.model || defaultModel; // 使用默认模型
    aiKey.value = largeModelConfig.key || defaultApiKey; // 使用默认API密钥
    aiProvider.value = largeModelConfig.provider || defaultApiProvider; // 使用默认API提供者
  } else {
    aiKey.value = defaultApiKey;
    aiProvider.value = defaultApiProvider;
    aiModel.value = defaultModel;
  }

  const savedWebSearch = localStorage.getItem('webSearch');
  if (savedWebSearch) {
    const webSearchConfig = JSON.parse(savedWebSearch);
    webKey.value = webSearchConfig.key;
  }
  // 确保配置加载完成后再初始化OpenAI实例
  if (aiModel.value && aiKey.value && aiProvider.value) {
    openai.baseURL = aiProvider.value;
    openai.apiKey = aiKey.value;
  }
  //接收参数
  if (route.query.q) {
    userInput.value = route.query.q;
    sendMessage();
  }

  // 从本地存储加载深度思考开关状态
  const savedDeepThinking = localStorage.getItem('deepThinkingSwitch');
  if (savedDeepThinking) {
    deepThinkingSwitch.value = JSON.parse(savedDeepThinking);
    if (deepThinkingSwitch.value) {
      readDeepThinkingPromptFile(); // 如果开启深度思考，读取深度思考提示词
    }
  }
});

// 保存深度思考开关状态到本地存储
window.addEventListener('beforeunload', () => {
  localStorage.setItem('deepThinkingSwitch', JSON.stringify(deepThinkingSwitch.value));
});

</script>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
}

.chart {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  background-color: #f9f9f9;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.md-preview {
  padding: 0px;
}

.chart.zoomed {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 90%;
  background-color: white;
  border: 2px solid #9AA2AD;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.chartOption {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chartOption p {
  text-align: center;
  font-weight: 500;
  font-family: 'PingFang SC', sans-serif;
  /* 使用现代感的中文字体 */
}

.powered {
  font-size: 10px;
  color: #9AA2AD;
}

.chartOption div {
  margin: 0;
}

.container {
  width: 100vw;
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.messagesContainer {
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 20px;
  margin-bottom: 120px;
  scrollbar-width: none;
  /* 隐藏滚动条 */
}

.messagesContainer::-webkit-scrollbar {
  width: 0;
  /* 隐藏滚动条 */
}

.messagesContainer::-webkit-scrollbar-track {
  background: transparent;
  /* 背景透明 */
}

.messagesContainer::-webkit-scrollbar-thumb {
  background-color: transparent;
  /* 滚动条透明 */
}

.title {
  text-align: center;
  font-size: 16px;
  color: #333;
}

.message {
  /* display: flex;
  flex-direction: row; */
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 9px;
  /* border: 1px solid #dfdfdf; */
}

.roleIcon {
  margin-top: 13px;
  width: 20px;
  height: 20px;
}

.streaming {
  padding: 10px;
  background-color: #ffffff;
  border-radius: 9px;
  border: 1px solid #9AA2AD;
}

.contentOption {
  display: flex;
}

.searchBox {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.searchBox:focus-within {
  border: 1px solid #9AA2AD;
}

.searchOption {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inputField {
  width: 100%;
  padding: 8px 2px 18px 2px;
  border: 0px solid #ccc;
  font-size: 18px;
  border-radius: 9px;
  outline: none;
  transition: border-color 0.3s;
}

.rightOption {
  display: flex;
  align-items: center;
}

.optionButton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  padding: 4px;
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 9px;
  margin-right: 5px;
  transition: transform 0.3s ease, background-color 0.3s, border-color 0.3s ease;
}

.optionButton:hover {
  background-color: #e0e0e0;
}

.optionButton img {
  width: 24px;
  height: 24px;
}

#sendButton {
  border: 2px solid #91CAE8;
  background-color: #91CAE8;
}

.switchOption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  height: 36px;
  padding: 5px;
  background-color: #f8f9fa;
  border-radius: 9px;
  margin-right: 5px;
  border: 1px solid #ccc;
  transition: transform 0.3s ease, background-color 0.3s, border-color 0.3s ease;
  cursor: pointer;
  user-select: none;
}

.switchOption:hover {
  background-color: #e0e0e0;
}

.switchOption img {
  width: 24px;
  height: 24px;
}

.switchOption p {
  font-size: 14px;
  color: #000000;
}

.switchOption.active {
  background-color: #e0e0e0;
  border: 1px solid #aaa;
}

/* 深色模式样式 */
.container.dark {
  background-color: #121212;
  color: #ffffff;
}

.main.dark {
  background-color: #121212;
  color: #ffffff;
}

.searchBox.dark {
  background-color: #333;
  border: 1px solid #333;
}

.message.dark {
  background-color: #121212;
}

.md-preview.dark {
  background-color: #121212;
}

.md-preview p.dark {
  color: #ffffff;
}

.chart.dark {
  background-color: #333;
  border: 1px solid #333;
}

.chartOption.dark {
  background-color: #333;
  color: #ffffff;
}

.chartOption p.dark {
  background-color: #333;
  color: #ffffff;
}

.chartOption div.dark {
  background-color: #333;
  color: #ffffff;
}

.optionButton.dark {
  background-color: #121212;
  border: 1px solid #333;
}

.optionButton:hover.dark {
  border: 1px solid #91CAE8;
}

.inputField.dark {
  background-color: #333;
  border: 1px solid #333;
  color: #ffffff;
}

.switchOption.dark {
  background-color: #121212;
  border: 1px solid #121212;
}

.switchOption:hover.dark {
  border: 1px solid #91CAE8;
}

.switchOption.active.dark {
  background-color: #1d1d1d;
  border: 1px solid #333;
}

.switchOption p.dark {
  color: #ffffff;
}

.streaming.dark {
  background-color: #121212;
  border-color: #ccc;
}

/* 移动端样式 */
@media (max-width: 600px) {
  .container {
    padding: 5px;
  }

  .chart {
    margin-bottom: 5px;
  }

  .title {
    font-size: 14px;
  }

  .messagesContainer {
    margin-bottom: 120px;
  }

  .message {
    padding: 3px;
  }

  .searchBox {
    padding: 5px;
    bottom: 50px;
    border-radius: 0;
    border: none;
    border-top: 1px solid #ccc;
  }

  .searchBox:focus-within {
    border: 0;
    border-top: 1px solid #ccc;
  }

  .searchBox.dark {
    border: 0;
    border-top: 1px solid #333;
  }

  .inputField {
    font-size: 16px;
  }

  .optionButton {
    width: 30px;
    height: 30px;
    padding: 2px;
  }

  .optionButton img {
    width: 22px;
    height: 22px;
  }
}
</style>