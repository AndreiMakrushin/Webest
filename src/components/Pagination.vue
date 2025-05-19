<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  countPage: number
  currentPage: number
  showEnds?: boolean
}>()

const emit = defineEmits<{
  (e: 'changePage', page: number): void
}>()

const paginationTabs = computed(() => {
  const result: (number | string)[] = []
  const { currentPage, countPage } = props

  const maxVisible = 5

  if (countPage <= maxVisible) {
    for (let i = 1; i <= countPage; i++) {
      result.push(i)
    }
  } else {
    let start = Math.max(1, currentPage - 2)
    let end = Math.min(countPage, currentPage + 2)

    if (currentPage <= 3) {
      start = 1
      end = maxVisible
    } else if (currentPage >= countPage - 2) {
      start = countPage - maxVisible + 1
      end = countPage
    }

    if (start > 1) {
      result.push(1)
      if (start > 2) {
        result.push('...')
      }
    }

    for (let i = start; i <= end; i++) {
      if (i > 0 && i <= countPage && !result.includes(i)) {
        result.push(i)
      }
    }

    if (end < countPage) {
      if (end < countPage - 1) {
        result.push('...')
      }
      result.push(countPage)
    }
  }

  return result
})

const changePage = (page: number | string) => {
  if (typeof page === 'number') {
    emit('changePage', page)
  }
}

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('changePage', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.countPage) {
    emit('changePage', props.currentPage + 1)
  }
}
</script>

<template>
  <div class="pagination">
    <button
      class="pagination-button pagination-nav"
      :disabled="currentPage === 1"
      @click="prevPage"
    >
      &lsaquo;
    </button>

    <ol class="pagination-list">
      <li
        v-for="(item, index) in paginationTabs"
        :key="index"
        class="pagination-item"
        :class="{
          active: item === currentPage,
          dots: item === '...',
          clickable: item !== '...',
        }"
        @click="changePage(item)"
      >
        {{ item }}
      </li>
    </ol>

    <button
      class="pagination-button pagination-nav"
      :disabled="currentPage === countPage"
      @click="nextPage"
    >
      &rsaquo;
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 20px 0;
  font-family: Arial, sans-serif;

  &-list {
    display: flex;
    gap: 4px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid #e0e0e0;
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background-color: #f0f0f0;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid #e0e0e0;
    background-color: white;
    border-radius: 4px;
    transition: all 0.2s ease;

    &.clickable {
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }
    }

    &.active {
      background-color: #4285f4;
      color: white;
      border-color: #4285f4;
      font-weight: bold;
    }

    &.dots {
      border: none;
      background: transparent;
      cursor: default;
    }
  }

  &-nav {
    font-size: 16px;
  }
}
</style>
