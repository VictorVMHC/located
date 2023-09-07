import api from "./api";

const createLocal = (businessType: string) =>{
    return api.post('/api/businessTypes', {businessType} );
};