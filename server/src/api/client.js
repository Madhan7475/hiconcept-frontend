import axios from "axios";

// ======================
// 🌐 Base URL (PRODUCTION SAFE)
// ======================
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Prevent silent fallback to localhost in production
if (!API_BASE_URL) {
  console.error(
    "❌ VITE_API_BASE_URL is not defined in environment variables"
  );
}

// ======================
// Axios instance
// ======================
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// ======================
// 🔐 Attach JWT token automatically
// ======================
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ======================
// ⚠️ Global error handling
// ======================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "❌ API Error:",
      error?.response?.data || error.message
    );
    return Promise.reject(error);
  }
);


// ======================
// 🚀 API METHODS
// ======================
export const api = {
  // ======================
  // Content APIs
  // ======================
  getContent: (section) =>
    apiClient.get(`/content/${section}`),

  updateContent: (section, data) =>
    apiClient.put(`/content/${section}`, data),


  // ======================
  // Services APIs
  // ======================
  getServices: () =>
    apiClient.get("/services"),

  createService: (data) =>
    apiClient.post("/services", data),

  updateService: (id, data) =>
    apiClient.put(`/services/${id}`, data),

  deleteService: (id) =>
    apiClient.delete(`/services/${id}`),


  // ======================
  // Upload API
  // ======================
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};

export default apiClient;