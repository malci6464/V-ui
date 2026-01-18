<template>
  <div class="app">
    <header class="app__header">
      <div>
        <p class="app__eyebrow">Infrastructure Overview</p>
        <h1>Topology Console</h1>
        <p class="app__subtitle">
          Monitor services, storage, and pipelines in one unified snapshot.
        </p>
      </div>
      <nav class="app__nav">
        <router-link to="/global">Global View</router-link>
        <router-link :to="`/pipeline/${defaultPipelineId}`">Pipeline View</router-link>
      </nav>
    </header>

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
      owner: "Edge Platform",
      status: "Healthy",
      lastRun: "6 minutes ago",
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
      owner: "Analytics",
      status: "Degraded",
      lastRun: "42 minutes ago",
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
  color: #0f172a;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.app__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2.5rem 3rem 1.5rem;
  background: linear-gradient(120deg, #eef2ff, #ecfeff 60%, #ffffff);
  border-bottom: 1px solid #e2e8f0;
}

.app__header h1 {
  margin: 0.35rem 0;
  font-size: clamp(2rem, 4vw, 2.75rem);
  color: #0f172a;
}

.app__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.7rem;
  margin: 0;
  color: #64748b;
}

.app__subtitle {
  margin: 0;
  color: #475569;
  max-width: 480px;
}

.app__nav {
  display: flex;
  gap: 0.75rem;
  padding: 0.3rem;
  background: #fff;
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.app__nav a {
  color: #475569;
  font-weight: 600;
  text-decoration: none;
  padding: 0.55rem 1.25rem;
  border-radius: 999px;
  transition: all 0.2s ease;
}

.app__nav a.router-link-active {
  background: #312e81;
  color: #fff;
}

.app__nav a:hover {
  background: #e0e7ff;
  color: #1e1b4b;
}

.app__content {
  padding: 0 3rem 3rem;
}

@media (max-width: 720px) {
  .app__header {
    padding: 2rem 1.5rem 1rem;
  }

  .app__content {
    padding: 0 1.5rem 2.5rem;
  }
}
</style>
