import { createWebHistory, createRouter } from "vue-router";

import TheHome from "@/views/TheHome.vue";
import AiSearch from "@/views/AiSearch.vue";
import Setting from "@/views/Setting.vue";
import About from "@/views/About.vue";
import Privacy from "@/views/Privacy.vue";
// import { path } from "d3";
// import Ai from "@/views/Ai.vue";

const routes = [
  { path: "/", component: TheHome },
  { path: "/search", component: AiSearch },
  { path: "/setting", component: Setting },
  { path: "/about", component: About },
  { path: "/privacy", component: Privacy },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
