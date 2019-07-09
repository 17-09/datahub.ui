export const API_URL = `http://localhost:5000/api`;

export function makeUrl(endpoint) {
  if (!endpoint.startsWith('/')) return `${API_URL}/${endpoint}`;

  return `${API_URL}${endpoint}}`;
}
