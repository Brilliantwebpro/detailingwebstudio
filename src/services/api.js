const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const safeParseJson = async (response) => {
  const raw = await response.text();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const extractApiError = (data, response) => {
  if (data?.error) return data.error;
  if (data?.message) return data.message;
  if (Array.isArray(data?.errors) && data.errors.length) {
    return data.errors[0]?.msg || data.errors[0]?.message || 'Validation failed';
  }
  return `Request failed (${response.status} ${response.statusText})`;
};

// Helper for making API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await safeParseJson(response);

  if (!response.ok) {
    throw new Error(extractApiError(data, response));
  }

  return data || { success: true };
};

// Auth API
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  getMe: () => apiRequest('/auth/me'),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Leads API
export const leadsAPI = {
  submitDemo: (formData) => apiRequest('/leads/demo', {
    method: 'POST',
    body: JSON.stringify(formData)
  }),

  submitContact: (formData) => apiRequest('/leads/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  }),

  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/leads?${query}`);
  },

  getOne: (id) => apiRequest(`/leads/${id}`),

  updateStatus: (id, status) => apiRequest(`/leads/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),

  addNote: (id, text) => apiRequest(`/leads/${id}/notes`, {
    method: 'POST',
    body: JSON.stringify({ text })
  }),

  delete: (id) => apiRequest(`/leads/${id}`, {
    method: 'DELETE'
  }),

  getStats: () => apiRequest('/leads/stats/overview')
};

// Contact API
export const contactAPI = {
  submit: (formData) => apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  }),

  getConfig: () => apiRequest('/contact/config')
};

// Chatbot API
export const chatbotAPI = {
  sendMessage: (sessionId, message, userInfo = {}) => apiRequest('/chatbot/message', {
    method: 'POST',
    body: JSON.stringify({ sessionId, message, userInfo })
  }),

  captureLead: (sessionId, leadData) => apiRequest('/chatbot/capture-lead', {
    method: 'POST',
    body: JSON.stringify({ sessionId, ...leadData })
  }),

  getHistory: (sessionId) => apiRequest(`/chatbot/history/${sessionId}`),

  quickAction: (action, sessionId) => apiRequest('/chatbot/quick-action', {
    method: 'POST',
    body: JSON.stringify({ action, sessionId })
  })
};

// Admin API
export const adminAPI = {
  getDashboard: () => apiRequest('/admin/dashboard'),

  getUsers: () => apiRequest('/admin/users'),

  createUser: (userData) => apiRequest('/admin/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  deleteUser: (id) => apiRequest(`/admin/users/${id}`, {
    method: 'DELETE'
  }),

  resetUserPassword: (id, newPassword) => apiRequest(`/admin/users/${id}/reset-password`, {
    method: 'POST',
    body: JSON.stringify({ newPassword })
  }),

  toggleUserStatus: (id) => apiRequest(`/admin/users/${id}/toggle-status`, {
    method: 'POST'
  }),

  updateUserRole: (id, role) => apiRequest(`/admin/users/${id}/update-role`, {
    method: 'POST',
    body: JSON.stringify({ role })
  }),

  changePassword: (currentPassword, newPassword) => apiRequest('/admin/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword })
  }),

  exportLeads: () => apiRequest('/admin/export/leads')
};

// Utility functions
export const generateSessionId = () => {
  return 'chat_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export const getStoredSessionId = () => {
  let sessionId = localStorage.getItem('chatSessionId');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('chatSessionId', sessionId);
  }
  return sessionId;
};

export default {
  auth: authAPI,
  leads: leadsAPI,
  contact: contactAPI,
  chatbot: chatbotAPI,
  admin: adminAPI,
  generateSessionId,
  getStoredSessionId
};
