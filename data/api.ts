export function api(path: string, init?: RequestInit) {
  const baseUrl = 'http://localhost:3000'
  const apiPrefix = '/api'

  const url = new URL(`${apiPrefix}${path}`, baseUrl)

  return fetch(url.toString(), init)
}
