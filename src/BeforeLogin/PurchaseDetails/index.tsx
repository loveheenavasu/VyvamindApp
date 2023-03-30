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
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    Storage.getData(UserId)
      .then(res => {
        if (res) {
          let mData = JSON.parse(res);
          setShowLogin(false);
          getData(mData?.uid);
        }
      })
      .catch(Error => {
        console.log('-----Error--->', Error);
      });
  }, [token]);

  const getData = (uid: any) => {
    setShowLoader(true);
    firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        let mRes = documentSnapshot?.data();
        setQuantity(mRes?.bottle?.toString());
        setDose(mRes?.dose?.toString());
        setShowLoader(false);
        if (mRes?.bottle) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AfterLoginStack'}],
            }),
          );
        }
      });
  };

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
      Keyboard.dismiss();
      setShowLoader(true);
      auth()
        .createUserWithEmailAndPassword(email, 'SuperSecretPassword!')
        .then(res => {
          console.log('User account created & signed in!', res);
          Login();
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

  const Login = async () => {
    auth()
      .signInWithEmailAndPassword(email, 'SuperSecretPassword!')
      .then(res => {
        if (res) {
          res?.user
            ?.getIdToken()
            .then(token => {
              Storage.storeData(
                UserId,
                JSON.stringify({
                  uid: res?.user?.uid,
                  email: res?.user?.email,
                  token: token,
                }),
              );
              setToken(token);
              setShowLoader(false);
            })
            .catch(Error => {
              setShowLoader(false);
              console.log('--Error------->', Error);
            });
          setShowLogin(false);
        } else {
          setShowLoader(false);
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
      Keyboard.dismiss();
      setShowLoader(true);
      Storage.getData(UserId)
        .then((res: any) => {
          let userData = JSON.parse(res);
          firestore()
            .collection('Users')
            .doc(userData?.uid)
            .set({
              name: 'Test',
              email: userData?.email,
              uid: userData?.uid,
              token: userData?.token,
              bottle: parseInt(quantity),
              dose: parseInt(dose),
              time: new Date(),
            })
            .then(res => {
              setShowLoader(false);
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'AfterLoginStack'}],
                }),
              );
            })
            .catch(Error => {
              setShowLoader(false);
              console.log('---Error----->', Error);
            });
        })
        .catch(Error => {
          console.log('-Error------->', Error);
        });
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
