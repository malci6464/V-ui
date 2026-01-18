<template>
  <section class="global-view">
    <header class="global-view__header">
      <div>
        <h1>Global View</h1>
        <p>Grouped inventory by resource type.</p>
      </div>
      <div class="global-view__summary">
        <div>
          <span>Total resources</span>
          <strong>{{ totalResources }}</strong>
        </div>
        <div>
          <span>Types tracked</span>
          <strong>{{ groupedElements.length }}</strong>
        </div>
        <div>
          <span>Most active</span>
          <strong>{{ mostActiveLabel }}</strong>
        </div>
      </div>
    </header>

    <div class="global-view__grid">
      <article
        v-for="group in groupedElements"
        :key="group.type"
        class="global-view__group"
      >
        <div class="global-view__group-header">
          <h2>{{ group.label }}</h2>
          <span class="global-view__count">{{ group.items.length }} items</span>
        </div>
        <ul class="global-view__list">
          <li v-for="item in group.items" :key="item.id">
            <div>
              <strong>{{ item.name }}</strong>
              <p v-if="item.description">{{ item.description }}</p>
            </div>
            <span class="global-view__pill">{{ group.label }}</span>
          </li>
        </ul>
      </article>
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
});

const defaultGroups = ["containers", "r2", "workers", "d1", "kv", "queues"];

const groupedElements = computed(() => {
  const elements = Array.isArray(props.data.elements) ? props.data.elements : [];
  const typeMap = props.ontology?.types ?? {};

  return defaultGroups.map((type) => {
    const label = typeMap[type]?.label ?? type.toUpperCase();
    const items = elements.filter((item) => item.type === type);

    return {
      type,
      label,
      items,
    };
  });
});

const totalResources = computed(() =>
  groupedElements.value.reduce((total, group) => total + group.items.length, 0),
);

const mostActiveLabel = computed(() => {
  if (!groupedElements.value.length) {
    return "-";
  }

  const sorted = [...groupedElements.value].sort(
    (first, second) => second.items.length - first.items.length,
  );

  return sorted[0].label;
});
</script>

<style scoped>
.global-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.global-view__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
}

.global-view__header h1 {
  margin: 0;
  font-size: 2rem;
}

.global-view__header p {
  margin: 0.35rem 0 0;
  color: #475569;
}

.global-view__summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}

.global-view__summary span {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #94a3b8;
}

.global-view__summary strong {
  font-size: 1.4rem;
  color: #0f172a;
}

.global-view__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.global-view__group {
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 1.25rem;
  background: #fff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.global-view__group-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.global-view__count {
  font-size: 0.85rem;
  color: #64748b;
}

.global-view__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.global-view__list li {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px dashed #e2e8f0;
}

.global-view__list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.global-view__list p {
  margin: 0.25rem 0 0;
  color: #64748b;
  font-size: 0.9rem;
}

.global-view__pill {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
}
</style>
