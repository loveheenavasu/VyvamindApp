import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Label from '../../CommonComponnet/Label';
import FastImage from 'react-native-fast-image';
import {SplashIcon} from '../../Util/image';
import Toast from 'react-native-toast-message';
import {isEmailValid} from '../../Util/Validator';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

const Purchase = () => {
  const navigation = useNavigation<any>();
  const [quantity, setQuantity] = useState<string>('');
  const [dose, setDose] = useState<string>('');
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');

  const submit = () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Please enter email',
      });
    } else if (isEmailValid(email.trim())) {
      Toast.show({
        type: 'error',
        text1: 'Please enter valid email',
      });
    } else {
      setShowLogin(!showLogin);
    }
  };

  const submitQuantity = () => {
    if (!quantity || !dose) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AfterLoginStack'}],
        }),
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="handled">
        <View style={styles.main}>
          <FastImage
            style={styles.logo}
            source={SplashIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
          {showLogin ? (
            <View style={{width: '100%'}}>
              <Label title={'Please enter Email'} />
              <TextInput
                style={styles.editText}
                autoFocus={false}
                placeholder={'Please enter email'}
                value={email}
                onChangeText={txt => setEmail(txt.trim())}
              />
              <TouchableOpacity
                style={styles.submit_Button}
                onPress={() => submit()}>
                <Label
                  styles={{color: '#FFF', fontWeight: 'bold'}}
                  title={'Submit'}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.first_Row}>
                <View style={[styles.select_Qun_Con]}>
                  <Label
                    styles={styles.select_Qunatity_Label}
                    title="Please enter Quantity"
                  />
                </View>
                <View style={styles.drop_Con}>
                  <TextInput
                    style={styles.qunatity_Edit}
                    numberOfLines={1}
                    keyboardType={'numeric'}
                    placeholder={'Please enter quantity'}
                    value={quantity}
                    onChangeText={text =>
                      setQuantity(text.replace(/[^0-9]/g, ''))
                    }
                  />
                </View>
              </View>
              <View style={styles.first_Row}>
                <View style={styles.select_Qun_Con}>
                  <Label
                    styles={styles.select_Qunatity_Label}
                    title="Please enter Dose"
                  />
                </View>
                <View style={styles.drop_Con}>
                  <TextInput
                    style={styles.qunatity_Edit}
                    numberOfLines={1}
                    keyboardType={'numeric'}
                    placeholder={'Please enter Dose'}
                    value={dose}
                    onChangeText={txt => setDose(txt.replace(/[^0-9]/g, ''))}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.submit_Button}
                onPress={() => submitQuantity()}>
                <Label
                  styles={{color: '#FFF', fontWeight: 'bold'}}
                  title={'Submit'}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Purchase;
