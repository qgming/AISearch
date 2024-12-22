<template>
  <div class="search-link">
    <p v-if="searchResults && searchResults.length > 0"><img src="/src/assets/link.svg" alt="" srcset="">来源</p>
    <ul class="horizontal-list" :class="themeStore.theme">
      <li v-for="(result, index) in searchResults" :key="index" class="card" @click="openLink(result.link)" :class="themeStore.theme">
        <a :href="result.link" target="_blank">{{ result.title }}</a>
        <p>{{ result.snippet }}</p>
        <small>{{ result.date }} {{ result.link }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useThemeStore } from '../store/theme';

const themeStore = useThemeStore();
const { searchResults } = defineProps(['searchResults']);

const openLink = (link) => {
  window.open(link, '_blank');
};
</script>

<style scoped>
.search-link {
  margin: 0px; 
}
img {
  width: 16px;
  height: 16px;
}
.horizontal-list {
  display: flex;
  overflow-x: auto; /* 显示滑动条 */
  padding: 0;
}
.horizontal-list::-webkit-scrollbar {
  height: 8px; /* 滑动条高度 */
}
.horizontal-list::-webkit-scrollbar-thumb {
  background: #ccc; /* 滑动条颜色 */
  border-radius: 9px; /* 圆角 */
}
.horizontal-list::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滑动条轨道颜色 */
}
.horizontal-list.dark::-webkit-scrollbar {
  height: 8px; /* 滑动条高度 */
}
.horizontal-list.dark::-webkit-scrollbar-thumb {
  background: #555; /* 深色模式下的滑动条颜色 */
  border-radius: 9px; /* 圆角 */
}
.horizontal-list.dark::-webkit-scrollbar-track {
  background: #333; /* 深色模式下的滑动条轨道颜色 */
}
.card { 
  border: 1px solid #e0e0e0; 
  border-radius: 9px; 
  padding: 8px; 
  margin: 5px; 
  transition: transform 0.2s;
  width: 180px;  
  height: 90px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card.dark {
    background: #333;
    border: 1px solid #333;
}
.card:hover {
  transform: scale(1.02); 
  border: 1px solid #90c9e8; 
  background: #f9f9f9; 
}
.card.dark:hover {
  transform: scale(1.02); 
  border: 1px solid #90c9e8; 
  background: #333; 
}
.card a {
  color: #000; 
  text-decoration: none; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  display: block;
  width: 100%;
}
.card p {
  font-size: 14px; /* 调整字体大小 */
  color: #555; /* 日期和摘要颜色 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2; /* 限制显示两行 */
  -webkit-box-orient: vertical;
  line-height: 1.2; /* 增加行高 */
  max-height: 2.4em; /* 增加最大高度 */
}
.card small {
  font-size: 12px;
  color: #888; /* 链接颜色 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  line-clamp: 1;
}
/* 移动端样式 */
@media (max-width: 648px) {
  .card {
    width: 150px;
    height: 90px;
    padding: 5px;
  }
}
</style>