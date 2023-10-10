import api from "./api"

const searchLocalWithLikes = (latitude: number, longitude: number, kilometers: number, userId: string) => {
    const route = `/api/searchLocals/searchLocalsAndLikes/${latitude}/${longitude}/${kilometers}/${userId}`
    return api.get(route);
}

const searchByTags = (latitude: number, longitude: number, kilometers: number, tags: string[], userId: string, page?: number, limit?:number) => {
    const route = `/api/searchLocals/byTags/${latitude}/${longitude}/${kilometers}/${tags}/${userId}`;
    return api.get(route, {
        params:{
            page,
            limit
        }
    } );
}

const searchPopularLocals = (latitude: number, longitude: number, kilometers: number, userId: string) => {
    const route = `/api/searchLocals/localsPopular/${latitude}/${longitude}/${kilometers}/${userId}`;
    return api.get(route);
}

const searchByUser = () => {
    return api.get('/api/searchLocals/byUser');
}

export {
    searchLocalWithLikes,
    searchByTags,
    searchPopularLocals,
    searchByUser,
}
