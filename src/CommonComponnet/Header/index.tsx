import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Label from '../Label';

interface Props {
  title?: string;
  showBtn?: boolean;
}

const Header = (props: Props) => {

  const { title, showBtn } = props;
  const navigation = useNavigation();

  const _logout = () =>
    Alert.alert('Want to Delete Accout !!!', 'Are you Sure', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.f_Child}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={scale(16)} color={'#000'} />
      </TouchableOpacity>
      <View style={styles.s_Child}>
        <Label styles={{ fontWeight: '500' }} title={title} />
      </View>

      {
        showBtn && (
          <TouchableOpacity
            style={styles.submit_Button}
            onPress={_logout}>
            <Label
              styles={{ color: '#FFF', fontWeight: 'bold' }}
              title={'Delete Account'}
            />
          </TouchableOpacity>
        )
      }
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
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit_Button: {
    width: scale(117),
    height: verticalScale(33),
    borderRadius: scale(10),
    backgroundColor: '#40B5AD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Header;
