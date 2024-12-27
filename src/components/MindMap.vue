<template>
    <div>
        <div id="mindMap" ref="mindMapContainer"></div>
        <button class="exportPng" @click="exportAsPng">导出为图片</button>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import OpenAI from "openai";
import MindMap from 'simple-mind-map';
import Export from 'simple-mind-map/src/plugins/Export.js';
import Watermark from 'simple-mind-map/src/plugins/Watermark.js'

// 注册插件
MindMap.usePlugin(Export);
MindMap.usePlugin(Watermark)

//导出PNG
const exportAsPng = async () => {
    if (!mindMap) return;

    try {
        // 使用requestAnimationFrame确保渲染完成
        await new Promise(resolve => requestAnimationFrame(resolve));

        const data = await mindMap.doExport.png({
            transparent: false,
        });

        // 创建下载链接
        const a = document.createElement('a');
        a.href = data;
        a.download = `mindmap_${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
        a.click();
    } catch (error) {
        console.error('导出失败:', error);
        alert('导出失败，请稍后重试');
    }
};

// 添加一个方法来清除水印
const clearWatermark = () => {
    if (!mindMap) return;
    mindMap.watermark.clear();
};



const mindMapContainer = ref(null);
const props = defineProps({
    mindMapMessage: {
        type: String,
        required: true
    }
});

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-c630db99a14b4861b5f000b4dc254134',
    dangerouslyAllowBrowser: true
});

const makeMindMap = async (data) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system", content: `你是由极点AI构建的思维导图助手，你的任务是根据用户的问题生成思维导图。
        
        当你回答问题时，请遵循以下要求：
        1. 必须以json格式返回数据。
        2. 思维导图内容必须根据用户提供的内容生成

        用户内容：
        ${props.mindMapMessage}

        EXAMPLE JSON OUTPUT:
        {
            data: {
                text: '', 
                },
                hyperlink: '', // 超链接地址
                hyperlinkTitle: '', // 超链接的标题
            },
            children [// 子节点，结构和根节点一致
                {
                data: {},
                children: []
                }
            ]
            }
        ` },
                // ...messages.value,
            ],
            model: 'deepseek-chat',
            stream: false,
            response_format: {
                'type': 'json_object'
            },
        });
        const mindMapData = completion.choices[0].message.content;

        updateMindMap(mindMapData);
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
    }
};

const updateMindMap = (data) => {
    // 假设 data 是思维导图的结构
    mindMap.setData(JSON.parse(data));
};

let mindMap;

onMounted(async () => {
    mindMap = new MindMap({
        el: mindMapContainer.value,
        data: {
            data: {
                text: '思维导图生成中...'
            },
            children: []
        },
        watermarkConfig: {
            text: '极点AI搜索',  // 初始水印文字
            lineSpacing: 150,    // 行间距
            textSpacing: 100,    // 文字间距
            angle: 30,           // 旋转角度
            textStyle: {
                color: '#999',   // 文字颜色
                opacity: 0.2,    // 透明度
                fontSize: 14     // 字体大小
            }
        },
    });
});

//接收消息
watch(() => props.mindMapMessage, async (newVal) => {
    if (newVal) {
        await makeMindMap(newVal);
    }
}, { immediate: true });

</script>


<style scoped>
#mindMap {
    margin-top: 10px;
    width: 100%;
    height: 400px;
    border-radius: 9px;
}

.exportPng {
    margin-top: 5px;
    padding: 7px 15px;
    background-color: #f8f9fb;
    color: #000;
    border: 1px solid #eeeeee;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.exportPng:hover {
    background-color: #e0e0e0;
}

/* 移动端样式 */
@media (max-width: 648px) {
    #mindMap {
        height: 300px;
    }

    .exportPng {
        width: 100%;
        padding: 12px;
        font-size: 16px;
    }
}
</style>