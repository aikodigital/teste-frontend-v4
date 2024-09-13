export default defineEventHandler(async (event) => {
  const json: string = `equipmentPositionHistory.json`
  const id: string | undefined = getRouterParam(event, 'id')?.toString()

  if (event.method.toString() == 'GET') {
    return getJsonEntry(json, id)
  }
  else {
    return { error: 'Invalid HTTP method for this route!' }
  }
})
