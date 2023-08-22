import api from "./api"

const addCategory = (category: string) =>{
    return api.post('/api/businessTypes', {category} );
};

const getCategories = (page?: number, perPage?: number) =>{
    return api.get('/api/categories', {
        params:{
            page,
            perPage
        }
    } );
};

export {
    addCategory,
    getCategories
}