const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function responseItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export async function fetchCollection(component, endpoint = `${API_BASE_URL}/${component}/`) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Unable to load ${component}`)
  return responseItems(await response.json())
}
