import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && error.response.data.message === 'Token expiré.') {
      try {
        const refreshResponse = await api.post('/auth/refresh');
        const newToken = refreshResponse.data.token;

        localStorage.setItem('token', newToken);

        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config);
      } catch (refreshError) {
        console.error('Erreur lors du rafraîchissement du token :', refreshError.message);
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const { data } = await api.post('/auth/register', { ...userData, role: 'pelerin' });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const { data } = await api.get('/auth/profile');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPelerins = async (page = 1, limit = 25) => {
  try {
    console.log(`Appel API : /pelerins?page=${page}&limit=${limit}`);
    const response = await api.get(`/pelerins?page=${page}&limit=${limit}`);
    console.log('Données reçues de l\'API :', response.data);
    return response.data; // Supposant { success: true, data: [...] }
  } catch (error) {
    console.error('Erreur lors de l\'appel API :', error.message || error);
    throw error;
  }
};

export const searchPelerins = async (query) => {
  try {
    console.log(`Appel API pour rechercher : /pelerins/search?query=${query}`);
    const response = await api.get(`/pelerins/search?query=${query}`);
    console.log('Données reçues lors de la recherche :', response.data);
    return response.data; // Supposant { success: true, data: [...] }
  } catch (error) {
    console.error('Erreur lors de la recherche des pèlerins :', error.message || error);
    throw error;
  }
};

export const exportPelerins = async () => {
  try {
    console.log('Appel API pour exporter les pèlerins : /pelerins/export');
    const response = await api.get('/pelerins/export', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pelerins.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Exportation réussie.');
  } catch (error) {
    console.error('Erreur lors de l\'exportation des pèlerins :', error.message || error);
    throw error;
  }
};

export const importPelerins = async (formData) => {
  try {
    console.log('Appel API pour importer des pèlerins : /pelerins/import');
    const response = await api.post('/pelerins/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('Importation réussie :', response.data);
    return response.data; // Supposant { success: true }
  } catch (error) {
    console.error('Erreur lors de l\'importation des pèlerins :', error.message || error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export default api;
