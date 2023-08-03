import api from "./api";

const VerifyEmail = (email: string) => {
    return api.post('/api/verifyEmail',{email});
}

const VerifyCode = (email: string, code: string) => {
    return api.get('/api/verifyEmail', {
        params:{
            email,
            code
        }
    });
}
export {
    VerifyEmail
}