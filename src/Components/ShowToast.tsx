import { ToastAndroid } from 'react-native';

export const ShowToast = (title: string) => {
    ToastAndroid.showWithGravityAndOffset(
        title,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
    );
};