import { createWebHistory, createRouter } from "vue-router";

import TheHome from "@/views/TheHome.vue";
import AiSearch from "@/views/AiSearch.vue";
import Setting from "@/views/Setting.vue";
import About from "@/views/About.vue";
// import Ai from "@/views/Ai.vue";

const routes = [
  { path: "/", component: TheHome },
  { path: "/search", component: AiSearch },
  { path: "/setting", component: Setting },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
