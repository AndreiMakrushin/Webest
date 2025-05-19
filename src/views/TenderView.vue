<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ITender } from '@/types/index'
import SkeletonTenderDetail from '@/components/SkeletonTenderDetail.vue'
import CardDetailTender from '@/components/CardDetailTender.vue'
import { useGetTenderDetailCard } from '@/composables/useGetTenderDetailCard'

const route = useRoute()
const router = useRouter()
const detailTenderCard = ref<ITender | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  const tenderId = +route.params.id
  const result = await useGetTenderDetailCard(tenderId)
  if (!result) {
    return
  }
  const { tenderCard } = result

  detailTenderCard.value = tenderCard
  isLoading.value = false
})
</script>

<template>
  <div class="tender-detail-container">
    <button class="back-button" @click="router.go(-1)">Назад</button
    ><SkeletonTenderDetail v-if="isLoading" />

    <CardDetailTender :detailTenderCard="detailTenderCard" v-else />
  </div>
</template>

<style lang="scss" scoped>
.tender-detail-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.back-button {
  margin-bottom: 2rem;
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
