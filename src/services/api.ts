import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";
// OR
// const API_BASE_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== User ID Helpers =====
export const getUserId = (): string | null => {
  return localStorage.getItem("userId");
};

export const setUserId = (id: string) => {
  localStorage.setItem("userId", id);
};

export const clearUserId = () => {
  localStorage.removeItem("userId");
};