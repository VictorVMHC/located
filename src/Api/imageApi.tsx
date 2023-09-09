import api from "./api"

const postImage =(formData: FormData) =>{
    return api.post('/api/uploadImage/', formData,{
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })
    
}

export {
    postImage
}