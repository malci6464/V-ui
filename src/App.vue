<template>
  <div class="app">
    <nav class="app__nav">
      <router-link to="/global">Global View</router-link>
      <router-link :to="`/pipeline/${defaultPipelineId}`">Pipeline View</router-link>
    </nav>

    <main class="app__content">
      <router-view v-slot="{ Component, route }">
        <component
          :is="Component"
          :ontology="ontology"
          :data="data"
          :selected-pipeline-id="route.params.id || defaultPipelineId"
        />
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";

const ontology = {
  types: {
    containers: { label: "Containers" },
    r2: { label: "R2 Buckets" },
    workers: { label: "Workers" },
    d1: { label: "D1 Databases" },
    kv: { label: "KV Namespaces" },
    queues: { label: "Queues" },
  },
};

const data = {
  elements: [
    {
      id: "container-1",
      name: "Ingress Cluster",
      description: "Edge ingress containers",
      type: "containers",
    },
    {
      id: "r2-1",
      name: "Assets Bucket",
      description: "Static asset storage",
      type: "r2",
    },
    {
      id: "worker-1",
      name: "Webhook Worker",
      description: "Receives external callbacks",
      type: "workers",
    },
    {
      id: "d1-1",
      name: "Orders DB",
      description: "Transactional data",
      type: "d1",
    },
    {
      id: "kv-1",
      name: "Feature Flags",
      description: "Runtime configuration",
      type: "kv",
    },
    {
      id: "queue-1",
      name: "Jobs Queue",
      description: "Async workload",
      type: "queues",
    },
  ],
  pipelines: [
    {
      id: "pipeline-a",
      name: "Ingest Pipeline",
      description: "Moves inbound traffic to storage and queues.",
      stages: [
        {
          id: "stage-1",
          name: "Validate",
          type: "worker",
          service: "Webhook Worker",
        },
        {
          id: "stage-2",
          name: "Persist",
          type: "database",
          service: "Orders DB",
        },
        {
          id: "stage-3",
          name: "Enqueue",
          type: "queue",
          service: "Jobs Queue",
        },
      ],
    },
    {
      id: "pipeline-b",
      name: "Reporting Pipeline",
      description: "Aggregates data for dashboards.",
      stages: [
        {
          id: "stage-4",
          name: "Extract",
          type: "worker",
          service: "Analytics Worker",
        },
        {
          id: "stage-5",
          name: "Store",
          type: "storage",
          service: "Assets Bucket",
        },
      ],
    },
  ],
};

const defaultPipelineId = computed(() => data.pipelines[0]?.id ?? "");
</script>

<style scoped>
:global(body) {
  margin: 0;
  font-family: "Inter", system-ui, sans-serif;
  background: #f8fafc;
  color: #111827;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__nav {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.app__nav a {
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
}

.app__nav a.router-link-active {
  color: #111827;
}

.app__content {
  padding: 2rem;
}
</style>
