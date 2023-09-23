import api from "./api"

const getProductsByLocalId = (localId: string, page?: number, limit?: number) =>{
    return api.get(`/api/products/byLocalId/${localId}`, {
        params:{
            page,
            limit
        }
    } );
};

export {
    getProductsByLocalId
}