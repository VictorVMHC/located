import axios from "axios";
import { BASE_URL } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
});

api.interceptors.request.use(
    
    
    async(config) => {
        console.log(BASE_URL);
        const token = await AsyncStorage.getItem('x-token');
        
        if ( token && !config.headers['x-token']) {
            config.headers['x-token'] = token;
        }
        
        return config;
    }
);

export default api;