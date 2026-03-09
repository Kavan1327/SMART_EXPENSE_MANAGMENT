import axios from 'axios'

const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:8081'

export async function loginUser(credentials) {
  const response = await axios.post(`${AUTH_API_BASE_URL}/api/auth/login`, credentials)
  return response.data
}

export async function registerUser(payload) {
  const response = await axios.post(`${AUTH_API_BASE_URL}/api/auth/register`, payload)
  return response.data
}

export async function logoutUser() {
  const token = localStorage.getItem('jwtToken')
  const tokenType = localStorage.getItem('tokenType') || 'Bearer'

  const headers = token ? { Authorization: `${tokenType} ${token}` } : {}
  const response = await axios.post(`${AUTH_API_BASE_URL}/api/auth/logout`, {}, { headers })
  return response.data
}
