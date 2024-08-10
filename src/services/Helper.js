import axios from 'axios';
import { getToken } from '../auth';

export const Base_URL = 'https://blogappapi-09cf97720945.herokuapp.com/api/v1';

export const myAxios = axios.create({
    baseURL: Base_URL
});

export const privateAxios = axios.create({
    baseURL: Base_URL
});

privateAxios.interceptors.request.use(config => {
    const token = getToken();
    console.log(token);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}
);