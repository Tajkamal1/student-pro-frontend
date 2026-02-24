import axios from "axios";

const API_BASE_URL = "https://student-pro-backend.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Helper to get userId from localStorage
export const getUserId = (): string | null => {
  return localStorage.getItem("userId");
};

// Helper to set userId
export const setUserId = (id: string) => {
  localStorage.setItem("userId", id);
};

// Helper to clear userId (logout)
export const clearUserId = () => {
  localStorage.removeItem("userId");
};
