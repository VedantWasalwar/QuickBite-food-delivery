/**
 * API Service - Handles all API calls to the backend
 * Works for both Local & Render Production
 */

import axios from "axios";

// ✅ API BASE URL
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:8000/api"
    : "https://quickbite-food-delivery-1.onrender.com/api";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
