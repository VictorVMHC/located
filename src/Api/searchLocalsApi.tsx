import api from "./api"

const searchLocalsRad = (collection: string,latitude: number, longitude: number, kilometres: number) => {
    const route = `/api/searchLocals/${collection}/${latitude}/${longitude}/${kilometres}`
    return api.get(route);
}

const searchCloseTome = (collection: string,latitude: number, longitude: number, kilometres: number, tags: string) => {
    const route = `/api/searchLocals/${collection}/${latitude}/${longitude}/${kilometres}/${tags}`
    return api.get(route);
}

const searchByUser = () => {
    return api.get('/api/searchLocals/byUser');
}

export {
    searchLocalsRad,
    searchCloseTome,
    searchByUser,
}