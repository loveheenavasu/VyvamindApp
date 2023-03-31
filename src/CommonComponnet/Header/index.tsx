import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Label from '../Label';

interface Props {
  title?: string;
  showBtn?: boolean;
  clickLogout?: () => void;
}

const Header = (props: Props) => {
  const {title, showBtn, clickLogout} = props;
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.f_Child}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={scale(16)} color={'#000'} />
      </TouchableOpacity>
      <View style={styles.s_Child}>
        <Label styles={styles.title_Label} title={title} />
      </View>
      {showBtn && (
        <TouchableOpacity style={styles.submit_Button} onPress={clickLogout}>
          <Label styles={styles.delete_Label} title={'Delete Account'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: scale(48),
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
    borderRadius: scale(10),
    backgroundColor: '#40B5AD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: scale(10),
  },
  delete_Label: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: scale(12),
  },
  title_Label: {
    fontWeight: '500',
    fontSize: scale(14),
    color: '#000',
  },
});

export default Header;
