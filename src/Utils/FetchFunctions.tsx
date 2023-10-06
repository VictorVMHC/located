import { searchByTags } from "../Api/searchLocalsApi";

const fetchData = async (latitude: number, longitude: number, radioKm: number, tags: string[],userId: string,  page?: number, limit?:number) => {
    console.log(radioKm);
    
    try {
        const result = await searchByTags(
            latitude,
            longitude,
            radioKm,
            tags,
            userId,
            page, 
            limit,
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
};


export {
    fetchData
};