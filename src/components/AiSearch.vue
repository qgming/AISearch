<template>
  <div class="container">
    <p class="title">极点AI</p>
    <div ref="messagesContainer" class="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <p><strong>{{ message.role }}:</strong>
          <MdPreview :modelValue="message.content" />
        <div class="contentOption">
          <div class="optionButton" @click="copyContent(message.content)"><img src="/src/assets/copy.svg" alt="复制">
          </div>
          <div class="optionButton" @click="sendToChart(message.content, index)"><img src="/src/assets/chartbar.svg"
              alt="生成图表">
          </div>
        </div>
        </p>
        <div v-if="chartContent && lastChartIndex === index" class="chart">
          <MdPreview :modelValue="chartContent" />
          <div class="chartOption">
            <div class="optionButton" @click="zoomChart"><img src=" /src/assets/zoomOut.svg" alt="放大">
            </div>
            <div>
              <p>极点&nbsp;AI&nbsp;图表</p>
              <p class="powered">POWERED BY JDWDAI</p>
            </div>
            <div class="optionButton" @click="saveAsImage"><img src=" /src/assets/cut.svg" alt="保存图片">
            </div>
          </div>

        </div>
      </div>
      <div v-if="generatingChart" class="chart">
        <p>AI图表生成中...</p>
      </div>
      <div v-if="streaming" class="streaming">
        <p><strong>assistant:</strong>
          <MdPreview :modelValue="assistantMessage" />
        </p>
      </div>
    </div>
    <div class="searchBox">
      <input v-model="userInput" @keyup.enter="sendMessage" placeholder="输入消息..." class="inputField" />
      <div class="searchOption">
        <div class="rightOption">
          <el-switch :modelValue="onlineSwitch" @update:modelValue="toggleOnlineSearch"
            style="--el-switch-on-color: #91CAE8; --el-switch-off-color: #f5f5f5" />
          <p>联网搜索</p>
          <el-switch :modelValue="deepThinkingSwitch" @update:modelValue="toggleDeepThinking"
            style="--el-switch-on-color: #91CAE8; --el-switch-off-color: #f5f5f5" />
          <p>深度思考</p>
        </div>
        <div class="rightOption">
          <div class="optionButton" @click="refresh"><img src="/src/assets/refresh.svg" alt="刷新"></div>
          <div class="optionButton" @click="stopConversation"><img src="/src/assets/stop.svg" alt="终止"></div>
          <div class="optionButton" id="sendButton" @click="sendMessage"><img src="/src/assets/sendW.svg" alt="发送">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import OpenAI from 'openai';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import { ElSwitch, ElMessage } from 'element-plus'; // 引入 Element Plus 的 Switch 和 Message 组件
import 'element-plus/dist/index.css';
import { useRoute } from 'vue-router';
import Mermaid from 'mermaid';
import html2canvas from 'html2canvas';
const route = useRoute();

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

// //配置
// const aiModel = ref('deepseek-chat');
// const aiKey = ref('sk-472acb3c00e74ecdabf884f0467e5c29')
// const aiProvider = ref('https://api.deepseek.com')
// const webKey = ref('8c10e72abd33616fbf3980dc348e2ba29b4fa452')

// 配置
const aiModel = ref('');
const aiKey = ref('');
const aiProvider = ref('');
const webKey = ref('');

// 大模型配置（在初始化配置）
const openai = new OpenAI({
  baseURL: aiProvider.value,
  apiKey: aiKey.value,
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
    scrollToBottom(); // 自动滚动到底部
  }
  streaming.value = false; // 结束流式输出

  messages.value.push({ role: "assistant", content: assistantMessage.value });
  userInput.value = '';

  scrollToBottom(); // 自动滚动到底部
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
    const response = await fetch('../deepThinking.txt');
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
      message: 'API 请求错误',
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
    const response = await fetch('../chart2.txt');
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

onMounted(() => {
  scrollToBottom(); // 组件挂载时滚动到底部
  readPromptFile(); // 调用读取提示词
  readChartPromptFile(); // 读取 chart 提示词
  //本地获取API配置信息
  const savedLargeModel = localStorage.getItem('largeModel');
  if (savedLargeModel) {
    const largeModelConfig = JSON.parse(savedLargeModel);
    aiModel.value = largeModelConfig.model;
    aiKey.value = largeModelConfig.key;
    aiProvider.value = largeModelConfig.provider;
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
.chart {
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 5px;
  background-color: #f9f9f9;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.md-editor-previewOnly {
  border-radius: 12px;
}

.md-editor-preview-wrapper {
  padding: 2px;
}

.chart.zoomed {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 90%;
  height: 90%;
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
  width: 800px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.messagesContainer {
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 20px;
  margin-bottom: 100px;
  scrollbar-width: thin;
  scrollbar-color: #9AA2AD #f9f9f9;
}

.messagesContainer::-webkit-scrollbar {
  width: 2px;
}

.messagesContainer::-webkit-scrollbar-track {
  background: #f9f9f9;
}

.messagesContainer::-webkit-scrollbar-thumb {
  background-color: #9AA2AD;
  border-radius: 9px;
}

.title {
  text-align: center;
  font-size: 16px;
  color: #333;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #dfdfdf;
}

.streaming {
  padding: 10px;
  background-color: #ffffff;
  border-radius: 12px;
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
  transition: box-shadow 0.3s ease;
}

.searchBox:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.searchOption {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inputField {
  width: 100%;
  padding: 10px 2px;
  border: 0px solid #ccc;
  font-size: 16px;
  border-radius: 9px;
  outline: none;
  transition: border-color 0.3s;
}

.rightOption {
  display: flex;
  align-items: center;
}

.optionButton {
  width: 36px;
  height: 36px;
  padding: 4px;
  background-color: #f5f5f5;
  border-radius: 9px;
  margin: 0 0 0 10px;
  border: 2px solid #f8f9fa;
  transition: transform 0.3s ease;
  transition: border-color 0.3s ease;
}

.optionButton:hover {
  border: 2px solid #91CAE8;
}

.optionButton img {
  width: 24px;
  height: 24px;
}

#sendButton {
  border: 2px solid #91CAE8;
  background-color: #91CAE8;
}

/* 移动端样式 */
@media (max-width: 600px) {
  .container {
    width: 100%;
    padding: 10px;
  }

  .title {
    font-size: 14px;
  }

  .message {
    padding: 8px;
  }

  .searchBox {
    padding: 8px;
  }

  .inputField {
    font-size: 14px;
  }

  .optionButton {
    width: 30px;
    height: 30px;
    padding: 2px;
  }

  .optionButton img {
    width: 20px;
    height: 20px;
  }
}
</style>