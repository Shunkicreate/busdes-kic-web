import { DefaultApi } from '../openapi-generator/typescript-axios';
import { Configuration } from '../openapi-generator/typescript-axios';
import axios from 'axios';

const API_URL = "https://bustimer.azurewebsites.net";

const config = new Configuration({
    basePath: API_URL,
});

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const userApi = new DefaultApi(config, '', axiosInstance);

export {
    userApi
};