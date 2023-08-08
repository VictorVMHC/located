import api from "./api";

const VerifyEmail = (email: string) => {
    return api.post('/api/verifyEmail',{email});
}

const VerifyCode = (email: string, code: string) => {
    return api.get('/api/verifyEmail', {
        params:{
            email: 'q2@gmail.com',
            code:  '911594'
        }
    });
}
export {
    VerifyEmail,
    VerifyCode
}