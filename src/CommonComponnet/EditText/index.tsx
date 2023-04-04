import React from 'react';
import {
  TextInput,
  TextStyle,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

interface Props {
  PlaceHolder?: string;
  Style?: TextStyle;
  Value?: string;
  OnChangeText?: (txt: any) => void;
  KeyboradType?: KeyboardTypeOptions | undefined;
  Ref?: string;
  ReturnKeyType?: 'default' | 'go' | 'google' | 'next' | 'done';
  OnSubmit?(): void;
}

const EditText = (props: Props) => {
  const {
    PlaceHolder,
    Style,
    Value,
    OnChangeText,
    KeyboradType,
    Ref,
    ReturnKeyType,
    OnSubmit,
  } = props;
  return (
    <TextInput
      ref={Ref}
      style={[styles.main, Style]}
      value={Value}
      placeholder={PlaceHolder}
      onChangeText={OnChangeText}
      autoFocus={false}
      keyboardType={KeyboradType}
      numberOfLines={1}
      blurOnSubmit={false}
      returnKeyType={ReturnKeyType}
      onSubmitEditing={OnSubmit}
      placeholderTextColor={"grey"}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: verticalScale(40),
    borderRadius: scale(5),
    borderWidth: scale(0.5),
    borderColor: 'grey',
  },
});

export default EditText;
