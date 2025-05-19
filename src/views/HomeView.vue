<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Pagination from '@/components/Pagination.vue'
import type { ITender } from '@/types/index'
import { useGetTenderCardList } from '@/composables/useGetTenderCardList'
import Search from '@/components/Search.vue'
import CardTenderList from '@/components/CardTenderList.vue'
import SkeletonTenderList from '@/components/SkeletonTenderList.vue'

const router = useRouter()
const route = useRoute()
const tenderList = ref<ITender[]>([])
const currentPage = ref(Number(route.query.page) || 1)
const countPage = ref(0)
const isLoading = ref(false)
const searchQuery = ref(String(route.query.search || ''))
const pageCache = new Map<number, { list: ITender[]; count: number }>()

const filteredList = computed(() =>
  searchQuery.value
    ? tenderList.value.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    : tenderList.value,
)

const noResults = computed(
  () => !isLoading.value && filteredList.value.length === 0 && searchQuery.value !== '',
)

const getTenderList = async (page: number) => {
  if (pageCache.has(page)) {
    const cached = pageCache.get(page)!
    tenderList.value = cached.list
    countPage.value = cached.count
    return
  }

  isLoading.value = true
  try {
    const result = await useGetTenderCardList(page)
    if (result) {
      tenderList.value = result.tenderList
      countPage.value = result.countPage
      pageCache.set(page, { list: result.tenderList, count: result.countPage })
    }
  } finally {
    isLoading.value = false
  }
}

const pageToPagination = async (page: number) => {
  currentPage.value = page
  await router.push({
    query: { ...route.query, page, search: searchQuery.value || undefined },
  })
  await getTenderList(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(
  () => route.query.page,
  (page) => {
    const newPage = Number(page) || 1
    if (newPage !== currentPage.value) {
      currentPage.value = newPage
      getTenderList(newPage)
    }
  },
)

watch(searchQuery, () => {
  router.replace({ query: { ...route.query, search: searchQuery.value || undefined } })
})

onMounted(() => getTenderList(currentPage.value))
</script>

<template>
  <div class="tenders-container">
    <div class="header">
      <Transition name="fade" mode="out-in">
        <h2 v-if="!isLoading">{{ currentPage }} страница из {{ countPage }}</h2>
        <div v-else class="header-skeleton"></div>
      </Transition>
      <Search v-model="searchQuery" />
    </div>

    <Transition name="fade">
      <div v-if="noResults" class="no-results">
        Ничего не найдено по запросу "{{ searchQuery }}"
      </div>
    </Transition>

    <div class="grid-container">
      <Transition name="fade" mode="out-in">
        <SkeletonTenderList v-if="isLoading" />
        <TransitionGroup v-else name="staggered-fade" tag="div" class="content-grid">
          <CardTenderList
            v-for="(item, index) in filteredList"
            :key="item.id"
            :item="item"
            :style="{ transitionDelay: `${index * 30}ms` }"
            ><button class="card-button" @click="router.push(`/tender/${item.id}`)">
              Подробнее
            </button></CardTenderList
          >
        </TransitionGroup>
      </Transition>
    </div>

    <Transition name="fade">
      <Pagination
        v-if="countPage > 0 && (!searchQuery || filteredList.length > 0)"
        :countPage="countPage"
        :currentPage="currentPage"
        @changePage="pageToPagination"
        :show-ends="true"
      />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.tenders-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 20px;

  h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin: 0;
  }

  .header-skeleton {
    width: 250px;
    height: 36px;
    background: #f0f0f0;
    border-radius: 4px;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: shimmer 1.5s infinite;
    }
  }
}

.no-results {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #7f8c8d;
}

.grid-container {
  position: relative;
  min-height: 60vh;
}

.content-grid {
  display: grid;
  gap: 30px;
  padding: 20px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.tender-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  min-height: 200px;

  &.skeleton {
    background: #fff;
    overflow: hidden;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.staggered-fade-enter-active {
  transition: all 0.5s ease;
}
.staggered-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.staggered-fade-move {
  transition: transform 0.5s ease;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 768px) {
  .skeleton-grid,
  .content-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 10px;
  }
}
</style>
