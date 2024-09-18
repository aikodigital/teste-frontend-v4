export async function getJsonEntry(json: string, id: string | undefined) {
  const data: WithId<object>[] | null = await useStorage('assets:server').getItem(json)

  if (!data) {
    return { error: 'JSON data not found!' }
  }

  if (id === undefined) {
    return { error: 'Id is undefined!' }
  }

  return data.find(item => item.id === id)
}
