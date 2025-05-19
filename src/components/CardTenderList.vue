<template>
  <div class="tender-card">
    <div class="card-header">
      <h3 class="card-title">{{ item.title || 'Название не указано' }}</h3>
      <span class="card-category">{{ item.category }}</span>
    </div>
    <p class="card-description">{{ item.description }}</p>
    <div class="card-footer">
      <span class="card-location">{{ item.place }}</span>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITender } from '@/types/index'
defineProps<{
  item: ITender
}>()
</script>

<style scoped lang="scss">
.tender-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  transition: all 0.3s ease;
  will-change: transform, opacity;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;

    .card-title {
      font-size: 1.1rem;
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
    }

    .card-category {
      display: inline-block;
      background: #f0f7ff;
      color: #3498db;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }
  }

  .card-description {
    color: #555;
    font-size: 0.9rem;
    flex-grow: 1;
    margin: 0 0 1rem 0;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  .card-footer {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: start;

    .card-location {
      font-size: 0.8rem;
      color: #7f8c8d;
      display: flex;
      align-items: center;

      &::before {
        content: '📍';
        margin-right: 0.3rem;
      }
    }
  }
}
</style>
