<template>
  <section class="pipeline-view">
    <header class="pipeline-view__header">
      <div>
        <h1>Pipeline View</h1>
        <p>Select and inspect an active pipeline.</p>
      </div>
      <div class="pipeline-view__controls">
        <label>
          Active pipeline
          <select
            :value="selectedPipeline?.id"
            @change="onPipelineChange"
          >
            <option
              v-for="pipeline in pipelines"
              :key="pipeline.id"
              :value="pipeline.id"
            >
              {{ pipeline.name }}
            </option>
          </select>
        </label>
      </div>
    </header>

    <div v-if="selectedPipeline" class="pipeline-view__card">
      <div class="pipeline-view__meta">
        <div>
          <h2>{{ selectedPipeline.name }}</h2>
          <p class="pipeline-view__description">
            {{ selectedPipeline.description }}
          </p>
        </div>
        <div class="pipeline-view__badges">
          <span class="pipeline-view__badge">{{ selectedPipeline.id }}</span>
          <span class="pipeline-view__status" :data-status="selectedPipeline.status">
            {{ selectedPipeline.status }}
          </span>
        </div>
      </div>

      <div class="pipeline-view__metrics">
        <div>
          <span>Stages</span>
          <strong>{{ selectedPipeline.stages.length }}</strong>
        </div>
        <div>
          <span>Owner</span>
          <strong>{{ selectedPipeline.owner }}</strong>
        </div>
        <div>
          <span>Last run</span>
          <strong>{{ selectedPipeline.lastRun }}</strong>
        </div>
      </div>

      <h3>Stages</h3>
      <ol class="pipeline-view__stage-list">
        <li v-for="stage in selectedPipeline.stages" :key="stage.id">
          <div>
            <strong>{{ stage.name }}</strong>
            <p>{{ stage.type }}</p>
          </div>
          <span v-if="stage.service">{{ stage.service }}</span>
        </li>
      </ol>
    </div>

    <div v-else class="pipeline-view__empty">
      <p>No pipeline selected.</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  ontology: {
    type: Object,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  selectedPipelineId: {
    type: String,
    default: "",
  },
});

const pipelines = computed(() =>
  Array.isArray(props.data.pipelines) ? props.data.pipelines : [],
);

const selectedPipeline = computed(() => {
  if (!pipelines.value.length) {
    return null;
  }

  return (
    pipelines.value.find((pipeline) => pipeline.id === props.selectedPipelineId) ??
    pipelines.value[0]
  );
});

const onPipelineChange = (event) => {
  const nextId = event.target.value;
  router.push(`/pipeline/${nextId}`);
};
</script>

<style scoped>
.pipeline-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.pipeline-view__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.pipeline-view__header h1 {
  margin: 0;
  font-size: 2rem;
}

.pipeline-view__header p {
  margin: 0.35rem 0 0;
  color: #475569;
}

.pipeline-view__controls label {
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #94a3b8;
  gap: 0.35rem;
}

.pipeline-view__controls select {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  color: #0f172a;
  background: #fff;
}

.pipeline-view__card {
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 1.75rem;
  background: #fff;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pipeline-view__meta {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.pipeline-view__meta h2 {
  margin: 0;
}

.pipeline-view__description {
  margin: 0.5rem 0 0;
  color: #475569;
}

.pipeline-view__badges {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pipeline-view__badge {
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 0.8rem;
}

.pipeline-view__status {
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #ecfeff;
  color: #0e7490;
}

.pipeline-view__status[data-status="Degraded"] {
  background: #fef2f2;
  color: #b91c1c;
}

.pipeline-view__metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.pipeline-view__metrics span {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #94a3b8;
}

.pipeline-view__metrics strong {
  font-size: 1.4rem;
  color: #0f172a;
}

.pipeline-view__stage-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pipeline-view__stage-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #fff;
}

.pipeline-view__stage-list p {
  margin: 0.25rem 0 0;
  color: #64748b;
  font-size: 0.9rem;
}

.pipeline-view__empty {
  border: 1px dashed #cbd5f5;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  color: #6b7280;
}
</style>
