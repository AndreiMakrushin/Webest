import type { ITender } from '@/types/index'

export const useGetTenderDetailCard = async (
  id: number,
): Promise<{ tenderCard: ITender } | null> => {
  try {
    const response = await fetch(`https://api.test-webest.ru/element/?id=${id}`)

    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных. Статус: ${response.status}`)
    }

    const dataJson = await response.json()

    return {
      tenderCard: {
        id: dataJson.id,
        title: dataJson.title.trim(),
        category: dataJson.category || 'Без категории',
        description: dataJson.description || '',
        place: dataJson.place || 'Место не указано',
      },
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
    return null
  }
}
