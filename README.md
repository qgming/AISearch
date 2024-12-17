# 极点 AI 搜索

![AiSearch](https://socialify.git.ci/qgming/AiSearch/image?language=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2Fqgming%2FAISearch%2Frefs%2Fheads%2Fmain%2Fpublic%2Ffavicon.svg&name=1&owner=1&stargazers=1&theme=Light)

<p align="center">
  <h3 align="center"><strong>极点AI搜索</strong></h3>
  <p align="center">
    一款高度自定义的AI搜索引擎
    <br />
    <br />
    <br />
    <a href="https://s.jdwdai.com">在线体验</a>
    ·
    <a href="https://github.com/qgming/AISearch/issues">报告Bug</a>
    ·
    <a href="https://github.com/qgming/AISearch/issues">提出新特性</a>
  </p>

</p>

## 功能

- 支持配置`OpenAI格式`API，如 ChatGPT，[Deepseek](https://platform.deepseek.com/)，xAI 等
- 支持配置[Serper](https://serper.dev/)搜索 API 实现`联网搜索`功能
- 支持 Markdown 语法预览
- 支持 Mermaid 语法，配合大模型实现文字转图表（思维导图，流程图等）
- 内置`Perplexity`搜索 Prompt 来处理搜索结果
- 内置[Thinking-Claude](https://github.com/richards199999/Thinking-Claude)Prompt 来实现仿`深度思考`功能
- 全面适配移动端 UI
- 全面适配深色模式

## 目录

- [安装步骤](#安装步骤)
- [文件目录说明](#文件目录说明)
- [使用到的框架](#使用到的框架)
- [版本控制](#版本控制)
- [贡献者](#贡献者)
- [作者](#作者)
- [鸣谢](#鸣谢)

### **安装步骤**

1. Get a free API Key at [智谱 AI](https://open.bigmodel.cn/)
2. Clone the repo

```sh
git clonehttps://github.com/qgming/AISearch.git
```

3. Install dependencies

```sh
npm install
```

4. Run `npm run dev` for a dev server

### 文件目录说明

eg:

```
filetree
├── public/
│   ├── base.css
│   ├── favicon.ico
│   └── prompt.txt
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── assets/
│   │   └── other.svg
│   ├── components/
│   │   └── NavBar.vue
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   └── theme.js
│   └── views/
│       ├── About.vue
│       ├── AiSearch.vue
│       ├── Setting.vue
│       └── TheHome.vue
├── README.md
├── index.html
├── jsconfig.json
├── package.json
├── vercel.json
└── vite.config.js
```

### 使用到的框架

- [md-editor-v3](https://github.com/shaojintian/md-editor-v3)
- [element-plus](https://element-plus.org/zh-CN/)
- [openai](https://platform.openai.com/)
- [vue-router](https://router.vuejs.org/zh/)
- [vue](https://v3.cn.vuejs.org/)
- [pinia](https://pinia.vuejs.org/zh/)

### 版本控制

该项目使用 Git 进行版本管理。您可以在 repository 参看当前可用版本。

### 贡献者

![img](https://contrib.rocks/image?repo=qgming/AiSearch)

### 作者

qgming
邮箱：qgming@qq.com
公众号：极点维度

_您也可以在贡献者名单中参看所有参与该项目的开发者。_

### 版权说明

该项目签署了 MIT 授权许可，详情请参阅 [LICENSE.txt](https://github.com/qgming/AISearch/blob/main/LICENSE.txt)

### 鸣谢

- [Vercel](https://www.vercel.com)
- [iconfont](https://www.iconfont.cn/)
- [智谱 AI](https://open.bigmodel.cn/)

