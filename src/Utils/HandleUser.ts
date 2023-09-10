import { statusCodes } from '@react-native-google-signin/google-signin';
import { CustomAlert } from '../Components/CustomAlert';
import { User } from '../Interfaces/UserInterface'

export const compareUsers = (user: User, updatedUser: User) => {
    const updatedFields: Partial<User> = {};

    if (user.name !== updatedUser.name && updatedUser.name !== undefined) {
        updatedFields.name = updatedUser.name;
    }
    if (user.username !== updatedUser.username && updatedUser.username !== undefined) {
        updatedFields.username = updatedUser.username;
    }
    if (user.email !== updatedUser.email && updatedUser.email !== undefined) {
        updatedFields.email = updatedUser.email;
    }
    if (user.phone !== updatedUser.phone && updatedUser.phone !== undefined) {
        updatedFields.phone = updatedUser.phone;
    }
    if (user.age !== updatedUser.age && updatedUser.age !== undefined) {
        updatedFields.age = updatedUser.age;
    }
    if (user.image !== updatedUser.image && updatedUser.image !== undefined) {
        updatedFields.image = updatedUser.image;
    }

    return updatedFields;
};


export const handleGoogleSignInErrors = (error: any) => {
        
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        CustomAlert({
            title: 'Sing Up Canceled',
            desc: 'Google signing was canceled, !please try again¡'
        });
    } else if (error.code === statusCodes.IN_PROGRESS) {
        CustomAlert({
            title: 'In progress to verify',
            desc: 'Google signing is verifying your account, !please try again¡'
        });
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        CustomAlert({
            title: 'Play services not available',
            desc: 'It looks that your phone does not have google play services, !please try again¡'
        });
    } else {
        CustomAlert({
            title: 'Sorry we are experience some problems',
            desc: 'It looks that we are experiences som problems to sign up , !please try again¡'
        });
    }
};