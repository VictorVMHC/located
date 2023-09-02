import axios from "axios";
import { CLOUDINARY_URL, API_KEY, UPLOAD_PRESET } from '@env';

const apiCloudinary = axios.create({
    baseURL: CLOUDINARY_URL,
    timeout: 15000,
});

export const uploadPhoto = (image: string) => {
    const formData = new FormData();
    formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: 'uploaded_image.jpg',
    });

    let route = `upload?api_key=${API_KEY}&upload_preset=${UPLOAD_PRESET}`;
    
    return apiCloudinary.post(route, {formData});
}
