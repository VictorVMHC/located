import { searchByTags } from "../Api/searchLocalsApi";

const fetchData = async (latitude: number, longitude: number, radioKm: number, tags: string) => {
    try {
        console.log('Obteniendo datos...');
        const resultados = await searchByTags(
            latitude,
            longitude,
            radioKm,
            tags
        );
        const paginatedResults = resultados.data.results;
        console.log(paginatedResults);
        return paginatedResults;
    } catch (error) {
        console.error(error);
    }
};

export {
    fetchData
};