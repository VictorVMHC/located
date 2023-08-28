import api from "./api"

const addBusinessType = (businessType: string) =>{
    return api.post('/api/businessTypes', {businessType} );
};

const getBusinessTypes = (page?: number, perPage?: number) =>{
    return api.get('/api/businessTypes', {
        params:{
            page,
            perPage
        }
    } );
};

export {
    addBusinessType,
    getBusinessTypes
}