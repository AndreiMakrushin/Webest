<script setup lang="ts">
import type { ITender } from '@/types/index'
defineProps<{
  detailTenderCard: ITender | null
}>()
</script>
<template>
  <div class="tender-card">
    <div class="card-badge">{{ detailTenderCard?.category }}</div>

    <h1 class="card-title">{{ detailTenderCard?.title }}</h1>

    <div class="card-content">
      <p class="card-description">{{ detailTenderCard?.description }}</p>

      <div class="card-meta">
        <div class="meta-item">
          <svg class="meta-icon" viewBox="0 0 24 24">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            />
          </svg>
          <span>{{ detailTenderCard?.place }}</span>
        </div>

        <div class="meta-item">
          <svg class="meta-icon" viewBox="0 0 24 24">
            <path
              d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            />
            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
          </svg>
          <span>ID: {{ detailTenderCard?.id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tender-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
}

.card-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-bottom-left-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.card-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.card-description {
  color: #4b5563;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.meta-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

@media (max-width: 768px) {
  .tender-card {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .card-description {
    font-size: 1rem;
  }
}
</style>
