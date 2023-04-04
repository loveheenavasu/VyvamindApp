import { View } from 'react-native';
import Toast from 'react-native-toast-message';

interface Props {
    status: string,
    msg: string
}
const ToastMsg = (props: Props) => {
    const { status, msg } = props;
    console.log('Status-->', status);
    console.log('msg-->', msg);

    const showToast = (status: string, msg: string) => {
        Toast.show({
            type: status,
            text1: msg,
        })
    };
    showToast(status, msg)
    return (
        <View />
    )
}

export default ToastMsg