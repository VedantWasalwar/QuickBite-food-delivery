import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://quickbite-food-backend-wzem.onrender.com/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ---------------- AUTH ----------------
export const loginUser = async (data) => {
  const res = await api.post("login/", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("register/", data);
  return res.data;
};

// ---------------- FOODS ----------------
export const getFoods = async () => {
  const res = await api.get("foods/");
  return res.data;
};

// ---------------- IMAGE ----------------
export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `https://quickbite-food-backend-wzem.onrender.com${path}`;
};

// ---------------- CART ----------------
export const getCart = async () => {
  const res = await api.get("cart/");
  return res.data;
};

export const addToCart = async (food_id, quantity = 1) => {
  const res = await api.post("cart/add/", { food_id, quantity });
  return res.data;
};

export const updateCartItem = async (item_id, quantity) => {
  const res = await api.put(`cart/update/${item_id}/`, { quantity });
  return res.data;
};

// ---------------- ORDER ----------------
export const createOrder = async () => {
  const res = await api.post("order/create/");
  return res.data;
};

export default api;
