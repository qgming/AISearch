import { createWebHistory, createRouter } from "vue-router";

import TheHome from "@/components/TheHome.vue";
import AiSearch from "@/components/AiSearch.vue";
import Setting from "@/components/Setting.vue";
import About from "@/components/About.vue";

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
