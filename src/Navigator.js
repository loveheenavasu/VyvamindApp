import React from 'react';
import PurchaseDetails from './BeforeLogin/PurchaseDetails';
import HomePage from './AfterLogin/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationService from './Service/NavigationService';
import {SafeAreaView, View} from 'react-native';
import Footer from './CommonComponnet/Footer';
import Faq from './StaticPage/Faq';
import EditProduct from './AfterLogin/EditProductDetails';
import {StyleSheet} from 'react-native';

const HomeStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const AfterLoginStack = () => {
  return (
    <NavigationContainer independent={true}>
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <HomeStack.Screen name={'HomePage'} component={HomePage} />
        <LoginStack.Screen name="Faq" component={Faq} />
        <LoginStack.Screen name="EditProduct" component={EditProduct} />
        <LoginStack.Screen name="BeforeLoginStack" component={BeforeLoginStack} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

const BeforeLoginStack = () => {
  return (
    <NavigationContainer
      independent={true}
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <LoginStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <LoginStack.Screen name="PurchaseDetails" component={PurchaseDetails} />
        <LoginStack.Screen name="Faq" component={Faq} />
        <LoginStack.Screen name="AfterLoginStack" component={AfterLoginStack} />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
};

const Navigator = () => {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
        <View style={styles.main}>
          <BeforeLoginStack />
          <Footer />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
});

export default Navigator;
