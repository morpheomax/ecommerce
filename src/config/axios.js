import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backendproyecto5.onrender.com/', // URL base de tu API
  // baseURL: 'http://localhost:8080/', // URL base de tu API
  headers: {
    'Content-Type': 'application/json',
    
  },
});

export default instance;
