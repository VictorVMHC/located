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

const putProduct = async ({ productId, updatedProduct }: { productId: string, updatedProduct: Product }) => {
    return api.put(`/api/products/${productId}`, updatedProduct);
}

const deleteProduct = (productId: string) => {
    return api.delete(`/api/products/${productId}`);
};


export {
    getProductsByLocalId,
    postProduct,
    putProduct,
    deleteProduct
}