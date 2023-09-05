import api from "./api"

const searchLocalsRad = (collection: string,latitude: number, longitude: number, kilometres: number) => {
    const route = `/api/searchLocals/${collection}/${latitude}/${longitude}/${kilometres}`
    return api.get(route);
}

export {
    searchLocalsRad,
}