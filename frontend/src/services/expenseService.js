import axios from 'axios'

const EXPENSE_API_BASE_URL = import.meta.env.VITE_EXPENSE_API_BASE_URL || 'http://localhost:8082'

const expenseApiClient = axios.create({
  baseURL: EXPENSE_API_BASE_URL,
})

expenseApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken')
  const tokenType = localStorage.getItem('tokenType') || 'Bearer'

  if (token) {
    config.headers.Authorization = `${tokenType} ${token}`
  }

  return config
})

export async function addExpense(payload) {
  const response = await expenseApiClient.post('/api/expenses', payload)
  return response.data
}

export async function getUserExpenses(userId) {
  const response = await expenseApiClient.get(`/api/expenses/user/${userId}`)
  return response.data
}

export async function updateExpense(id, payload) {
  const response = await expenseApiClient.put(`/api/expenses/${id}`, payload)
  return response.data
}

export async function deleteExpense(id) {
  await expenseApiClient.delete(`/api/expenses/${id}`)
}
