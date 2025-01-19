import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://threadedstoriesapi.vilet.tech/api',
    headers: {
        'Content-Type': 'Application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
