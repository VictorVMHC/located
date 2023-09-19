import api from "./api"

const searchLocals = (latitude: number, longitude: number, kilometres: number) => {
    const route = `/api/searchLocals/byRange/${latitude}/${longitude}/${kilometres}`
    return api.get(route);
}

const searchByTags = (latitude: number, longitude: number, kilometres: number, tags: string, limit: number) => {
    const route = `/api/searchLocals/byTags/${latitude}/${longitude}/${kilometres}/${tags}/${limit}`
    return api.get(route);
}

export {
    searchLocals,
    searchByTags,
}