import api from "./api";

const VerifyEmail = (email: string) => {
    return api.post('/api/verifyEmail',{email});
}

const VerifyCode = (email: string, code: string) => {
    var route = `/api/verifyEmail/${email}/${code}`

    return api.get(route);
}
export {
    VerifyEmail,
    VerifyCode
}