import React from 'react';
import {View, Linking, TouchableOpacity, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Label from '../Label';

const Footer = () => {
  return (
    <View style={styles.main}>
      <TouchableOpacity>
        <Label styles={styles.faq_Label} title={'FAQ'} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://www.vyvamind.com')}>
        <Label styles={styles.faq_Label} title={'https://www.vyvamind.com'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: verticalScale(30),
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  faq_Label: {
    textDecorationLine: 'underline',
    textDecorationColor: '#40B5AD',
  },
});

export default Footer;
