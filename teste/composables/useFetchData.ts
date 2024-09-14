import type { FetchError } from 'ofetch'

export const useFetchData = async <T>(url: string) => {
  const error = ref<string>('')
  const data = ref<T | null>(null)

  try {
    data.value = await $fetch<T>(url).catch((err: FetchError) => {
      throw `${err.status}: [${err.statusText}] ${err.response?._data?.message || 'Unknown error.'}`
    })
  }
  catch (e) {
    if (typeof e === 'string') {
      error.value = e
    }
    else {
      error.value = 'Unknown error.'
    }
  }

  return { data, error }
}
