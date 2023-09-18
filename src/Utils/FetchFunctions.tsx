import { searchByTags } from "../Api/searchLocalsApi";

let processedIDs: string[] = [];

const fetchData = async (latitude: number, longitude: number, radioKm: number, tags: string) => {
    try {
        console.log('Obteniendo datos...');

        if (processedIDs.length > 0) {
            processedIDs = [];
        }
        const resultados = await searchByTags(
            latitude,
            longitude,
            radioKm,
            tags
        );
        const paginatedResults = resultados.data.results;

        const uniqueResults = paginatedResults.filter((result: any) => {
            if (!processedIDs.includes(result._id)) {
                processedIDs.push(result._id);
                return true;
            }
            return false;
        });

        console.log(uniqueResults);
        return uniqueResults;
    } catch (error) {
        console.error(error);
    }
};


export {
    fetchData
};