import api from "./api"
import {Product} from "../Interfaces/ProductsInterfaces";

const postProduct = (product: Product) => {
    return api.post('/api/products/', product);
};

const getProductsByLocalId = (localId: string, page?: number, limit?: number) =>{
    return api.get(`/api/products/byLocalId/${localId}`, {
        params:{
            page,
            limit
        }
    } );
};

export {
    getProductsByLocalId,
    postProduct
}