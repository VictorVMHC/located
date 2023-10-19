import api from "./api"

const getRecommendation = () =>{
    return api.get(`/api/recommendations/`);
};

export {
    getRecommendation
}