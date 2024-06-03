// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Mock server URL for login
});

export const fetchPosts = (page) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);
};

export const login = (data) => {
    // Note: Adjust the endpoint to match your authentication logic
    return api.get(`/users`, { params: { email: data.email, password: data.password } });
};

export default api;

