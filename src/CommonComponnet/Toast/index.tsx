import {View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';

interface Props {
  status: string;
  msg: string;
}

const ToastMsg = (props: Props) => {
  const {status, msg} = props;
  return Toast.show({
    type: status,
    text1: msg,
    position: 'bottom',
    bottomOffset: verticalScale(80),
    visibilityTime: 1700,
  });
};
export default ToastMsg;
