import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Editor",
    component: () => import("./views/Editor/index.vue"),
  },
  {
    path: "/templates",
    name: "Templates",
    component: () => import("./views/TemplateEditor/index.vue"),
  },
  {
    path: "/themes",
    name: "Themes",
    component: () => import("./views/Theme/index.vue"),
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
