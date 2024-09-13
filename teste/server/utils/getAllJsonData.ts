export async function getAllJsonData(json: string) {
  const data: withId<object>[] | null = await useStorage('assets:server').getItem(json)

  if (!data) {
    return { error: 'JSON data not found!' }
  }

  return data
}
