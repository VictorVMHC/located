import { searchByTags } from "../Api/searchLocalsApi";

let prevRadioKm: number | null = null; 
let processedIDs = new Set<string>();

const fetchData = async (latitude: number, longitude: number, radioKm: number, tags: string, limit: number) => {
    try {
        console.log('Obteniendo datos...');

        if (prevRadioKm !== null && radioKm !== prevRadioKm) {
            processedIDs.clear();
        }

        prevRadioKm = radioKm;
        const resultados = await searchByTags(
            latitude,
            longitude,
            radioKm,
            tags,
            limit
        );
        const paginatedResults = resultados.data.results;
        console.log(paginatedResults);

        const uniqueResults = paginatedResults.filter((result: any) => {
            if (!processedIDs.has(result._id)) {
                processedIDs.add(result._id);
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