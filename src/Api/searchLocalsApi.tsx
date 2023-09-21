import api from "./api"

const searchLocals = (latitude: number, longitude: number, kilometers: number) => {
    const route = `/api/searchLocals/byRange/${latitude}/${longitude}/${kilometers}`
    return api.get(route);
}

const searchByTags = (latitude: number, longitude: number, kilometers: number, tags: string[], page?: number, limit?:number) => {
    const route = `/api/searchLocals/byTags/${latitude}/${longitude}/${kilometers}/${tags}`;
    return api.get(route, {
        params:{
            page,
            limit
        }
    } );
}

export {
    searchLocals,
    searchByTags,
}
