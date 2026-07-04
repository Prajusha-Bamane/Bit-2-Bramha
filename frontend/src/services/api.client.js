import axios from 'axios';

let accessToken = '';

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Access Token header
apiClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Catch expired tokens and handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 Unauthorized and request has not been retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      const errCode = error.response.data?.error?.code;

      if (errCode === 'TOKEN_EXPIRED') {
        originalRequest._retry = true;
        try {
          // Issue refresh request using HttpOnly cookie credentials
          const res = await axios.post(
            'http://localhost:5000/api/v1/auth/refresh',
            {},
            { withCredentials: true }
          );

          const newAccessToken = res.data.data.accessToken;
          setAccessToken(newAccessToken);

          // Retry the original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshErr) {
          setAccessToken('');
          // Trigger a clean logout state reset
          window.dispatchEvent(new Event('auth-session-expired'));
          return Promise.reject(refreshErr);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
