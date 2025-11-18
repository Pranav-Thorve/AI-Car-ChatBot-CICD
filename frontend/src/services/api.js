// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000';

/**
 * Generic API request handler
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Handle different response types
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

/**
 * API Service Methods
 */
export const apiService = {
  /**
   * Generate audio from text
   * @param {string} text - The text to convert to audio
   * @returns {Promise<{text: string, audioUrl: string}>}
   */
  async generateAudio(text) {
    return apiRequest('/generate-audio', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },

  /**
   * Example: Get chat history (if you implement this endpoint)
   * @returns {Promise<Array>}
   */
  async getChatHistory() {
    return apiRequest('/chat/history', {
      method: 'GET',
    });
  },

  /**
   * Example: Save chat session (if you implement this endpoint)
   * @param {Object} sessionData - Session data to save
   * @returns {Promise<Object>}
   */
  async saveChatSession(sessionData) {
    return apiRequest('/chat/save', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  },

  /**
   * Generic GET request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<any>}
   */
  async get(endpoint) {
    return apiRequest(endpoint, {
      method: 'GET',
    });
  },

  /**
   * Generic POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Data to send
   * @returns {Promise<any>}
   */
  async post(endpoint, data) {
    return apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Generic PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Data to send
   * @returns {Promise<any>}
   */
  async put(endpoint, data) {
    return apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Generic DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<any>}
   */
  async delete(endpoint) {
    return apiRequest(endpoint, {
      method: 'DELETE',
    });
  },
};

export default apiService;

