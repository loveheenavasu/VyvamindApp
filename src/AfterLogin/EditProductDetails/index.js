import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import Header from '../../CommonComponnet/Header';
import FastImage from 'react-native-fast-image';
import {SplashIcon} from '../../Util/image';
import Label from '../../CommonComponnet/Label';
import EditText from '../../CommonComponnet/EditText';
import * as Storage from '../../Service/Storage';
import {UserId} from '../../Util/StorageKey';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../CommonComponnet/Loader';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';

const EditProduct = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState('');
  const [dose, setDose] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    Storage.getData(UserId)
      .then(res => {
        if (res) {
          let mData = JSON.parse(res);
          getData(mData?.uid);
        }
      })
      .catch(Error => {
        console.log('-----Error--->', Error);
      });
  }, []);

  const getData = uid => {
    setShowLoader(true);
    firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        let mRes = documentSnapshot?.data();
        if (mRes) {
          setQuantity(mRes?.bottle?.toString());
          setDose(mRes?.dose?.toString());
        }
        setShowLoader(false);
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
      const currentDate = new Date();
      Storage.getData(UserId)
        .then(res => {
          let userData = JSON.parse(res);
          let totalDoseDay = (parseInt(quantity) * 60) / parseInt(dose);
          let doseEndDay = totalDoseDay - 2;
          currentDate.setDate(currentDate.getDate() + doseEndDay);
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
              startNotificationDate: new Date(currentDate),
            })
            .then(res => {
              setShowLoader(false);
              Toast.show({
                type: 'success',
                text1: 'Dose updated successfully',
              });
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

  const _logout = () =>
    Alert.alert('', 'Are you Sure you want to delete Account?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          let user = auth().currentUser;
          setShowLoader(true);
          firestore()
            .collection('Users')
            .doc(user?.uid)
            .delete()
            .then(() => {
              setShowLoader(true);
              setTimeout(() => {
                user
                  .delete()
                  .then(() => {
                    setShowLoader(false);
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{name: 'BeforeLoginStack'}],
                      }),
                    );
                    Toast.show({
                      type: 'success',
                      text1: 'Your account has been deleted successfully',
                    });
                  })
                  .catch(error => {
                    console.log('-----error--->', error);
                    setShowLoader(false);
                  });
              }, 2000);
            })
            .catch(Error => {
              console.log('--User deleted!----Error---->', Error);
            });
        },
      },
    ]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#FFF'}}>
      {showLoader && <Loader />}
      <Header title="Edit dose details" showBtn clickLogout={() => _logout()} />
      <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="handled">
        <View style={styles.main}>
          <FastImage
            style={styles.logo}
            source={SplashIcon}
            resizeMode={FastImage.resizeMode.contain}
          />

          <View style={styles.first_Row}>
            <View style={[styles.select_Qun_Con]}>
              <Label
                styles={styles.select_Qunatity_Label}
                title="Please enter Quantity"
              />
              <Label
                styles={styles.questionMark}
                title={'*No of Bottles, each bottle has 60 Tablets'}
              />
            </View>
            <View style={styles.drop_Con}>
              <EditText
                Style={styles.qunatity_Edit}
                KeyboradType={'numeric'}
                PlaceHolder={'Please enter quantity'}
                Value={quantity}
                OnChangeText={txt => setQuantity(txt.replace(/[^0-9]/g, ''))}
              />
            </View>
          </View>
          <View style={styles.first_Row}>
            <View style={styles.select_Qun_Con}>
              <Label
                styles={styles.select_Qunatity_Label}
                title="Please enter Dose"
              />
              <Label
                styles={styles.questionMark}
                title={'*No of dose consumed per day'}
              />
            </View>
            <View style={styles.drop_Con}>
              <EditText
                Style={styles.qunatity_Edit}
                KeyboradType={'numeric'}
                PlaceHolder={'Please enter Dose'}
                Value={dose}
                OnChangeText={txt => setDose(txt.replace(/[^0-9]/g, ''))}
                OnSubmit={() => Keyboard.dismiss()}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.submit_Button}
            onPress={() => submitQuantity()}>
            <Label
              styles={{color: '#FFF', fontWeight: 'bold'}}
              title={'Update'}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProduct;
