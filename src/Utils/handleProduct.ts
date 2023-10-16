import { Product } from '../Interfaces/ProductsInterfaces';

export const compareProducts = (product: Product, updatedProduct: Product) => {
    const updatedFields: Partial<Product> = {};

    if (product.productName !== updatedProduct.productName && updatedProduct.productName !== undefined) {
        updatedFields.productName = updatedProduct.productName;
    }
    if (product.price !== updatedProduct.price && updatedProduct.price !== undefined) {
        updatedFields.price = updatedProduct.price;
    }
    if (product.description !== updatedProduct.description && updatedProduct.description !== undefined) {
        updatedFields.description = updatedProduct.description;
    }
    if (product.tags !== updatedProduct.tags && updatedProduct.tags !== undefined) {
        updatedFields.tags = updatedProduct.tags;
    }
    if (product.img !== updatedProduct.img && updatedProduct.img !== undefined) {
        updatedFields.img = updatedProduct.img;
    }

    return updatedFields;
};