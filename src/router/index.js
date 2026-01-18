import { createRouter, createWebHashHistory } from "vue-router";
import GlobalView from "../views/GlobalView.vue";
import PipelineView from "../views/PipelineView.vue";

const routes = [
  {
    path: "/",
    redirect: "/global",
  },
  {
    path: "/global",
    name: "global",
    component: GlobalView,
  },
  {
    path: "/pipeline/:id?",
    name: "pipeline",
    component: PipelineView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
