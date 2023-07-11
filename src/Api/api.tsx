import axios from "axios";
import { BASE_URL } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if ( token ) {
            config.headers['x-token'] = token;
        }
        return config;
    }
);

export default api;