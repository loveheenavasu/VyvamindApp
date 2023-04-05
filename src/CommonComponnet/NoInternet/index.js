import {StyleSheet, View, Text, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import Label from '../Label';
import {NoInternetIcon} from '../../Util/Image';

export default NoInternet = () => {
  return (
    <View style={styles.main}>
      <Image source={NoInternetIcon} resizeMode="contain" style={styles.img} />
      <Label
        styles={styles.txt}
        title={'Please check your Internet Connection'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: scale(100),
    height: scale(100),
  },
  txt: {
    fontSize: scale(16),
    marginTop: scale(10),
  },
});
