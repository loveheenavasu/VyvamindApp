import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Label from '../Label';

interface Props {
  Title: number;
  onClick?(item: any): void;
}
const Dropdown = (props: Props) => {
  const {Title, onClick} = props;
  return (
    <View style={[style.main]}>
      <View style={style.f_Child}>
        <Label title={Title} />
      </View>
      <TouchableOpacity style={style.s_Child} onPress={onClick}>
        <AntDesign name="caretdown" size={scale(16)} color={'grey'} />
      </TouchableOpacity>
    </View>
  );
};

export default Dropdown;

const style = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    borderWidth: scale(0.7),
    borderRadius: scale(5),
    borderColor: 'grey',
  },
  f_Child: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s_Child: {
    width: '30%',
    height: '100%',
    borderLeftColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: scale(0.7),
  },
});
