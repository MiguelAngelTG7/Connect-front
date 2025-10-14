const API_BASE_URL = 'http://127.0.0.1:8000';

// Función para obtener el token del localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json',
  } : {
    'Content-Type': 'application/json',
  };
};

export const api = {
  // GET request
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error response:', errorData);
      throw new Error(`HTTP error! status: ${response.status} - ${errorData}`);
    }
    return response.json();
  },

  // POST request
  post: async (endpoint, data) => {
    console.log('Enviando datos:', data); // Para debug
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error response:', errorData);
      throw new Error(`HTTP error! status: ${response.status} - ${errorData}`);
    }
    return response.json();
  },

  // PUT request
  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error response:', errorData);
      throw new Error(`HTTP error! status: ${response.status} - ${errorData}`);
    }
    return response.json();
  },

  // DELETE request
  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error response:', errorData);
      throw new Error(`HTTP error! status: ${response.status} - ${errorData}`);
    }
    return response.json();
  },

  // Funciones específicas para autenticación
  login: async (username, password) => {
    return api.post('/api/login/', { username, password });
  },

  register: async (username, password, email = '') => {
    return api.post('/api/register/', { username, password, email });
  },

  logout: async () => {
    return api.post('/api/logout/', {});
  },

  // Funciones específicas para el diario
  diario: {
    // Obtener todas las entradas
    getEntradas: async () => {
      return api.get('/api/diario/entradas/');
    },

    // Crear nueva entrada
    crearEntrada: async (entradaData) => {
      return api.post('/api/diario/entradas/', entradaData);
    },

    // Obtener entrada específica
    getEntrada: async (id) => {
      return api.get(`/api/diario/entradas/${id}/`);
    },

    // Actualizar entrada
    actualizarEntrada: async (id, entradaData) => {
      return api.put(`/api/diario/entradas/${id}/`, entradaData);
    },

    // Eliminar entrada
    eliminarEntrada: async (id) => {
      return api.delete(`/api/diario/entradas/${id}/`);
    },

    // Obtener entradas recientes
    getEntradasRecientes: async () => {
      return api.get('/api/diario/recientes/');
    },
  }
};