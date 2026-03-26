import axios from 'axios'

const API_GATEWAY_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080'

const budgetApiClient = axios.create({
  baseURL: API_GATEWAY_BASE_URL,
})

budgetApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken')
  const tokenType = localStorage.getItem('tokenType') || 'Bearer'

  if (token) {
    config.headers.Authorization = `${tokenType} ${token}`
  }

  return config
})

export async function createBudget(budgetData) {
  const response = await budgetApiClient.post('/budgets', budgetData)
  return response.data
}

export async function getBudgets(userId) {
  const response = await budgetApiClient.get(`/budgets/user/${userId}`)
  return response.data
}
