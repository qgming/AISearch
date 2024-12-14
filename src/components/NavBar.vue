<template>
  <header>
      <ul class="nav-list">
        <li @click="$emit('goToSetting')"><img src="/src/assets/setting.svg" alt=""></li>
        <li @click="$emit('goToAbout')"><img src="/src/assets/about.svg" alt=""></li>
        <li @click="$emit('goToHome')"><img src="/src/assets/home.svg" alt=""></li>
      </ul>
  </header>
</template>

<script setup>
// 这里可以添加任何需要的逻辑或 props
</script>

<style scoped>
header {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 50px;
  background-color: #ffffff;
  border-right: 1px solid #ccc;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin-bottom: 15px;
  cursor: pointer;
}

li img {
  width: 24px;
  height: 24px;
}
</style>
