<template>
    <div id="mindMap" ref="mindMapContainer"></div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import MindMap from 'simple-mind-map';
import OpenAI from "openai";

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
                note: '', // 备注的内容
                associativeLineTargets: [''],// 如果存在关联线，那么为目标节点的uid列表
                associativeLineText: '',// 关联线文本
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
        console.log(mindMapData);

        updateMindMap(mindMapData);
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
    }
};

// 导出为PNG

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
            text: '极点AI搜索',
            lineSpacing: 100,
            textSpacing: 100,
            angle: 30,
            textStyle: {
                color: '#999',
                opacity: 0.5,
                fontSize: 14
            }
        },
    });
});


watch(() => props.mindMapMessage, async (newVal) => {
    console.log('Received mindMapMessage:', newVal);  // 打印接收到的信息
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

#mindMap * {
    margin: 0;
    padding: 0;
}

/* 移动端样式 */
@media (max-width: 648px) {
    #mindMap {
        margin-top: 10px;
        width: 100%;
        height: 300px;
        border-radius: 9px;
    }
}
</style>
