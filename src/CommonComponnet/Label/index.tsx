import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {scale} from 'react-native-size-matters';

interface Props {
  title: number | string |undefined ;
  styles?: TextStyle;
}

const Label = (props: Props) => {
  const {title, styles} = props;
  return <Text style={[style.main, styles]}>{title}</Text>;
};

export default Label;

const style = StyleSheet.create({
  main: {
    fontSize: scale(14),
    fontWeight: 'normal',
    color: '#000',
  },
});
