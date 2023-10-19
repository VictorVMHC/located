import { searchByTags } from "../Api/searchLocalsApi";

const fetchData = async (latitude: number, longitude: number, radioKm: number, tags: string[],  page?: number, limit?:number) => {
    
    try {
        const result = await searchByTags(
            latitude,
            longitude,
            radioKm,
            tags,
            page, 
            limit,
        );

        return result.data

    } catch (error) {
        console.error(error);
    }
};

export {
    fetchData
};