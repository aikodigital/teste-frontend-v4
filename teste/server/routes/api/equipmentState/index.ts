export default defineEventHandler(async (event) => {
  const json: string = `equipmentState.json`

  if (event.method.toString() == 'GET') {
    return getAllJsonData(json)
  }
  else {
    return { error: 'Invalid HTTP method for this route!' }
  }
})
