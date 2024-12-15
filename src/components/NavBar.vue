<template>
  <header>
      <ul class="nav-list">
        <li @click="$emit('goToHome')"><img src="/src/assets/home.svg" alt=""></li>
        <li @click="$emit('goToAbout')"><img src="/src/assets/about.svg" alt=""></li>
     
        <li @click="$emit('goToSetting')"><img src="/src/assets/setting.svg" alt=""></li>

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
  bottom: 0;
  height: 100%;
  width: 50px;
  background-color: #fafafa;
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

@media (max-width: 648px) {
  header {
    position: fixed;
    bottom: 0;  /* 位置改为底部 */
    left: 0;
    height: 50px;
    width: 100%;
    border-top: 1px solid #ccc;  /* 顶部边框 */
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    z-index: 1000;
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .nav-list li {
    margin: 0;
  }

  li img {
    width: 20px;
    height: 20px;
  }
}
</style>
