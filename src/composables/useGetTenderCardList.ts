import type { ITender } from '@/types/index'

interface TenderListResponse {
  tenderList: ITender[]
  countPage: number
}

export const useGetTenderCardList = async (page: number): Promise<TenderListResponse> => {
  try {
    const response = await fetch(`https://api.test-webest.ru/list/?page=${page}`)

    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных. Статус: ${response.status}`)
    }

    const dataJson = await response.json()

    return {
      tenderList: dataJson.data.slice(0, 30).map((item: ITender) => ({
        id: item.id,
        title: item.title.trim(),
        category: item.category || 'Без категории',
        description: item.description || '',
        place: item.place || 'Место не указано',
      })),
      countPage: dataJson.page_count,
    }
  } catch (error) {
    console.error('Ошибка при загрузке списка тендеров:', error)
    return {
      tenderList: [],
      countPage: 0,
    }
  }
}
