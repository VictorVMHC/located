export interface Product {
    _id?:string,
    productName: string,
    localId: string,
    price: number,
    img: string,
    description: string,
    tags:[]
}