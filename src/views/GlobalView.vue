<template>
  <section class="global-view">
    <header class="global-view__header">
      <h1>Global View</h1>
      <p>Grouped inventory by resource type.</p>
    </header>

    <div class="global-view__grid">
      <article
        v-for="group in groupedElements"
        :key="group.type"
        class="global-view__group"
      >
        <h2>{{ group.label }}</h2>
        <p class="global-view__count">{{ group.items.length }} items</p>
        <ul>
          <li v-for="item in group.items" :key="item.id">
            <strong>{{ item.name }}</strong>
            <span v-if="item.description"> — {{ item.description }}</span>
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

const defaultGroups = [
  "containers",
  "r2",
  "workers",
  "d1",
  "kv",
  "queues",
];

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
</script>

<style scoped>
.global-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.global-view__header h1 {
  margin: 0;
  font-size: 2rem;
}

.global-view__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.global-view__group {
  border: 1px solid #dcdfe6;
  border-radius: 12px;
  padding: 1rem;
  background: #fff;
}

.global-view__group h2 {
  margin-bottom: 0.25rem;
}

.global-view__count {
  margin: 0 0 0.75rem;
  color: #6b7280;
  font-size: 0.9rem;
}
</style>
