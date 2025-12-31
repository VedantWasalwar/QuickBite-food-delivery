/**
 * API Service - Handles all API calls to the backend
 * Works for both Local & Render Production
 */

import axios from "axios";

// ✅ API BASE URL Configuration
// Priority: Environment variable > Development detection > Production default
const getApiUrl = () => {
  // 1. Check for explicit backend URL in environment variable (highest priority)
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  
  // 2. Development mode - use local backend
  if (import.meta.env.MODE === "development" || import.meta.env.DEV) {
    return "http://127.0.0.1:8000/api";
  }
  
  // 3. Production mode - use Render backend
  // Backend is deployed at: https://quickbite-food-delivery-1.onrender.com/api
  return "https://quickbite-food-delivery-1.onrender.com/api";
};

const API_URL = getApiUrl();

// Get base backend URL (without /api) for image URLs
export const getBackendBaseUrl = () => {
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL.replace('/api', '');
  }
  if (import.meta.env.MODE === "development" || import.meta.env.DEV) {
    return "http://127.0.0.1:8000";
  }
  return "https://quickbite-food-delivery-1.onrender.com";
};

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  // If image path already starts with http, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Otherwise, prepend backend base URL
  return `${getBackendBaseUrl()}${imagePath}`;
};

// Log API URL in development for debugging
if (import.meta.env.MODE === "development") {
  console.log("🔗 API Base URL:", API_URL);
  console.log("🔗 Backend Base URL:", getBackendBaseUrl());
}

// Axios instance with error handling
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout for Render (which can be slow on free tier)
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("⏱️ Request timeout - Backend might be slow or unavailable");
    } else if (error.response) {
      // Server responded with error status
      console.error("❌ API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error("🔌 No response from backend. Check if backend is running at:", API_URL);
    } else {
      console.error("❌ Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

// ---------------- AUTH ----------------
export const registerUser = async (username, email, password) => {
  const res = await api.post("/register/", {
    username,
    email,
    password,
  });
  return res.data;
};

export const loginUser = async (username, password) => {
  const res = await api.post("/login/", {
    username,
    password,
  });
  return res.data;
};

// ---------------- FOODS ----------------
export const getFoods = async () => {
  const res = await api.get("/foods/");
  return res.data;
};

// ---------------- CART ----------------
export const getCart = async () => {
  const res = await api.get("/cart/");
  return res.data;
};

export const addToCart = async (foodId, quantity = 1) => {
  const res = await api.post("/cart/add/", {
    food_id: foodId,
    quantity,
  });
  return res.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const res = await api.put(`/cart/update/${itemId}/`, {
    quantity,
  });
  return res.data;
};

export const removeFromCart = async (itemId) => {
  const res = await api.delete(`/cart/update/${itemId}/`);
  return res.data;
};

// ---------------- ORDER ----------------
export const createOrder = async () => {
  const res = await api.post("/order/create/");
  return res.data;
};

export default api;
