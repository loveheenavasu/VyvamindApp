import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import Label from '../../CommonComponnet/Label';
import FastImage from 'react-native-fast-image';
import {SplashIcon} from '../../Util/image';
import Toast from 'react-native-toast-message';
import {isEmailValid} from '../../Util/Validator';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import EditText from '../../CommonComponnet/EditText';
import auth from '@react-native-firebase/auth';
import Loader from '../../CommonComponnet/Loader';
import * as Storage from '../../Service/Storage';
import {UserId} from '../../Util/StorageKey';
import firestore from '@react-native-firebase/firestore';

const Purchase = () => {
  const navigation = useNavigation<any>();
  const [quantity, setQuantity] = useState<string>('');
  const [dose, setDose] = useState<string>('');
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    Storage.getData(UserId)
      .then(res => {
        if (res) {
          setShowLogin(false);
        }
      })
      .catch(Error => {
        console.log('-----Error--->', Error);
      });
  }, []);

  useEffect(() => {
    // const usersCollection = firestore().collection('Users');
    // const userDocument = firestore().collection('Users').doc('ABC');
    // console.log('-------usersCollection---->', usersCollection);
    // console.log('-------userDocument---->', userDocument);
    // firestore()
    //   .collection('Users')
    //   .add({
    //     name: 'Ada Lovelace',
    //     age: 30,
    //   })
    //   .then(() => {
    //     console.log('User added!');
    //   });
  }, []);

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
      setShowLoader(true);
      auth()
        .createUserWithEmailAndPassword(email, 'SuperSecretPassword!')
        .then(res => {
          console.log('User account created & signed in!', res);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Login();
          } else if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            setShowLoader(false);
          } else {
            setShowLoader(false);
          }
          console.error(error);
        });
    }
  };

  const Login = () => {
    auth()
      .signInWithEmailAndPassword(email, 'SuperSecretPassword!')
      .then(res => {
        setShowLoader(false);
        if (res) {
          console.log('--res?.user------->', res?.user?.email);
          Storage.storeData(
            UserId,
            JSON.stringify({uid: res?.user?.uid, email: res?.user?.email}),
          );
          setShowLogin(false);
        }
      })
      .catch(Error => {
        console.log('----Error----->', Error);
      });
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
      {showLoader && <Loader />}
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
              <EditText
                Style={styles.editText}
                PlaceHolder="Please enter emai"
                Value={email}
                OnChangeText={txt => setEmail(txt.trim())}
                KeyboradType={'default'}
                ReturnKeyType={'done'}
                OnSubmit={() => Keyboard.dismiss()}
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
                  <EditText
                    Style={styles.qunatity_Edit}
                    KeyboradType={'numeric'}
                    PlaceHolder={'Please enter quantity'}
                    Value={quantity}
                    OnChangeText={txt =>
                      setQuantity(txt.replace(/[^0-9]/g, ''))
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
                  <EditText
                    Style={styles.qunatity_Edit}
                    KeyboradType={'numeric'}
                    PlaceHolder={'Please enter Dose'}
                    Value={dose}
                    OnChangeText={txt => setDose(txt.replace(/[^0-9]/g, ''))}
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
