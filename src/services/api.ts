import axios from "axios";

/*
====================================================
✅ API BASE URL SWITCHING
====================================================
Development  → localhost
Production   → Render backend
====================================================
*/

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5000"
    : "https://student-pro-1wgo.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// USER ID HELPERS
// ===============================

export const getUserId = (): string | null => {
  return localStorage.getItem("userId");
};

export const setUserId = (id: string) => {
  localStorage.setItem("userId", id);
};

export const clearUserId = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
};