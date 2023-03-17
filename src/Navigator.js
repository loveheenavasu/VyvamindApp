import React, {useEffect, useState} from 'react';
import PurchaseDetails from './BeforeLogin/PurchaseDetails';
import HomePage from './AfterLogin/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import * as Storage from './Service/Storage';
import {UserId} from './Util/StorageKey';
import Footer from './CommonComponnet/Footer';

const HomeStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const AfterLoginStack = () => {
  return (
    <NavigationContainer independent={true}>
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <HomeStack.Screen component={HomePage} name={'HomePage'} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

const BeforeLoginStack = () => {
  return (
    <NavigationContainer independent={true}>
      <LoginStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <LoginStack.Screen name="PurchaseDetails" component={PurchaseDetails} />
        <LoginStack.Screen name="AfterLoginStack" component={AfterLoginStack} />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
};

const Navigator = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    Storage.getData(UserId)
      .then(res => {
        if (res) {
          // console.log('----res---->', res);
        } else {
          console.log('----res--else-->', res);
        }
      })
      .catch(Error => {
        console.log('----Error---->', Error);
      });
  }, []);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#FFF'}}>
      {userId ? <AfterLoginStack /> : <BeforeLoginStack />}
      <Footer />
    </View>
  );
};

export default Navigator;
