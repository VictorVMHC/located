import { Alert } from "react-native";

interface showAlertProps {
    title: string,
    desc: string,
    action: () => void
}

export const CustomAlert = ({title, desc, action}: showAlertProps) => {
    Alert.alert(
        title,
        desc,
        [{ text: 'OK', onPress: () => { action }}],
        { cancelable: false }
    );
}
