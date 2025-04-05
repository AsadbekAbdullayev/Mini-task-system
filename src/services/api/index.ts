import { message } from 'antd';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const request = axios.create({
	baseURL: BASE_URL,
	timeout: 30000,
});

request.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem('token');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

// ✅ Response Interceptor - Handle errors globally
request.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error) => {
		const status = error.response?.status;
		const location = window.location.pathname;

		if (status === 401 || status === 403) {
			if (location !== '/login') {
				localStorage.clear();
				window.location.pathname = '/login';
				message.error('Please login again.');
			}
		}

		return Promise.reject(error);
	},
);

export default request;
