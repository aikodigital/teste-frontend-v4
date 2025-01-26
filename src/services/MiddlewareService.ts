// import { instance } from 'src/services/Interceptor/interceptor'

export function GetData(file: string) {
  return fetch(`/data/${file}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch the JSON file')
      }
      return response.json()
    })
    .catch((error) => {
      console.error('Error fetching the JSON file:', error)
      throw error
    })
}
