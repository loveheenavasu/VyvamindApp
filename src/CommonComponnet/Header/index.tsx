import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Label from '../Label';

interface Props {
  title?: string;
}

const Header = (props: Props) => {
  const {title} = props;
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.f_Child}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={scale(16)} color={'#000'} />
      </TouchableOpacity>
      <View style={styles.s_Child}>
        <Label styles={{fontWeight: '500'}} title={title} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: scale(45),
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  },
  f_Child: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s_Child: {
    width: '70%',
    marginRight: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
