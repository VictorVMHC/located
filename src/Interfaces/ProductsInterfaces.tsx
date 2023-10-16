export interface Product {
    _id?:string,
    productName?: string,
    localId?: string,
    price?: number | null,
    img?: string,
    description?: string,
    tags: string[];
}