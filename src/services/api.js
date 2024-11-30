import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const register = (formData) => API.post('/register/', formData);
export const login = (formData) => {
  const form = new FormData();
  for (const key in formData) {
    form.append(key, formData[key]);
  }
  return API.post('/login/', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Task APIs
export const createTask = (formData) => {
  const form = new FormData();
  for (const key in formData) {
    form.append(key, formData[key]);
  }
  return API.post('/tasks/', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const fetchTasks = (page, pageSize = 10) =>
  API.get('/tasklist_view/', {
    params: { page_number: page, page_size: pageSize },
  });
export const updateTask = (formData) => {
  const form = new FormData();
  for (const key in formData) {
    if (formData[key] !== null && formData[key] !== undefined) {
      form.append(key, formData[key]);
    }
  }
  return API.put('/tasks_update/', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteTask = (taskId) => {
  const form = new FormData();
  form.append('id', taskId);
  return API.delete('/taskdetail_delete/', { data: form });
};

export const fetchUserProfile = (pageNumber, pageSize) => {
  const formData = new FormData();
  formData.append('page_number', pageNumber);
  formData.append('page_size', pageSize);

  return API.get('/profile/', {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      page_number: pageNumber,
      page_size: pageSize,
    },
  });
};
