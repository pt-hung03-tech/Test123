
const API_BASE_URL = 'http://192.168.1.3:8000/api/';

export const API_ENDPOINTS = {

  LOGIN: `${API_BASE_URL}login/`,
  REGISTER: `${API_BASE_URL}register/`,

  // Finance endpoints
  FINANCE_OVERVIEW: `${API_BASE_URL}finance-overview/`,
  EXPENSE_CATEGORIES: `${API_BASE_URL}expense-categories/`,
  TRANSACTIONS: `${API_BASE_URL}transactions/`,
  CREATE_TRANSACTION: `${API_BASE_URL}transactions/create/`,

  // Category endpoints
  LIST_CATEGORIES: `${API_BASE_URL}categories/`,
  CREATE_CATEGORY: `${API_BASE_URL}categories/create/`,
  UPDATE_CATEGORY: (id) => `${API_BASE_URL}categories/update/${id}/`,
  DELETE_CATEGORY: (id) => `${API_BASE_URL}categories/delete/${id}/`,
  
  //chatbot
  AICHATBOT: `${API_BASE_URL}chat/`,
};