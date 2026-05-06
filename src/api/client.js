import contentData from "../data/content.json";
import servicesData from "../data/services.json";

export const api = {
  // ======================
  // Auth APIs (Mocked)
  // ======================
  login: async (credentials) => ({
    data: { token: "mock-token", user: { name: "Admin" } }
  }),

  // ======================
  // Content APIs (Mocked)
  // ======================
  getContent: async (section) => ({
    data: contentData[section] || {}
  }),

  updateContent: async (section, data) => ({
    data: { ...contentData[section], ...data }
  }),

  // ======================
  // Services APIs (Mocked)
  // ======================
  getServices: async () => ({
    data: servicesData
  }),

  createService: async (data) => ({
    data: { ...data, _id: Date.now().toString() }
  }),

  updateService: async (id, data) => ({
    data: { ...servicesData.find(s => s._id === id), ...data }
  }),

  deleteService: async (id) => ({
    data: { success: true }
  }),

  // ======================
  // Upload API (Mocked)
  // ======================
  uploadImage: async (file) => {
    return {
      data: { url: "/public/01.jpg" }
    };
  },
};

export default {
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} }
  }
};