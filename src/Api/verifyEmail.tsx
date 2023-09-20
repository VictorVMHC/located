import {User} from "../Interfaces/UserInterface";
import api from "./api";

const VerifyEmail = (email: string, lang: string) => {
    return api.post('/api/verifyEmail',{email,lang});
}

const VerifiedEmail = (email: string, lang: string) => {
    var route =`/api/verifyEmail/${email}/${lang}`
    return api.get(route);
}

const VerifyCode = (email: string, code: string) => {
    var route = `/api/verifyEmail/${email}/${code}`
    return api.get(route);
}

const deleteVerifyEmail = (email: string) => {
    var route = `/api/verifyEmail/${email}`
    return api.delete(route);
}

const VerifyUserInfo = (user: User) => {
    return api.post('/api/verifyUserInfo',user);
}

const VerifyCodePassword = (email: string, code: string) => {
    var route = `/api/verifyEmail/password${email}/${code}`
    return api.get(route);
}

export {
    VerifyEmail,
    VerifyCode,
    deleteVerifyEmail,
    VerifyUserInfo,
    VerifyCodePassword,
    VerifiedEmail
}