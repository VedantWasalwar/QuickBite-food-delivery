/**
 * API Service - Handles all API calls to the backend
 * This file centralizes all API requests using Axios
 */
import axios from 'axios'

// Base URL for API - dynamically uses current hostname for external access
// If accessing from external device, use the same IP but port 8000
const getApiUrl = () => {
  const hostname = window.location.hostname
  // Use current hostname (works for localhost and network IP)
  return `http://${hostname}:8000/api`
}

const API_URL = getApiUrl()

// User API functions
export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register/`, {
    username,
    email,
    password,
  })
  return response.data
}

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login/`, {
    username,
    password,
  })
  return response.data
}

// Food API functions
export const getFoods = async () => {
  const response = await axios.get(`${API_URL}/foods/`)
  return response.data
}

// Note: We use getFoods() and filter by id since we only have a list endpoint
// For a production app, you'd want a dedicated /api/foods/{id}/ endpoint

// Cart API functions
export const getCart = async () => {
  const response = await axios.get(`${API_URL}/cart/`)
  return response.data
}

export const addToCart = async (foodId, quantity = 1) => {
  const response = await axios.post(`${API_URL}/cart/add/`, {
    food_id: foodId,
    quantity,
  })
  return response.data
}

export const updateCartItem = async (itemId, quantity) => {
  const response = await axios.put(`${API_URL}/cart/update/${itemId}/`, {
    quantity,
  })
  return response.data
}

export const removeFromCart = async (itemId) => {
  const response = await axios.delete(`${API_URL}/cart/update/${itemId}/`)
  return response.data
}

// Order API functions
export const createOrder = async () => {
  const response = await axios.post(`${API_URL}/order/create/`)
  return response.data
}

