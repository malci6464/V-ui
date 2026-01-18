<template>
  <section class="pipeline-view">
    <header class="pipeline-view__header">
      <h1>Pipeline View</h1>
      <p>Select and inspect an active pipeline.</p>
    </header>

    <div v-if="selectedPipeline" class="pipeline-view__card">
      <div class="pipeline-view__meta">
        <h2>{{ selectedPipeline.name }}</h2>
        <span class="pipeline-view__badge">{{ selectedPipeline.id }}</span>
      </div>
      <p v-if="selectedPipeline.description" class="pipeline-view__description">
        {{ selectedPipeline.description }}
      </p>

      <h3>Stages</h3>
      <ol>
        <li v-for="stage in selectedPipeline.stages" :key="stage.id">
          <strong>{{ stage.name }}</strong>
          <div class="pipeline-view__stage-meta">
            <span>{{ stage.type }}</span>
            <span v-if="stage.service">· {{ stage.service }}</span>
          </div>
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
</script>

<style scoped>
.pipeline-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.pipeline-view__header h1 {
  margin: 0;
  font-size: 2rem;
}

.pipeline-view__card {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  background: #fff;
}

.pipeline-view__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pipeline-view__badge {
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 0.8rem;
}

.pipeline-view__description {
  margin-top: 0.5rem;
  color: #4b5563;
}

.pipeline-view__stage-meta {
  font-size: 0.85rem;
  color: #6b7280;
}

.pipeline-view__empty {
  border: 1px dashed #cbd5f5;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  color: #6b7280;
}
</style>
