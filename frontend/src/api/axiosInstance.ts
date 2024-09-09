import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Your backend base URL
  withCredentials: true, // Attach cookies for session-based authentication
});

export default axiosInstance;
