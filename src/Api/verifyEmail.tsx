import api from "./api";

const VerifyEmail = (email: string) => {
    console.log(email);
    return api.post('/api/verifyEmail',{email:email});
}

export {
    VerifyEmail
}